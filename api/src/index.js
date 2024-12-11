const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const port = process.env.PORT || 3002
const app = express();


app.use(cors());
app.use(bodyParser.json());

routes(app);    


mongoose.connect(`mongodb+srv://honghihunh:VM7vWYkliImqsEiM@cluster0.tkt1sgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Kết nối DATABASE THÀNH CÔNG');
})
.catch((err) => {
    console.log('Kết nối DATABASE THẤT BẠI');
})

app.listen(port, () => {
    console.log('Server has been active successfully in port: ' + port);
})