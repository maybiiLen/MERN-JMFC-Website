import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";


dotenv.config();

const app = express();

connectDB();
//middleware    
function adminAuth(req,res,next){
    const adminPass = process.env.ADMIN_SECRET;
    if(!adminPass) return res.status(500).json({ message : "this the wrong number lil bro"});

    const provided = req.header('x-admin-password') || req.body?.adminSecret || req.query?.adminSecret;
    if(provided !== adminPass) 
        return res.status(403).json({ message : "Access denied"
    });
    next();
}


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send("API is running...");
});
app.get('/admin', adminAuth, (req,res) => {
    res.json({ok : true, msg: 'admin access granted'})
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening port ${PORT}`)
    })
});
