import { Response, NextFunction } from 'express';

module.exports = function (req: any, res: Response, next: NextFunction) {
  next();
};
