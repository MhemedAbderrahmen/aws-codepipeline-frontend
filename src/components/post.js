import React, { useState } from "react";
import { Comment } from "./comment";
import "./post.css";
import axios from 'axios';
import 'react-accessible-accordion/dist/fancy-example.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
export const Post = ({ id, title }) => {
    const [comments, setComments] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState("");

    const getAllComments = async () => {
        const comments = await axios.get('http://localhost:4001/posts/' + id + "/comments");
        setComments(comments.data);
    }

    const newComment = async () => {
        await axios.post('http://localhost:4001/posts/' + id + "/comments", { content: newCommentContent });
        getAllComments();
        setNewCommentContent('')
    }

    const handleChange = (event) => {
        setNewCommentContent(event.target.value);
    }

    const handleSubmit = () => {
        newComment();
    }

    const listComments = comments.map((comment) => {
        return <Comment key = {comment.id} content={comment.content} />
    });

    useState(() => {
        getAllComments();
        console.log(id,title)
    }, [])


    return (
        <div className="post-view" style={{ width: "100%", marginBottom: "1rem" }}>
            <div className="post-content">
                <span className="id-post">[{id}]</span>{" "} {title}
            </div>
            <div> 
                <Accordion allowZeroExpanded >
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                View Comments
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            {
                                comments ? listComments : null
                            }

                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
            </div>
            <div style={{ display: "flex" }}>
                <input className="App-input" value={newCommentContent} name="comment" placeholder='Comment content' onChange={handleChange}></input>
                <button className="App-button" onClick={handleSubmit}>Comment</button>
            </div>

        </div>
    );
}