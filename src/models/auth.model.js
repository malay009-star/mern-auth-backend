import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchemaDef = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String,
            default: null
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }
    }, { timestamps: true }
);

userSchemaDef.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});


export const User = mongoose.model("User", userSchemaDef);
