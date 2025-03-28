const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Define thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, 'Thought text is required'],
      minlength: [1, 'Thought text must be at least 1 character'],
      maxlength: [280, 'Thought text must be less than 280 characters'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Format the createdAt date
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    reactions: [reactionSchema], // Reactions as subdocument
  },
  {
    toJSON: {
      virtuals: true,
      getters: true, // Enable getters for virtuals
    },
    id: false,
  }
);

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Export Thought model
module.exports = model('Thought', thoughtSchema);