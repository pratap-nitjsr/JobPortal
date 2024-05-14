import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
    const { name, email, location } = req.body;
    if (!name || !email || !location) {
        return next('Please provide all required fields');
    }

    try {
        const user = await userModel.findOne({ _id: '6642ef5662a0269a2d681b55' });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.location = location;

        await user.save();
        const token = user.createJWT();

        res.status(200).json({
            user: { name: user.name, email: user.email, location: user.location },
            token
        });
    } catch (error) {
        next(error);
    }
}
