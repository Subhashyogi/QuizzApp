const { kMaxLength } = require("buffer");
const { default: mongoose } = require("mongoose");
const { type } = require("os");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      maxlength: 255,
    },
    option: {
      type:[String],
      maxlength: 255,
    },
    correctOption: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
