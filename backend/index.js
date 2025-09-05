import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import Url from './model/model.js'
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const mongouri= 'mongodb://127.0.0.1:27017/shorturl';

mongoose.connect(mongouri, {
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

app.post('/shorturl', async (req, res)=>{
    const body = req.body;
    console.log(body);
    if(!body.url){
        return res.status(400).json('URL is required');
    }
    const shortid = nanoid(6);
    await Url.create({
        shortid: shortid,
        redirecturl: body.url,
        visited: []
    })
return res.json({id: shortid});
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
 })