const express = require('express');

const {postArticle,
       getAllArticle,
       getArticleByID,
       updateArticleBYID,
       deleteArticleByID
} = require('../controllers/artilce.controller');

const router = express.Router();

router.post('/articles', postArticle);

router.get('/articles', getAllArticle);

router.get('/articles/:id', getArticleByID);

router.put('/articles/:id', updateArticleBYID);

router.delete('/articles/:id', deleteArticleByID);


module.exports = router;