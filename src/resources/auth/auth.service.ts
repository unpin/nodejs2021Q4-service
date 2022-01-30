import { Request, Response } from 'express';
import { User } from '../../entity/User';
import { httpErrorHandler } from '../httpErrorHandler';
import HTTP_STATUS from '../../common/constants';

async function login(req: Request, res: Response): Promise<void> {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (user) {
      if (user.passwordsMatch(req.body.password)) {
        const token = user.generateToken();
        res.json({ token });
      } else {
        res
          .status(HTTP_STATUS.FORBIDDEN)
          .send({ message: 'Passwords do not match' });
      }
    } else {
      res.status(HTTP_STATUS.FORBIDDEN).send({ message: 'User not found' });
    }
  } catch (error) {
    httpErrorHandler(req, res, error);
  }
}

export { login };
