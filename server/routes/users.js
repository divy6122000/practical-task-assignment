const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer')
const path = require('path')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, path.join(__dirname, '../images/'));
    },
    filename: (req, file, cd) => {
        // console.log(file)
        cd(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage })
//ROUTE 1: Create user "api/users/create"
router.post('/create', upload.single('photo'), async (req, res) => {
    if (req.header('apiKey') == process.env.API_KEY) {
        // console.log("req_body", req.body)
        try {
            const { firstName, lastName, fatherName, email, password, address, mobile, gender, DOB, country } = req.body;

            // Check whether the user with this email exists already
            let userEmail = await User.findOne({ email: email });
            if (userEmail) {
                return res.status(400).json({ result: "failed", msg: "Sorry a user with this email already exists" })
            }
            // Check whether the user with this phone exists already
            let userPhone = await User.findOne({ mobile: mobile });
            if (userPhone) {
                return res.status(400).json({ result: "failed", msg: "Sorry a user with this mobile already exists" })
            }

            const salt = await bcrypt.genSalt(10);
            const securedPass = await bcrypt.hash(password, salt);
            let photos = (req.file) ? req.file.filename : null
            // Store data
            let user = await User.create({
                firstName, lastName, fatherName, email,
                password: securedPass,
                address, mobile, gender, DOB, country, photos
            });
            // const data = {
            //     user: {
            //         id: user.id,
            //         firstName: user.firstName,
            //         lastName: user.lastName,
            //         fatherName: user.fatherName,
            //         email: user.email,
            //         address: user.address,
            //         mobile: user.mobile,
            //         gender: user.gender,
            //         DOB: user.DOB,
            //         country: user.country
            //     }
            // }
            // const authtoken = jwt.sign(data, process.env.JWT_SECRET);
            if (user) {
                res.status(201).json({ result: "success", msg: "Registration successfully" })
            }
            else {
                res.status(500).json({ result: "failed", msg: "Internal Server Error" })
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/users/login".
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    // console.log(email, password);
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ result: "failed", msg: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ result: "failed", error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                fatherName: user.fatherName,
                email: user.email,
                address: user.address,
                mobile: user.mobile,
                gender: user.gender,
                DOB: user.DOB,
                country: user.country
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ result: "success", authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

//ROUTE 3: Get all users "api/users/view"
router.get('/view', async (req, res) => {
    try {
        let users = await User.find();
        return res.status(200).json({ result: "success", users })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;