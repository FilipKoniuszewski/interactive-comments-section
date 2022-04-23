import './App.css';
import CommentsSection from "./Components/CommentsSection";
import React, {useEffect, useRef, useState} from "react";
import jsonData from "./Data/data.json";
import DeleteModal from "./Components/DeleteModal";
import "./Style/DeleteModal.css";
import ClickAwayListener from '@mui/base/ClickAwayListener';

function App() {
    const [comments, setComments] = useState([]);
    
    const [currentUser, setCurrentUser] = useState()
    
    const [modalOpen, setModalOpen] = useState(false);
    
    const modalContentRef = useRef(null)
    
    const modalRef = useRef(null);
    
    const [commentToDelete, setCommentToDelete] = useState({
        id: 0,
        isReply: false,
    });
    
    useEffect(()=>{
        setComments(jsonData.comments);
        setCurrentUser(jsonData.currentUser)
    },[])
    
    useEffect(() => {
        if (modalOpen) {
            modalRef.current.classList.add('open')
        }
        else {
            modalRef.current.classList.remove('open')
        }
        
    }, [modalOpen])

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (modalOpen && modalContentRef.current && !modalContentRef.current.contains(e.target)) {
                setModalOpen(false);
            }
        };
        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [modalOpen]);

    let addComment = (newComment) => {
        setComments([...comments, newComment]);
    };
    
    let deleteComment = () => {
        if (commentToDelete.isReply) {
            let commentsToUpdate = [...comments]
            commentsToUpdate.forEach((comment) => {
                comment.replies = comment.replies.filter((reply) => reply.id !== commentToDelete.id)
            })
            setComments(commentsToUpdate)
        }
        else {
            setComments(comments.filter(comment => comment.id !== commentToDelete.id))
        }
    }
    
    let editComment = (id, commentContent) => {
        setComments(comments.map((comment) => comment.id === id 
            ? {...comment, content: commentContent} 
            : comment)) 
    }
    
    let upVote = (id, isReply) => {
        if (isReply) {
            let commentsToUpdate = [...comments]
            commentsToUpdate.forEach((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === id) {
                        reply.score += 1
                    }
                })
            })
            setComments(commentsToUpdate)
        }
        else {
            setComments(comments.map((comment) => comment.id === id 
                ? {...comment, score: comment.score + 1} 
                : comment))
        }
    }
    
    let downVote = (id, isReply) => {
        if (isReply) {
            let commentsToUpdate = [...comments]
            commentsToUpdate.forEach((comment) => {
                comment.replies.forEach((reply) => {
                    if (reply.id === id) {
                        reply.score -= 1
                    }
                })
            })
            setComments(commentsToUpdate)
        }
        else {
            setComments(comments.map((comment) => comment.id === id 
                ? {...comment, score: comment.score - 1} 
                : comment))
        }
    }
    
    return (
        <div className="wrapper">
            <DeleteModal modalRef={modalRef}
                         modalContentRef={modalContentRef}
                         commentToDelete={commentToDelete}
                         setCommentToDelete={setCommentToDelete}
                         deleteComment={deleteComment}
                         setModalOpen={setModalOpen}/>
            {comments && currentUser && <CommentsSection 
                modalRef={modalRef}
                addComment={addComment}
                deleteComment={deleteComment}
                setModalOpen={setModalOpen}
                upVote={upVote}
                setCommentToDelete={setCommentToDelete}
                downVote={downVote}
                editComment={editComment}
                currentUser={currentUser} 
                comments={comments}/>}
        </div>
    );
}

export default App;
