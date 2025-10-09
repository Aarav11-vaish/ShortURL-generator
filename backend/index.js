import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import Url from './model/model.js'
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}
));

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
    if (!body.url) {
        return res.status(400).json('URL is required');
    }
    if (!/^https?:\/\//i.test(body.url)) {
        body.url = "http://" + body.url;
    }
   
  const existing = await Url.findOne({redirecturl: body.url});
  if(existing){
    return res.json({id: existing.shortid});
  }

    const shortid = nanoid(6);
    await Url.create({
        shortid: shortid,
        redirecturl: body.url,
        visited: []
    })
return res.json({id: shortid});
})

app.get('/:shortid', async (req, res)=>{

 try {
        const id = await Url.findOne({ shortid: req.params.shortid });
        if (id) {
            id.visited.push({ timestamp: new Date() });
            await id.save();
            return res.redirect(id.redirecturl);
        }
        return res.status(404).json({ error: "Short URL not found" });
    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }

});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
 app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
 })