import React from "react";
import '../App.css';
import { Post } from './post';
import { useState } from 'react';
import axios from 'axios';

export const Blog = (props) => {
    const [posts, setPosts] = useState([])
    const [newPostTitle, setNewPostTitle] = useState([]);

    async function getAllPosts() {
        const postsResults = await axios.get('http://localhost:4003/posts');
        setPosts(postsResults.data);
    }

    async function createNewPost(value) {
        await axios.post('http://localhost:4000/posts', { title: value });
        getAllPosts();
        setNewPostTitle('');
    }

    //Add Create Posts
    const handleSubmit = () => {
        createNewPost(newPostTitle);
    }

    const handleChange = (event) => {
        setNewPostTitle(event.target.value);
    }
    useState(() => {
        getAllPosts();
    }, [])

    const renderedPosts = Object.values(posts).map(post=>{
        {console.log("This is a post title:" , post.title)}
        return <Post key = {post.id} title={post.title} id={post.id} />
    })



    return (
        <div className="blog-view">
            <header className="App-header">
                <div style={{ fontSize: "18px", textAlign: "right" }}>Create a new post</div>
                <div className="App-container">
                    <input value = {newPostTitle} className="App-input" name="post" placeholder='Post Content' onChange={handleChange}></input>
                    <button className="App-button" onClick={handleSubmit}>Add Post</button>
                </div>

                <div className='App-container'>
                    <div style={{ width: "100%" }} >
                        {
                            posts ? renderedPosts : null
                        }
                    </div>
                </div>
            </header>
        </div>
    );
}