const express = require("express");
const {User, Course} = require("../db/index.js")
const  userMiddleware  = require("../middlewares/userMiddleware");
const { JWT_SECRET } = require("../config.js");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
const router = express.Router();

// first we have to write the logic for the user signup 

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists in DB
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create new admin
        await User.create({ username, password });
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Error in creating User:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async(req, res) => {
    const {username, password} = req.body;

    const user = await User.find({
        username,
        password,
    });

    if(user) {
        const token = jwt.sign({
            username,
        }, JWT_SECRET);
        res.json({
            token
        })
    }
});

// Now we have to show the courses without the login for sample as in the udemy 
router.get("/course", async(req, res) => {
    const courses = await Course.find({});
    res.json(courses);
});

// now we have to add the courses for the particular user 
router.post("/course/:courseId", userMiddleware, async(req, res) => {
    const courseID = req.params.courseId
    const username = req.username;
    try {
        await User.updateOne({
            username: username,
        }, 
        {
            "$push": {
                purchasedCourses: courseID
            }
        })
        res.json("updated Course")
    }
    catch(err) {
        res.json(err);
    }
});

router.get("/purchasedCourses", userMiddleware, async(req, res) => {
    // Implementing the fetching purchased courses
    const user = await User.findOne({
        username: req.username
    });
    console.log(user.purchasedCourses);

    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses 
        }
})
res.json({
    courses: courses
})
})

module.exports = {
    userRoutes: router
};