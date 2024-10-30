import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },             
},{timestamps: true})

//static signup method to create a new user
userSchema.statics.signup = async (email, password) => {

    if(!email ||!password){
        throw new Error("Email and password are required");
    }

    if(!validator.isEmail(email)){
        throw new Error("Invalid email");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong enough")
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    const user = new User({email, password: hashpassword})

    await user.save();
    console.log('user created')

    return user;

}

//static login method 
userSchema.statics.login = async (email, password) => {

    if(!email ||!password){
        throw new Error("Email and password are required");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new Error("Invalid email");
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Invalid password");
    }

    return user;

}

const User = mongoose.model("User", userSchema);

export default User;

