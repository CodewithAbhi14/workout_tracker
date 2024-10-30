import express from 'express';
import requireAuth from '../middelware/requireAuth.js';
import {createProfile,  getProfileById} from '../controllers/profile.controller.js';

const router = express.Router();
router.use(requireAuth);

//create profile data 
router.post('/create-profile', createProfile)

//get all the profile data 
router.get('/', getProfileById)

export default router;