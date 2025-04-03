import mongoose from "mongoose";

const parkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    level: {type: String, required: true},
})

export const Park = mongoose.model('parks', parkSchema)