const mongoose = require('mongoose')

const { Schema } = mongoose

const ReviewSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    review_by: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review