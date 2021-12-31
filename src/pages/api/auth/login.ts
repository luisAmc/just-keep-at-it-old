import { LoginInput } from 'src/resolvers/AuthResolver';
import { authenticateUser } from 'src/utils/auth';
import withSession, { createSession } from 'src/utils/sessions';

export default withSession(async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST': {
      try {
        const data: LoginInput = req.body;

        const user = await authenticateUser(data.username, data.password);

        await createSession(req, user);

        return res.json(user);
      } catch (err) {
        return res.status(400).json(err.message);
      }
    }

    default: {
      return res.status(400).json({ success: false });
    }
  }
});
