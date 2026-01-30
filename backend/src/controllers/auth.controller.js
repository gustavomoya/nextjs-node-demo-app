const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ where: { email } });
        if (exist) {
            return res.status(409).json({ message: "The user already exist" });
        }


        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed,
        });

        res.status(201).json({ id: user.id });
    } catch (err) {
        console.log(err);

        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log('login', email, password)

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });

    } catch (err) {
        next(err);
    }
};