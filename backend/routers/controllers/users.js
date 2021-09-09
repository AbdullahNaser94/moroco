const User = require("../../db/models/user");

const register = (req, res) => {
  const { firstName, gender, email, password } = req.body;
  const user = new User({
    firstName,
    email,
    gender,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `User Created Successfully`,
        User: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern) {
        // <---- what is this ?
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;
  User.findById({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `the user with id =>${id}`,
        posts: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};

const follwoUnfollwo = (req, res) => {
  const _id = req.params.id;
  const curruntuser = req.body.user;
  User.findById(_id).then((result) => {
    if (!result.followers.includes(curruntuser)) {
      User.updateOne(
        { _id: _id },
        { $push: { followers: curruntuser } }
      ).exec();
      res.status(200).json("follow sccesfully");
    } else {
      User.updateOne(
        { _id: _id },
        { $pull: { followers: curruntuser } }
      ).exec();
      res.status(200).json("unfollow sccesfully");
    }
  });
};


const updateUserById = (req, res) => {
  const _id = req.params.id;
  User
    .findByIdAndUpdate(_id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The User => ${_id} not found`,
        });
      }
     res.status(200).json({
        success: true,
        message: `The post with ${_id}`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "server error",
        err: err,
      });
    });
};


const searchUsersByName = (req, res) => {
  const name = req.query.name;
  User.find({
    $or: [
      {
        firstName: {
          $regex: name,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: name,
          $options: "i",
        },
      },
    ],
  })
    .then((result) => {
      if (!result.length) {
        return res.status(400).json({
          success: false,
          message: "Name doesn't exist",
        });
      }
      res.status(200).json({
        success: true,
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    });
};


module.exports = { getUserById, register, follwoUnfollwo, searchUsersByNameوupdateUserById };

