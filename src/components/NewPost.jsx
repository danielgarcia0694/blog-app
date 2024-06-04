import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FaSave } from "react-icons/fa";
import './NewPost.css';

const NewPost = ({ addPost, editPost, posts }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      const postToEdit = posts.find((post) => post.id === id);
      if (postToEdit) {
        setTitle(postToEdit.title);
        setContent(postToEdit.content);
        setPost(postToEdit);
      }
    }
  }, [id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedPosts;
    if (post) {
      const updatedPost = { ...post, title, content };
      editPost(updatedPost);
      updatedPosts = posts.map(p => p.id === post.id ? updatedPost : p);
    } else {
      const newPost = {
        id: uuidv4(),
        title,
        content,
        date: new Date().toLocaleDateString()
      };
      addPost(newPost);
      updatedPosts = [...posts, newPost];
    }

    // Save posts to localStorage
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    navigate('/');
  };

  return (
    <div className="posts">
      <div className="new-post-form">
        <h2>{post ? 'Editar Post' : 'Nuevo Post'}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Título" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea 
            rows="5"
            placeholder="Contenido" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit"><FaSave /><span>{post ? 'Actualizar' : 'Crear'}</span></button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
