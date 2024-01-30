const mongoose=require('mongoose')
const rate=new mongoose.Schema({
    rate:Number,
    count:Number
})
const expenseScheme=new mongoose.Schema({
    id:Number,
    email:String,
    username:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    rating:rate
    });
const Expense=mongoose.model('Expense',expenseScheme);
module.exports=Expense