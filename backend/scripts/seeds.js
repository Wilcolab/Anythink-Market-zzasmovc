const mongoose = require('mongoose');

// Import your models (adjust the paths as necessary)
const User = require('../models/User');
const Item = require('../models/Item');
const Comment = require('../models/Comment');

// Connect to your MongoDB (adjust the URL as necessary)
mongoose.connect('mongodb://localhost/3000', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper functions to generate random data
function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedDatabase() {
  try {

    // Create 100 users
    const users = [];
    for (let i = 0; i < 100; i++) {
      const user = new User({
        username: `user_${getRandomString(8)}`,
        email: `${getRandomString(8)}@example.com`,
        password: getRandomString(12),
      });
      await user.save();
      users.push(user);
    }
    console.log('100 users created');

    // Create 100 items
    const items = [];
    for (let i = 0; i < 100; i++) {
      const item = new Item({
        title: `Item ${getRandomString(10)}`,
        description: `This is a description for item ${i + 1}. ${getRandomString(50)}`,
        seller: users[Math.floor(Math.random() * users.length)]._id,
        image: "https://unsplash.com/photos/shopping-cart-suspended-in-the-air-with-plain-pastel-background-minimal-shopping-concept-3d-render-QEsdAtJKq7E"
      });
      await item.save();
      items.push(item);
    }
    console.log('100 items created');

    // Create 100 comments
    for (let i = 0; i < 100; i++) {
      const comment = new Comment({
        body: `This is comment ${i + 1}. ${getRandomString(30)}`,
        seller: users[Math.floor(Math.random() * users.length)]._id,
        item: items[Math.floor(Math.random() * items.length)]._id,
      });
      await comment.save();
    }
    console.log('100 comments created');

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();