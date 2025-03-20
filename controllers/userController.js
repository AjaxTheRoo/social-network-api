const User = require('../models/User');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by ID
  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user by ID
  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const userId = req.params.userId;
      console.log(`Attempting to delete user with ID: ${userId}`);
  
      // Find and delete the user
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        console.log(`User not found with ID: ${userId}`);
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Bonus: Remove user's associated thoughts
      if (user.thoughts && user.thoughts.length > 0) {
        console.log(`Deleting associated thoughts for user: ${user.username}`);
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        console.log(`Thoughts deleted for user: ${user.username}`);
      }
      res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};