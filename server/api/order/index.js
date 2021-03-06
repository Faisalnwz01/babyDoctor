'use strict';

var express = require('express');
var controller = require('./order.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/getThisOrder', controller.getThisOrder);


router.post('/twilio', controller.twilio);
router.post('/texts/1', controller.texts)


module.exports = router;