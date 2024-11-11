import { errorMessageFormatter } from "../utils/errorMessageFormatter.js";

export const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Internal Server Error';

  switch (err.name) {
    case 'PrismaClientValidationError':
      status = 400;
      message = errorMessageFormatter(err.message);
      break;
  
    default:
      break;
  }

  console.log(err.name);
  console.log(err.message);
  
  res.status(status).send({ message });
}