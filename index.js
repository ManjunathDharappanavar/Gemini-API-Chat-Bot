import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/prompt', async (req, res)=>{
   const userPrompt = req.body.prompt;

   if(!userPrompt){
    return res.status(400).json({error: 'Prompt is required'})
   }

   try{
        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        const result = await model.generateContent(userPrompt);
        const response = await result.response
        const text = response.text();

        res.json({answer: text})
   }catch(error){
        return res.status(500).json({error: 'internal server error'})
   }
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})