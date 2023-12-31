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
        if(!token) {
            return res.status(401).send("Unauthorized, no token");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {sameSite: 'none', secure: false});
        req.tokenData = decoded;
        next();
    } catch(error) {
        console.log(`Unauthorized: ${req.tokenData}`)
        //Invalid token
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
    
}

//ROUTES
//Route to get Profile info
app.get('/profile', verifyToken, (req, res) => {
    try {
        res.json(req.tokenData);
    } catch (error) {
        console.log(`CATCH AT /profile: ${error.message}`)
    }
    
})
//Route to register a new user, and returns token inside a cookie
app.post('/register', async (req, res) => {
    //Get from payload
    const {usernameInput:user, passwordInput:password} = req.body;
    const username = user.toUpperCase();
    //Password hashing
    //Generate salt for user being created
    const salt = bcrypt.genSaltSync(10)
    //Hash the password using salt
    const hashedPassword = bcrypt.hashSync(password, salt);
    //Create the user in our DB (storing their hashpassword and their salt)
    /* ONCE USER IS REGISTERED, we want to login: create token and launch UserTask Page */
    //Creates a token that carries userId
    try {
        // const username = username.toUpperCase();
        const createdUser = await UserModel.create({username, password:hashedPassword});
        jwt.sign({userId: createdUser._id, username}, process.env.JWT_SECRET_KEY, {}, (error, token) => {
            if (error) throw err;
            //Respond with a cookie containing the token, and sends json containing id and username.
            res.cookie('token', token, {sameSite: 'none', secure: false}).status(201).json({
                id: createdUser._id,
                username,
            });
        })
    } catch(err) {
        res.status(406).send(`"${user}" is already taken. Please select a different username.`)
    }  
})
app.post('/login',  async (req, res) => {
    const {usernameInput:user, passwordInput:password} = req.body;
    const username = user.toUpperCase();
    //search DB for username, and see if it mataches for password
    try {
        const foundUser = await UserModel.findOne({username});
        const passOk = bcrypt.compareSync(password, foundUser.password);
        //Verify password by comparing the inputPassword w/ hashedpw using stored salt to decode
        if (passOk) {
            //Create token to login
            // console.log("Login Success!")
            jwt.sign({userId: foundUser._id, username}, process.env.JWT_SECRET_KEY, {}, (error, token) => {
                if (error) throw error.message;
                res.cookie('token', token, {sameSite: 'None', secure: true, maxAge: 900000, httpOnly: false}).status(201).json({
                    id: foundUser._id,
                    username,
                })
                console.log(`Cookie sent to client containing {id: _id, username:, token:${token}`)
            })
        } else {
            res.status(401).send("Incorrect Password or Username")
        }
    } catch(error) {
        res.status(401).send("User not found");
    }
})
app.get('/userTasks',verifyToken, async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const tasks = await TaskModel.find({user_id:userId})
        res.json(tasks)
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        console.log("/userTasks: ERROR")
        throw error;
    }
});

app.patch('/planDay', verifyToken, async (req, res) => {
    try {
        const userId = req.tokenData.userId;
        const taskString = req.body.taskString;
        const taskList = await askAIPlanner(taskString)
        res.json(taskList).status(204);
    } catch (error) {
        console.log(error.message);
        throw error;
    }
})

const PORT = process.env.PORT || 80;
//Express is listening on
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Started at Port ${PORT}`);
});