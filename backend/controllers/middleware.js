import jwt from 'jsonwebtoken';
const PRIVATE_KEY = 'Cs-566';

class Validatetoken {
  static async validateAdminToken(req, res, next) {
    try {
      if (!req.headers.authorization) {
        return next(new Error('Please add token'));
      }
      const arr = req.headers.authorization.split(' ');
      if (arr.length !== 2) {
        return next(new Error('Please use bearer schema'));
      }
      const token = arr[1];
      const payload = jwt.verify(token, PRIVATE_KEY);
      if (payload.isAdmin) {
        next();
        return;
      }
    } catch (error) {
      return next(new Error('Access denied! Only admins have this right'));
    }
  }

  static async validateUserToken(req, res, next) {
    if (!req.headers.authorization) {
      return next(new Error('Please add token'));
    }
    const arr = req.headers.authorization.split(' ');
    if (arr.length !== 2) {
      return next(new Error('Please use bearer schema'));
    }
    const token = arr[1];
    const payload = jwt.verify(token, PRIVATE_KEY);
    if (!payload.isAdmin) {
      next();
      return;
    }
    return res.send('Acess denied! Only users have this right');
  }
}

export default Validatetoken;
