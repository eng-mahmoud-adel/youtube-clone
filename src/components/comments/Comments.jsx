import React, { useState, useEffect } from "react";
import "./_comments.scss";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../redux/actions/comments";

const Comments = ({videoId, totalComments}) => {
  const {photoURL} = useSelector(state => state.auth?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));

  }, [dispatch, videoId]);

  const comments = useSelector(state => state.commentList.comments);
  const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet);

  const [text, setText] = useState('');

  const handleComment = (e) => {
    e.preventDefault();
    if(text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText('');
  };

  return (
    <div className="comments">
      <p>{totalComments} Comments</p>

      <div className="comments-form d-flex w-100 my-2">
        <img
          src={photoURL}
          alt="avatar"
          className="rounded-circle mr-3"
        />

        <form onSubmit={handleComment}>
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>

      <div className="comments-list">
        {_comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
