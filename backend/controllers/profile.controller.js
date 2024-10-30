import Profile from '../models/profile.model.js';

// Create a new profile
export const createProfile = async (req, res) => {
  const {username, fullnames, phone_number} = req.body;

  try {
    const user_id = req.user._id;
    const profile = await Profile.create({username, fullnames, phone_number, user_id})
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a profile by id
export const getProfileById = async (req, res) => {
    const user_id = req.user?._id;
  
    if (!user_id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
  
    console.log('Authenticated user:', req.user);
    console.log('User ID:', user_id);
  
    try {
      const profile = await Profile.findOne({ user_id });
  
      console.log('Fetched profile:', profile);
  
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  

  

