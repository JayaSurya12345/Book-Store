import express, { json } from 'express';
import {PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';


const app=express();


//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option1: Allow all origins with Default of Cors(*)
app.use(cors());
//Option2: Allow only specific origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.use('/books',bookRoute);

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to the MERN Stack Tutorial!');
})


mongoose.connect(mongoDBURL)
.then( ()=>{
   console.log("App connected to the database...")

   app.listen(PORT,()=>{
    console.log(`App is listening to the port ${PORT}`);
})

} )
.catch( (error)=>{
    console.log(error)})