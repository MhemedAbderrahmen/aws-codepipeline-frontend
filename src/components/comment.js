import React from "react";
import './comments.css';
export const Comment = ({ content, id }) => {
    return (
        <div className="comment-view">
            <span className="comment-content">
                <b>Abderrahmen{": "}</b>
                {content}
            </span>
            {/*<span className="comment-id">[12594]</span>*/}
        </div>
    );
}   