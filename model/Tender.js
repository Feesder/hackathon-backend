import mongoose, {Schema} from "mongoose";

const Tender = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    accepted: {type: Schema.Types.ObjectId, ref: 'User'},
    cost: {type: Number, required: true},
    title: {type: String, required: true},
    status: {type: String, require: true},
    description: {type: String, required: true},
    author: {type: String, required: true},
    created: {type: Date, default: new Date()},
    picture: {type: String}
});

export default mongoose.model('Tender', Tender);