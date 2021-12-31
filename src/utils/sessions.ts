import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import {
  applySession,
  Session,
  SessionOptions,
  withIronSession
} from 'next-iron-session';
import { UserDocument } from 'src/models/User';
import SessionModel, { SessionDocument } from 'src/models/Session';
import { IncomingMessage } from 'http';
import dbConnect from './dbConnect';

if (!process.env.COOKIE_SECRET) {
  console.warn(
    'No `COOKIE_SECRET`environment variable was set. This can cause production errors.'
  );
}

// The session will be valid for one day
// The session will automatically renew when there's < 25% of it validity period
const SESSION_TTL = 1 * 24 * 3600 * 1000;

export const IRON_SESSION_ID_KEY = 'sessionID';

export type NextIronRequest = NextApiRequest & { session: Session };

export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => void | Promise<void>;

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

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, sessionOptions);

export default withSession;

export async function createSession(req: NextIronRequest, user: UserDocument) {
  const session = new SessionModel({
    user: user._id,
    expiresAt: Date.now() + SESSION_TTL
  });

  await session.save();

  req.session.set(IRON_SESSION_ID_KEY, session.id);
  await req.session.save();

  return session;
}

export async function removeSession(req: IncomingMessage) {
  const ironReq = req as unknown as NextIronRequest;

  const sessionID = ironReq.session.get(IRON_SESSION_ID_KEY);

  await SessionModel.deleteOne({ _id: sessionID });

  ironReq.session.destroy();
}

const sessionCache = new WeakMap<IncomingMessage, SessionDocument | null>();
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req);
  }

  await applySession(req, res, sessionOptions);

  let session: SessionDocument | null = null;

  const ironReq = req as unknown as NextIronRequest;
  const sessionID = ironReq.session.get(IRON_SESSION_ID_KEY);

  if (sessionID) {
    await dbConnect();

    session = await SessionModel.findOne({ _id: sessionID }).populate(
      'user',
      'name username permissions'
    );

    if (session) {
      const shouldRefreshSession =
        Date.now() - session.expiresAt.getTime() < 0.75 * SESSION_TTL;

      if (shouldRefreshSession) {
        await SessionModel.updateOne(
          { _id: session._id },
          { expiresAt: new Date(Date.now() + SESSION_TTL) }
        );

        await ironReq.session.save();
      }
    }
  }

  sessionCache.set(req, session);

  return session;
}
