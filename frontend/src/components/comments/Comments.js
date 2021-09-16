import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../contexts/context";
import "./Comments.css";
import TimeAgo from "react-timeago";
import frenchStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Comment from './Comment'

const Comments = () => {
  const formatter = buildFormatter(frenchStrings);
  const { token, userId } = useContext(AuthContext);
  const [post, setpost] = useState();
  const [comments, setComments] = useState(); // For create new
  const [newComment, setnewComment] = useState();
  const { postId } = useParams();

  const getAllComments = () => {
    axios
      .get(`http://localhost:5000/posts/getpostbyid/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setComments(result.data.post.comments);
        setpost(result.data.post);
      })
      .catch((err) => {
        setComments([]);
        console.log("err" + err);
      });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const createNewComment = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/posts/${postId}/comment`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, res.data.commentAdded]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post">
      <div className="postdevid">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/avatar3.png" alt="" />
            <span className="postUsername">{post && post.user.firstName}</span>
            <span className="postDate">
              <TimeAgo date={post && post.date} formatter={formatter} />
            </span>
          </div>
          <div className="postTopRight"></div>
        </div>
        <div className="postCenter">{post && post.body}</div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <textarea
              onChange={(e) => {
                setnewComment(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="postBottomRight">
            <AddCircleOutlineIcon
              className="addNewCommentIcon"
              onClick={() => {
                createNewComment();
              }}
            />
          </div>
        </div>
        <hr style={{ fontSize: "20px", color: "gray", marginTop: "30px" }} />
        {comments &&
          comments.map((c) => {
            <Comment c={c} />;
          })}
      </div>
    </div>
  );
};

export default Comments;
