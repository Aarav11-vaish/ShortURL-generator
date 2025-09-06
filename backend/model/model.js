import mongoose from "mongoose";

const urlschema = new mongoose.Schema({
    shortid:{
        type:String, 
        required:true,
        unique:true

    },
    redirecturl:{
        type:String,
        required:true
    },
   visited :[
    {
        timestamp: {type: Date, default : Date.now}
    }
   ]
}, {timestamps:true});

const Url = mongoose.model('Url', urlschema);

export default Url;