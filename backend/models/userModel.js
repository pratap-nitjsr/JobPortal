import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: true
    },
    location: {
        type: String,
        default: "India"
    }
    
}, {
    timestamps: true,
}
);

userSchema.pre('save', async function () {
    if (!this.isModified()) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.createJWT = function () { 
    return JWT.sign({
        userID: this._id,
    },
        process.env.JWT_SECRET_KEY,
        {expiresIn:'1d'}
    )
}

export default mongoose.model('User',userSchema);