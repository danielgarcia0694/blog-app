import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import './Post.css';


const Post = ({ post, deletePost }) => {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.date}</p>
      <p>{post.content}</p>
      <div className="post-buttons">
        <Link to={`/edit-post/${post.id}`}>
          <button className="edit-button"><FaPencilAlt /></button>
        </Link>
        <button className="delete-button" onClick={() => deletePost(post.id)}><FaRegTrashAlt /></button>
      </div>
    </div>
  );
};

export default Post;
