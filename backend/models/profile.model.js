import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullnames: {
        type: String,
        required: true
    },
   phone_number: {
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;