const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    collection: "MessageCollection"

});

const MessageModel = mongoose.model('MessageModel', MessageSchema);

module.exports = MessageModel;