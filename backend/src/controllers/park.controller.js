import {Park} from "../models/park.model.js";
import {scrapeData} from "../lib/scrape.js";

export const getAllParks = async (req, res) => {
    try {
        res.json(await Park.find({}))
    } catch (e) {
        console.log(e)
    }
}

export const uploadPark = async (req, res) => {
    try {
        res.json(await Park.create(req.body.park))
    } catch (e) {
        console.log(e)
    }
}

export const scrapeNParks = async (req, res) => {
    try {
        let parks = await scrapeData('https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States')
        parks.forEach((park) => {
            if (!Park.findOne({name: park.name})) {
                Park.create({...park, level: 'national'})
            }
        })
    } catch (e) {
        console.log(e)
    }
}