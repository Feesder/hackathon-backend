import mongoose, {Schema} from "mongoose";

const Item = new mongoose.Schema({
    tenderId: {type: Schema.Types.ObjectId, ref: 'Tender'},
    action: {type: String, required: true},
    money: {type: Number, required: true},
    created: {type: Date, default: new Date()}
});

export default mongoose.model('Item', Item);