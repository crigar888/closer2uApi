// const express = require('express');
// const User = require('../models/User');

// const router = express.Router();

// // POST: Create a new user
// router.post('/', async (req, res) => {
//   console.log('holaaaa')
//   const { name, email, age } = req.body;
//   try {
//     const newUser = new User({ name, email, age });
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(400).json({ message: 'Error creating user', error: err });
//   }
// });

// // GET: Get all users
// router.get('/', async (req, res) => {
//   console.log('holaaaa')
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching users', error: err });
//   }
// });

// export default router;
