const User = require('../models/user');
const Board = require('../models/board');
const userController = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser._id);
        } catch (err) {
            return res.status(500).json(err.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { username, email, password } = req.body;
            const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    getUserBoards: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId)
            // Find boards owned by the user
            const ownedBoards = await Board.find({ ownerId: userId });
            const guestBoards = await Board.find({ 'members.userId': userId });
            // Find boards where the user is a member
            
            
            
            res.json({
              success: true,
              data: {
                ownedBoards,
                guestBoards
              }
            });
          } catch (err) {
            res.status(500).json({ success: false, error: err.message });
          }
    }

};

module.exports = userController;
