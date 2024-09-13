import { users } from '../utils/consts.js';

class UserController {
  getUsers = (req, res) => {
    res.send(users);
  }

  findUser = (req, res) => {
    const { id } = req.params;
    const userFound = users.find((user) => user.id === +id);

    if (!userFound) res.send('User not found');

    res.send(userFound);
  }
}

export const userController = new UserController();