const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController')


require('dotenv').config()



router.post('/api/add/new/sassFeedback', feedbackController.saveSassFeedback)