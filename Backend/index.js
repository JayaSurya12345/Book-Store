import express, { json } from 'express';
import {PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
const app=express();


//middleware for parsing request body
app.use(express.json());

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to the MERN Stack Tutorial!');
})

//route to get all the books from the databases.
app.get('/books',async (request,response)=>{
    try{

        const books=await Book.find({});
        return response.status(200).json(books);

    }catch(error){
        console.log(error);
        response.send(500).send({message:error.message});
    }
})


//route to get a book by id
app.get('/books/:id',async (request,response)=>{
    try{
        const {id}=request.params;
        const book=await Book.findById(id);
        if(book){
            return response.status(200).json(book);
        }
        else{
            return response.status(404).send({meassage:'Book not found in the database'});
        }

    }catch(error){
        console.log(error);
        response.send(500).send({message:error.message});

    }
})

app.post('/books',async (request,response)=>{
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear)
        {
            response.status(400).send({message:"Send all the required fields Title,Author and PublishYear"});
        }
        const newBook={title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }

        const book=await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error.message)
        response.status(500).send({message:error.message});
    }
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