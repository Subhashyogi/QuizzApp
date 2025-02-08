const Router = require("express");
const UserController = require("../Controllers/UserController");

const UserRouter = Router();

UserRouter.post("/create", (req, res) => {
  const user = new UserController().create(req.body);
  user
    .then((success) => {
      res.send(success);
      console.log(success);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
});

UserRouter.get(
  "/:id?", 
  (req, res) => {
  const user = new UserController().read(req.params.id);
  user
    .then((success) => {
      res.send(success);
      console.log(success);
    })
    .catch((error) => {
      res.send(error);
      console.log(error);
    });
});

module.exports = UserRouter;
