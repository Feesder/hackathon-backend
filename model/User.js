import mongoose, {Schema} from "mongoose";

const User = new Schema({
    login: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

export default mongoose.model('User', User)