// db.js – MongoDB connection and model definitions

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://ankit27092004:String%40123@chatterbox.ghdz4.mongodb.net/practice1?retryWrites=true&w=majority&appName=ChatterBox", {
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

const { Schema } = mongoose;

//  Admin schema
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// User schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchasedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
});

// Course schema
const courseSchema = new Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

// Model registration
const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);

// Export models
module.exports = {
  Admin,
  User,
  Course
};
