import {User} from "../models/user.mode.js";
import * as tty from "tty";

export const getAllUsers = async (req, res) => {
    try {
        res.json(await User.find({}))
    } catch (e) {
        console.log(e)
    }
}

export const getUser = async(req, res) => {
    try {
        res.json(await User.findOne({username: req.query.username, password: req.query.password}))
    } catch (e) {
        console.log(e)
    }
}

export const createUser = async (req, res) => {
    try {
        await User.create(req.body.user)
        res.json({success: true})
    } catch (e) {
        res.json({success: false})
    }
}

export const visitPark = async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.user.username})
        console.log(user)
        user.parks = req.body.user.parks
        console.log(req.body.user.parks)
        user.save()
    } catch (e) {
        console.log(e)
    }
}