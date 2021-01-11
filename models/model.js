// testing/demo of creating db entries

const mongoose = require('mongoose')
const Schema = mongoose.Schema


// step 1. schema

// Schema todo: ISP, user, rating, speed

let speedSchema = new Schema({
  speed: String,
  location: String,
  isp: String,
})

let speedModel = mongoose.model('speed', speedSchema)

module.exports = {
    speedModel,
}