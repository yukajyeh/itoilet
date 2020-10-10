const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const toilet = new Schema({
    imageUrl:{
        type: String
    },

    location_name:{
        type:String
    },

    price_per_use:{
        type: String
    },

    child_friendly:{
        type: Boolean
    },

    location:{
        type: { type: String }, 
        coordinates: [Number]
    },

    openings_time:{
        type:String
    },

    comments: Array,

    uploader:{
        type:Schema.ObjectId, ref:'user-model'
    }
},{
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
} )


const ToiletInfo = mongoose.model('Toilet',toilet)
module.exports = ToiletInfo