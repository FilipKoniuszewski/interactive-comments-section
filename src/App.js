import './App.css';
import CommentsSection from "./Components/CommentsSection";
import {useEffect, useState} from "react";
import jsonData from "./Data/data.json";

function App() {
    const [comments, setComments] = useState();
    
    const [currentUser, setCurrentUser] = useState()
    
    useEffect(()=>{
        setComments(jsonData.comments);
        setCurrentUser(jsonData.currentUser)
    },[])

    let addComment = (newComment) => {
        setComments([...comments, newComment]);
    };
    
    let deleteComment = (commentToDelete, id) => {
        setComments(comments.fill((comment) => comment.id !== id))
    }
    
    return (
        <div className="wrapper">
            {comments && currentUser && <CommentsSection currentUser={currentUser} comments={comments}/>}
        </div>
    );
}

export default App;
