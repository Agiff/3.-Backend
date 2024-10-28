export const errorHandler = (err, req, res, next) => {
  let message = 'Internal Server Error';
  let status = 500;

  console.log(err.name);
  console.log(err.message);

  switch (err.name) {
    case 'PrismaClientValidationError':
      status = 400;
      message = err.message;
      break;

    case 'NotFoundError':
      status = 404;
      message = err.message;
      break;

    case 'UnauthorizedError':
    case 'InvalidToken':
    case 'JsonWebTokenError':
      status = 403;
      message = err.message;
      break;

    case 'JavascriptDeveloperClassError':
      status = 401;
      message = err.message
      break;
  }

  res.status(status).send({ message });
}