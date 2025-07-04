import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import express from "express"
import router from "./src/routes/auth.js"
dotenv.config({
    path: './.env'
})

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', router);

app.get('/', (req, res) => res.send('SocialAlert Backend Running'));


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})



