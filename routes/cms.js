const express = require('express');
const router = express.Router();

const cmsController = require('../controllers/cms');

router.get('/', cmsController.getIndex);

router.get('/login', cmsController.getLogin);
router.post('/login', cmsController.postLogin);

router.get('/uploads', cmsController.getUploads);
router.post('/uploads', cmsController.postUploads);

router.get('/employees', cmsController.getEmployees);
router.post('/employees', cmsController.postEmployees);

router.get('/edit-employee/:employeeId', cmsController.getEditEmployee);

router.post('/edit-employee/', cmsController.postEditEmployee);

router.post('/delete-employee/', cmsController.postDeleteEmployee);

module.exports = router;