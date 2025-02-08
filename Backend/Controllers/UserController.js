const UsersModel = require('../models/UsersModels');

class UserController {
  create(data) {
    return new Promise((res, rej) => {
      try {
        const user = new UsersModel({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        });
        user
          .save()
          .then((success) => {
            res({
              msg: "User added successfully",
              status: 1,
            });
          })
          .catch((error) => {
            rej({
              msg: "Unable to add user",
              status: 0,
            });
          });
      } catch (err) {
        rej({
          msg: "Internal error",
          status: 0,
        });
      }
    });
  }

  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let user = null
        if (id) {
          user = await UsersModel.findById(id);
        } else {
          user = await UsersModel.find();
        }
        res({
          msg: "User founded!",
          Users: user,
          status: 1,
        });
      } catch (error) {
        rej({
          msg: "Internal error",
          status: 0,
        });
      }
    });
  }
}

module.exports = UserController;