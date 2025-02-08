const { kMaxLength } = require("buffer");
const { default: mongoose } = require("mongoose");
const { type } = require("os");

const UsersSchema = new mongoose.Schema(
    {
        email:{
            type: 'string',
            MaxLength: 255,
        },
        password: {
            type: 'string',
            MaxLength: 255,
        },
        confirmPassword: {
            type: 'string',
            MaxLength: 255,
        },
        status: {
            type: 'boolean',
            default: true,
        }
    },
    {
        timestamps: true,
    }
)


const User =  mongoose.model('User', UsersSchema);
module.exports = User;