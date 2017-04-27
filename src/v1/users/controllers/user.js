import User from '../models/user';

class UserController {
  constructor(User) {
    this.User = User;
  }

  getUsers() {
    return this.User.find({});
  }

  getUserById(_id) {
    return this.User.findById(_id);
  }

  async createUser(data) {
    const tmpUser = await this.User.find({ email: data.email });
    if (tmpUser) {
      return Promise.reject('E-mail already exists.');
    }

    return this.User.create(data);
  }

  async updateUser(_id, data) {
    const user = await this.getUserById(_id);
    if (!user) {
      return null;
    }
    Object.assign(user, data);
    return user.save();
  }

  async deleteUser(_id) {
    return this.User.remove({ _id });
  }
}

export default new UserController(User);
