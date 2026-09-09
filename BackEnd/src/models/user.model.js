import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const userModel = mongoose.model("User", userSchema)

export default userModel