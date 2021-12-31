import withSession, { createSession } from 'src/utils/sessions';
import dbConnect from 'src/utils/dbConnect';
import { hashPassword } from 'src/utils/auth';
import { SignUpInput } from 'src/resolvers/AuthResolver';
import User from 'src/models/User';

export default withSession(async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST': {
      try {
        const data: SignUpInput = req.body;

        const user = new User({
          name: data.name,
          username: data.username,
          hashedPassword: await hashPassword(data.password)
        });

        await user.save();

        await createSession(req, user);

        return res.json(user);
      } catch (err) {
        res.status(400).json(err.message);
      }
    }

    default: {
      res.status(400).json({ success: false });
    }
  }
});
