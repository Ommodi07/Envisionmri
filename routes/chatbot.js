const { default: axios } = require("axios");
const Router = require("express");
const { string } = require("zod");
const chatbotRouter = Router();
chatbotRouter.post("/",async(req,res)=>{
        const query = req.body.query;
      
       
        const response =await axios.post('https://chatbot-ggfw.onrender.com/query',{
                query: query
        })
               
      console.log("hello")

      console.log(response); 
      
        res.json({
                message:response.data
        })
});

module.exports= {chatbotRouter};