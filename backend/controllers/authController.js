import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            next('Name is required');
        }
        if (!email) {
            next('Email is required');
        }
        if (!password) {
            next('Password is required');
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            next('User already exists');
        }

        const user = await userModel.create({ name, email, password });
        user.password = undefined;
        const token = user.createJWT();

        res.status(201).send({
            message: 'User registered successfully',
            success: true,
            user: user,
            token: token
        })

    }
    catch (error) {
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            next('Email is required');
        }
        if (!password) {
            next('Password is required');
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            next('Invalid Credentials');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            next('Invalid Credentials');
        }
        user.password = undefined;
        const token = user.createJWT();
        res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            user: user,
            token: token
        })
    }
    catch (error) {
        next(error);
    }
}