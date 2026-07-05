const Joi = require('joi');
const ArticleModel = require('../model/article.model')
const { error } = require('node:console');
const { title } = require('node:process');

const postArticle = async(req,res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional().default('Guest')
    });

    const {error, value} = articleSchema.validate(req.body);

    if (error){
        return res.status(400).json("Please provide artile title and content")
    }
    try {
        const newArticle = new ArticleModel(value);
        await newArticle.save();
        return  res.status(200).json({
            message: "Article created",
            data: newArticle
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllArticle = async(req,res, next) => {
const {limit = 10, page =1} = req.query

const skip = (page-1) * limit;

    try {
        const articles = await ArticleModel.find({}).sort({createdAt: -1}).limit(limit).skip(skip)

        return res.status(200).json({
            message:"Article fetched",
            data: articles
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getArticleByID = async (req,res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id)

        if(!article){
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`
            })
        }
        return res.status(200).json({
            message: "Article found",
            data: article,
        })
    } catch (error) {
         console.error(error);
        next(error);
    }
}


const updateArticleBYID = async (req,res, next) => {
     const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author: Joi.string().optional()
    });

    const {error, value} = articleSchema.validate(req.body);
     if (error){
        return res.status(400).json("Please provide artile title and content")
    }
    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, 
            {...req.body},
            {new: true, 
            runValidators: true
        }
        );

        if(!updatedArticle){
            return res.status(404).json({
                message: "Article not found",
            });
        }
        
         return res.status(200).json({
                message: "article updated",
                data: updatedArticle
            });
    } catch (error) {
         console.error(error);
        next(error);
    }
}

const deleteArticleByID = async (req,res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id)

        if(!article){
            return res.status(200).json({
                message:"Article not found"
            });
        }

        res.status(200).json("Article deleted successfully");
    } catch (error) {
         console.error(error);
        next(NativeError);
    }
};

module.exports = {
       postArticle,
       getAllArticle, 
       getArticleByID,
       updateArticleBYID,
       deleteArticleByID
}