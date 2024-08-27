import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId = (req, res, next) => {
  const id = req.params?.contactId;

  if (!isValidObjectId(id)) {
    next(createHttpError(404, 'Not found'));
  }
  next();
};
