const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    overview:{
        type: String,
        required: true
    },
    relaseDate:{
        type: String,
        required: true
    },
    voteAverage:{
        type: Number,
        required: true
    },
    voteCount:{
        type: Number,
        required: true
    },
    language:{
        type: String
    },
    posterPath:{
        type: String
    }
})

mongoose.model('Movie', MovieSchema);