const QuestionModel = require('../models/QuestionModels');

class QuestionController {
  create(data) {
    return new Promise((res, rej) => {
      try {
        const Question = new QuestionModel({
          question: data.question,
          option: data.options,
          correctOption: data.correctOption,
        });
        Question.save()
          .then((success) => {
            res({
              msg: "Question created successfully",
              status: 1,
            });
          })
          .catch((error) => {
            rej({
              msg: "Unable to create question",
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
        let question = "";
        if (id) {
          question = await QuestionModel.findById(id);
        } else {
          question = await QuestionModel.find();
        }
        res({
          msg: "Questions founded!",
          Questions: question,
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

  delete(id) {
    return new Promise((res, rej) => {
      try {
        QuestionModel.deleteOne({ _id: id })
          .then((success) => {
            res({
              msg: "Question deleted successfully",
              status: 1,
            });
          })
          .catch((error) => {
            rej({
              msg: "Unable to delete",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal error",
          status: 0,
        });
      }
    });
  }

  update(id, question, correctAnswer,option) {
    return new Promise((res, rej) => {

      try {
        const updatedQuestion = QuestionModel.findByIdAndUpdate(
          id,
          { question, correctAnswer,option },
          { status: true } // Returns the updated document
        )
          .then(() => {
            res({
              msg: "Successfully updated",
              status: 1,
            });
          })
          .catch((error) => {
            rej({
              msg: "Unable to update",
              status: 0,
            });
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

module.exports = QuestionController;
