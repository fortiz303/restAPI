const express = require('express');
const app = express();
// Import our records file
const records = require('./records');
//Middle wear
app.use(express.json()); 

//Send a GET request to quotes/ READ a list of quotes
app.get('/quotes', async (req,res) => {
  try{
      const quotes = await records.getQuotes();
      res.json(quotes)
      res.status(201)
  }catch{
      res.json({message: err.message});
  }
});
//Send a GET request to quotes/ READ one quote
app.get('/quotes/:id', async (req,res) => {
  try{
  const quotesId = await records.getQuote(req.params.id);
    if(quotesId){
      res.json(quotesId); 
    } else {
      res.status(404).message({message:'Quote not found'});
    }
  } catch(err){
    res.status(500).json({message: err.message});
  }
 });
//Send a POST request to create a new quote
app.post('/quotes', async (req,res)=>{
  try{
    if(req.body.quote&&req.body.author){
      const quote = await records.createQuote({
        'quote':req.body.quote,
        'author': req.body.author
      });
      res.json(quote).status(201);
    } else { 
      res.status(400).json({message:err.message})
    }
  } catch(err){
      // res.status(500) 
      res.json({message: err.message});
  }
});
//Send a PUT request to quotes/:id UPDATE(edit) a quote
//Send a DELETE request quotes/:id to DELETE a quote
//Send a GET request to quotes/quote/random READ a random quote


app.listen(3000, () => console.log('Quote API listening on port 3000!'));

