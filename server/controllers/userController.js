const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('_id name email createdAt updatedAt')
  res.json(users);
};

exports.getAuthUser = (req, res) => {
  if(!req.isAuthuser){
    res.status(403).json({
      message: "You are unauthenticated. Please sing in or sign up"
    })
    res.redirect("/signin")
  }
  res.json(req.user)
};

exports.getUserById = async (req, res, next, id) => {
  const user = await User.findOne({ _id: id }) 
  req.profile = user;

  const profileId = mongoose.Types.ObjectId(req.profile._id);

  if(profileId.equals(req.user._id)){
    req.isAuthuser = true;
    return next();
  }
  next();
};

exports.getUserProfile = () => {};

exports.getUserFeed = () => {};

exports.uploadAvatar = () => {};

exports.resizeAvatar = () => {};

exports.updateUser = () => {};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  if(!req.isAuthuser){
    return res.status(400).json({
      message: "You are not authorized to perform this action"
    })
  }
  const deletedUser = await User.findOneAndDelete({ _id: userId});
  res.json(deletedUser)
};

exports.addFollowing = () => {};

exports.addFollower = () => {};

exports.deleteFollowing = () => {};

exports.deleteFollower = () => {};
