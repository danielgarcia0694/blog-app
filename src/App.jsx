import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Post from './components/Post';
import NewPost from './components/NewPost';
import FloatingButton from './components/FloatingButton';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  // const [posts, setPosts] = useState([]);
  const [posts, setPosts] = useState(() => {
    // Obtener las tareas desde localStorage
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Guardar posts en localStorage cada vez que cambien
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
  };

  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="posts">
                {posts.filter(post => post.title.includes(searchTerm)).map(post => (
                  <Post key={post.id} post={post} deletePost={deletePost} />
                ))}
              </div>
            } 
          />
          <Route path="/posts/:id" element={<Post posts={posts} />} />
          <Route path="/new-post" element={<NewPost posts={posts} addPost={addPost} />} />
          <Route path="/edit-post/:id" element={<NewPost posts={posts} editPost={editPost} />} /> {/* Ruta para editar */}
        </Routes>
      </div>
      <FloatingButton />
    </Router>
  );
};

const PostDetail = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id === id);
  return post ? (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{post.content}</p>
    </div>
  ) : (
    <p>Post no encontrado</p>
  );
};


export default App;
