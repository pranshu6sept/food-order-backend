import { Request,Response } from "express";
import User from "../models/user";

export const getCurrentUser = async (req:Request, res: Response) => {
    try {
        const currentUser = await User.findOne({_id:req.userId})
        if (!currentUser){
            return res.status(404).json({message:"user not found"})
        }
        res.json(currentUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"something went wrong"})
    }
};

const createCurrentUser =async (req:Request, res: Response) => {
    try {
        // const {auth0ID,email} = req.body;
        const existingUser = await User.findOne({auth0Id:req.body.auth0ID});

        if (existingUser) {
            res.status(200).json({msg:'user already exist'});
            return
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating user"})
    }
}

const updateCurrentUser = async (req:Request, res: Response) => {
    try {
        const { name, addressLine1, country, city} = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({mesaage:"user not found"})
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;

        await user.save();
        res.send(user);
    } catch (error) {
        console.log(error);  
        res.status(500).json({message:"Error updating user"})
    }
}


export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
}