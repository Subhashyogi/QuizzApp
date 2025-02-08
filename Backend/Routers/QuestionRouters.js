const Router = require('express');
const QuestionController = require('../Controllers/QuestionController');

const QuestionRouter = Router();

QuestionRouter.post("/create", (req, res) => {
  const question = new QuestionController().create(req.body);

  question
    .then((success) => {
      res.send(success);
      console.log(success);
    })
    .catch((error) => {
      res.send(error);
      console.log(success);
    });
});

QuestionRouter.get(
    '/:id?',
    (req, res) => {
        const question = new QuestionController().read(req.params.id);
        question
          .then((success) => {
            res.send(success);
            // console.log(success);
          })
          .catch((error) => {
            res.send(error);
            console.log(error);
          });
    }
)

QuestionRouter.delete(
  '/delete/:id',
  (req, res) => {
    const id = new QuestionController().delete(req.params.id);
    id.then(
      (success) => {
        res.send(success);
      }
    ).catch(
      (error) => {
        res.send(error);
      }
    )
  }
)

QuestionRouter.put(
  "/update/:id",
   (req, res) => {
      // const data = new QuestionController().update(req.params.id, req.body);
      const { id } = req.params;
      const { 
        question,
        correctAnswer, 
        option 
      } = req.body;
      // console.log(question, correctAnswer);
      const updatedQuestion = new QuestionController().update(id, question, correctAnswer, option); //option
      updatedQuestion
        .then((success) => {
          res.send(success);
        })
        .catch((error) => {
          res.send(error);
        });


});


module.exports = QuestionRouter;



