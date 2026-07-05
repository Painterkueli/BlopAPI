const { required } = require('joi');
const mongoose = require('mongoose');
const { type } = require('node:os');
const { title } = require('node:process');

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        minLength: 5
    },

    content:{
        type: String,
        required : true,
        minLength: 20
    },

    author:{
        type:String,
        required:false,
        default: 'Guest'
    }
}, {timestamps:true}
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;