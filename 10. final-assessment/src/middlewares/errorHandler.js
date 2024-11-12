import { errorMessageFormatter } from "../utils/errorMessageFormatter.js";

export const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';

  switch (err.name) {
    case 'PrismaClientValidationError':
    case 'PrismaClientKnownRequestError':
      status = 400;
      message = errorMessageFormatter(err.message);
      break;

    case 'ValidationError':
      status = 400;
      message = err.message;
      break;

    case 'JsonWebTokenError':
    case 'Unauthenticated':
      status = 401;
      message = err.message;
      break;

    case 'Unauthorized':
      status = 403;
      message = err.message;
      break;

    case 'NotFoundError':
      status = 404;
      message = err.message;
      break;
  
    default:
      break;
  }

  console.log(err.name);
  console.log(err.message);
  
  res.status(status).send({ message });
}