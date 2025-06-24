const express = require('express');
const app = express();
const PORT = 8080;

const tasksRouter = require('./view/task.view');

app.use(express.json());
const mongoose = require('mongoose');

const uri = 'mongodb+srv://mjrajak47z:H3Pkg3GTHrbWmJDd@cluster0.ht39vu6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
.then(() => {
    console.log("Connected to MongoDB successfully");
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

const middleware = (req, res, next) => {
    const route = req.orignalUrl;
    const method = req.method;
    const time = new Date().toLocaleString();

    console.log(`Route: ${route}, Method: ${method}, Time: ${time}`);

    next();
}

app.use(middleware);
app.use('/api', tasksRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})