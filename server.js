import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';

import connect from './database/conn.js';

const app = express()

app.use(morgan('tiny')); /*tiny format we use */
app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 5001;

/* routes */
app.use('/api', router) 


app.get('/', (req, res) => {
    try {
        res.json("Get Req.")
    } catch (error) {
        res.json(error)
    }
})

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Backend server connected on http://localhost:${port}`)
        })
    } catch (error) {
        console.log("Error while connecting to server!");
    }
}).catch(error => {
    console.log("Error while connecting to MongoDB");
})
