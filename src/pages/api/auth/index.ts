import Session from 'src/models/Session';
import withSession, { IRON_SESSION_ID_KEY } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const session = await Session.findById(
          req.session.get(IRON_SESSION_ID_KEY)
        )
          .populate('user', 'username')
          .lean();

        if (!session) {
          return res.status(400).json({ success: false });
        }

        return res.json({ me: session.user });
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    default: {
      res.status(400).json({ success: false });
    }
  }
});
