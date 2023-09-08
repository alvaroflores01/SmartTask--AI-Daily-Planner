const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const askAIPlanner = require('./api/openai')
//Import Models
const UserModel = require('./models/User');
const TaskModel = require('./models/Task')
//Import Routes
const taskRoutes = require('./routes/TaskRoutes');

//Initialize Express
const app = express();

//Config Development Environment
dotenv.config();
// const getSchedule = async (msg="'clean room, make coffee, pick up mom at 3, do math hw, read a book'") => {
//     const plannedSchedule = await askAI(msg);
//     return plannedSchedule;
// }

//TEST 
// askAIPlanner('clean room, do math hw, pick up mom at 3 (10 minute drive), make coffee, buy groceries')

//DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected Successfully");
});
//MIDDLEWARE 
//Allows express to read json code
app.use(express.json());
//CORS CONFIG: allows request from frontend client
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
//cookie-parser: allows us to read cookie
app.use(cookieParser());
app.use('/task', taskRoutes);

//token validation
const verifyToken = (req, res,next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {sameSite: 'none', secure: true});
        //set info on req.tokenData
        req.tokenData = decoded;
        // console.log('Token Verfied')
        // next();
    } catch(error) {
        console.log(`Unauthorized: ${req.tokenData}`)
        //Invalid token
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
    next();
}

//ROUTES
//Route to get Profile info
app.get('/profile', verifyToken, (req, res) => {
    // console.log('running GET /profile')
    res.json(req.tokenData);
})
//Route to register a new user, and returns token inside a cookie
app.post('/register', async (req, res) => {
    //Get from payload
    const {usernameInput:username, passwordInput:password} = req.body;
    //Password hashing
    //Generate salt for user being created
    const salt = bcrypt.genSaltSync(10)
    //Hash the password using salt
    const hashedPassword = bcrypt.hashSync(password, salt);
    //Create the user in our DB (storing their hashpassword and their salt)
    /* ONCE USER IS REGISTERED, we want to login: create token and launch UserTask Page */
    //Creates a token that carries userId
    try {
        const createdUser = await UserModel.create({username, password:hashedPassword});
        jwt.sign({userId: createdUser._id, username}, process.env.JWT_SECRET_KEY, {}, (error, token) => {
            if (error) throw err;
            //Respond with a cookie containing the token, and sends json containing id and username.
            res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json({
                id: createdUser._id,
                username,
            });
        })
    } catch(err) {
        if (err) {
            console.log(err.message)
        };
    }  
})
app.post('/login', async (req, res) => {
    const {usernameInput:username, passwordInput:password} = req.body;
    //search DB for username, and see if it mataches for password
    try {
        //Find user in db
        const foundUser = await UserModel.findOne({username});
        if (!foundUser) console.log('usernotfound');
        //Verify password by comparing the inputPassword w/ hashedpw using stored salt to decode
        const passOk = bcrypt.compareSync(password, foundUser.password);
        // console.log(` PassOk: ${passOk}`)
        if (passOk) {
            //Create token to login
            // console.log("Login Success!")
            jwt.sign({userId: foundUser._id, username}, process.env.JWT_SECRET_KEY, {}, (error, token) => {
                if (error) throw error.message;
                res.cookie('token', token, {sameSite: 'none', secure: true}).status(201).json({
                    id: foundUser._id,
                    username,
                })
                console.log('cookie sent at login')
            })
        } else {
            console.log('Incorrect Password')
        }
    } catch(error) {
        throw error.message;
    }
})
app.get('/userTasks',verifyToken, async (req, res) => {
    const userId = req.tokenData.userId;
    try {
        const tasks = await TaskModel.find({user_id:userId})
        res.json(tasks)
    } catch (error) {
        throw error.message;
    }
});

const PORT = process.env.PORT || 4000;
//Express is listening on
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Started at Port ${PORT}`);
});