const Comment =require("../../db/models/comments");


const getAllComments = (req, res) => {

  Comment.find({})
    .then((result) => {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: "No comments yet",
        });
      }
      res.status(200).json({
        success: true,
        message: "all the comments",
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

}


const createNewComment = (req, res) => {


}



const updateCommentById = (req, res) => {


}


const deleteCommentById = (req, res) => {


}




module.exports = {
    getAllComments,
    createNewComment,
    updateCommentById,
    deleteCommentById,
  };
  