import express from 'express';
import { Book } from '../models/bookModel.js';

const router=express.Router();

//route to get all the books from the databases.
router.get('/',async (request,response)=>{
    try{

        const books=await Book.find({});
        return response.status(200).json(books);

    }catch(error){
        console.log(error);
        response.send(500).send({message:error.message});
    }
})

//route to get a book by id
router.get('/:id',async (request,response)=>{
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

//route to add a book
router.post('/',async (request,response)=>{
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

//route to update a book
router.put('/:id',async (request,response)=>{
    try{
        if( !request.body.title || !request.body.author || !request.body.publishYear)
        {
            return response.status(400).send({message:"Send all the required fields Title, Author and PublishYear"});
        }

        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);

        if(!result)
        {
            response.status(404).send({message:"Book is not in the DataBase"});
        }
        else{
            response.status(200).send({message:"Book updated Successfully"});
        }

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

//route to delete a book
router.delete('/:id',async (request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);

        if(!result)
        {
            response.status(404).json({message:"Book is not in the database"});
        }
        else{
            return response.status(200).send({message:"Book deleted Successfully"});
        }

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router;