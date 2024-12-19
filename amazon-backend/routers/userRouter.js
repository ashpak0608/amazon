import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth, isAdmin } from '../utils.js'; // Import middlewares
import { getUserByEmail, createUser } from '../models/userModel.js'; // MySQL queries

const router = express.Router();

// **Signin Route**
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send({ message: 'Error during signin' });
    }
});

// **Register Route**
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const newUser = await createUser(name, email, password, false);

        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send({ message: 'Error during registration' });
    }
});

// **Profile Route** (Protected Route)
router.get('/profile', isAuth, async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email);
        if (user) {
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).send({ message: 'Error fetching profile' });
    }
});

// **Admin Route Example** (Protected Route)
router.get('/admin-only', isAuth, isAdmin, (req, res) => {
    res.send({ message: 'Access granted to admin' });
});

// **Export the Router**
export default router;
