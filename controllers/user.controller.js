import User from '../models/user.model.js';

export const getUsers = async (req, res,next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.status(400).json({
                success: false,
                message: 'No users found.',
            })
        }

        res.status(200).json({
            success: true,
            data:{
                users: users,
            }
        });

    }catch(error) {
        next(error)
    }
}


export const getUser = async (req, res,next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'No user found.',
            })
        }
        res.status(200).json({
            success: true,
            data:{
                user: user,
            }
        })
    }catch(error) {
        next(error)
    }
}

