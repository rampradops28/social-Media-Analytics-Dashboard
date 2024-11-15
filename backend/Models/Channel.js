const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  views: { type: Number, required: true },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  createdAt: {
    type: String,
    default: () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      return `${date} ${hours}:${minutes}:${seconds} ${ampm}`;
    },
  },
});

module.exports = mongoose.model("Channel", channelSchema);
