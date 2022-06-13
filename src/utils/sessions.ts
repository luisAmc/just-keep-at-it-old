import { db } from './prisma';
import { addSeconds, differenceInSeconds } from 'date-fns';
import { getIronSession, IronSession, IronSessionOptions } from 'iron-session';
import { IncomingMessage, ServerResponse } from 'http';
import { Session, User } from '@prisma/client';

declare module 'iron-session' {
  interface IronSessionData {
    sessionID?: string | null;
  }
}

if (!process.env.COOKIE_SECRET) {
  console.warn(
    'No `COOKIE_SECRET`environment variable was set. This can cause production errors.'
  );
}

// The session will be valid for one day
// The session will automatically renew when there's < 25% of it validity period
const SESSION_TTL = 1 * 24 * 3600 * 1000;

interface ReqWithSession extends IncomingMessage {
  session: import('iron-session').IronSession;
}

const sessionOptions: IronSessionOptions = {
  password: { 1: process.env.COOKIE_SECRET as string },
  cookieName: 'session.info',
  ttl: SESSION_TTL,
  cookieOptions: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    sameSite: 'strict',
    httpOnly: true
  }
};

export async function createSession(ironSession: IronSession, user: User) {
  const session = await db.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_TTL)
    }
  });

  ironSession.sessionID = session.id;

  await ironSession.save();

  return session;
}

export async function removeSession(
  ironSession: IronSession,
  session?: Session | null
) {
  ironSession.destroy();

  await ironSession.save();

  if (session) {
    await db.session.delete({ where: { id: session.id } });
  }
}

interface CachedSession {
  session: Session | null;
  ironSession: IronSession;
}

const sessionCache = new WeakMap<IncomingMessage, CachedSession>();

export async function resolveSession(
  req: IncomingMessage,
  res: ServerResponse
): Promise<CachedSession> {
  const cacheSession = sessionCache.get(req);

  if (cacheSession) {
    return cacheSession;
  }

  const ironSession = await getIronSession(req, res, sessionOptions);

  const sessionID = ironSession.sessionID;

  let session: Session | null = null;

  if (sessionID) {
    session = await db.session.findFirst({
      where: { id: sessionID, expiresAt: { gte: new Date() } },
      include: {
        user: true
      }
    });

    if (session) {
      const shouldRefreshSession =
        differenceInSeconds(session.expiresAt, new Date()) < 0.75 * SESSION_TTL;

      if (shouldRefreshSession) {
        await db.session.update({
          where: {
            id: session.id
          },
          data: {
            expiresAt: addSeconds(new Date(), SESSION_TTL)
          }
        });

        await ironSession.save();
      }
    } else {
      ironSession.destroy();

      await ironSession.save();
    }
  }

  sessionCache.set(req, { session, ironSession });

  return { session, ironSession };
}
