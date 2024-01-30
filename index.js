const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT||8000;
const Expense = require("./expense");
mongoose.connect(
  "mongodb+srv://hari:kongu2023@cluster0.avrxseu.mongodb.net/?retryWrites=true&w=majority/HP/users",
  {
    useUnifiedTopology: true,
  }
);

app.use(express.json());
app.get("/expenses", async (req, res) => {
  const expenses = await Expense.find();
  res.send(expenses);
});
app.get("/expenses/:id", async (req, res) => {
  const id = req.params.id;
  const data = function () {
    return new Promise((resolve, reject) => {
      const data = Expense.findById(id);
      resolve(data);
    });
  };
  data()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send("there is no data");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete("/expenses/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Expense.findByIdAndDelete(id);
  if (result) {
    res.send(result);
  } else {
    res.send("No Expense with theat id");
  }
});
app.post("/expenses", async (req, res) => {
  console.log(req.body);
  try{
  const newExpense = req.body;
  await Expense.create(newExpense);
  res.send("Created");}
  catch(err){
    console.log(err)
  }
});
app.put("/expense/:id", async (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  const updatedObject = await Expense.findByIdAndUpdate(
    id,
    { $set: updateObject },
    { new: true }
  );
  res.send(updatedObject);
});
app.listen(port, () => {
  console.log(`listing on the ${port}`);
});

// const express=require('express')
// const app=express()
// const port =3000
// app.get('/',(req,res)=>{
//     console.log(req.toArray)
//     res.send("welcome to the world")
// })
// app.listen(port,()=>{
//     console.log("listing")
// })
