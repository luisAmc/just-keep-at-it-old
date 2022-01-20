import { GetServerSidePropsContext } from 'next';
import { IncomingMessage } from 'http';
import { applySession, SessionOptions } from 'next-iron-session';
import { Session, User } from '@prisma/client';
import { db } from './prisma';

if (!process.env.COOKIE_SECRET) {
  console.warn(
    'No `COOKIE_SECRET`environment variable was set. This can cause production errors.'
  );
}

// The session will be valid for one day
// The session will automatically renew when there's < 25% of it validity period
const SESSION_TTL = 1 * 24 * 3600 * 1000;

const IRON_SESSION_ID_KEY = 'sessionID';

interface ReqWithSession extends IncomingMessage {
  session: import('next-iron-session').Session;
}

const sessionOptions: SessionOptions = {
  password: [{ id: 1, password: process.env.COOKIE_SECRET as string }],
  cookieName: 'session.info',
  ttl: SESSION_TTL,
  cookieOptions: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    sameSite: 'strict',
    httpOnly: true
  }
};

export async function createSession(req: IncomingMessage, user: User) {
  const session = await db.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + SESSION_TTL)
    }
  });

  const sessionID = session.id;

  const reqWithSession = req as unknown as ReqWithSession;
  reqWithSession.session.set(IRON_SESSION_ID_KEY, sessionID);

  await reqWithSession.session.save();

  return session;
}

export async function removeSession(req: IncomingMessage, session: Session) {
  const reqWithSession = req as unknown as ReqWithSession;

  await db.session.delete({ where: { id: session.id } });

  reqWithSession.session.destroy();
}

const sessionCache = new WeakMap<IncomingMessage, Session | null>();
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req);
  }

  await applySession(req, res, sessionOptions);

  let session: Session | null = null;

  const reqWithSession = req as unknown as ReqWithSession;
  const sessionID = reqWithSession.session.get(IRON_SESSION_ID_KEY);

  if (sessionID) {
    session = await db.session.findFirst({
      where: { id: sessionID, expiresAt: { gte: new Date() } }
    });

    if (session) {
      const shouldRefreshSession =
        Date.now() - session.expiresAt.getTime() < 0.75 * SESSION_TTL;

      if (shouldRefreshSession) {
        await db.session.update({
          where: {
            id: session.id
          },
          data: {
            expiresAt: new Date(Date.now() + SESSION_TTL)
          }
        });

        await reqWithSession.session.save();
      }
    }
  }

  sessionCache.set(req, session);

  return session;
}
