import React, { useState, useEffect } from "react";
import { CommentsProps, ElementProps } from "../interface";

const Comments = ({ element }: ElementProps) => {
  const [comments, setComments] = useState<CommentsProps[]>([]);

  const [newComment, setNewComment] = useState<string>("");

  const getAllComment = async () => {
    const response = await fetch("http://localhost:4000/text/comments", {
      method: "GET",
    });
    const jsonComment: CommentsProps[] = await response.json();
    setComments(jsonComment);
  };

  const onSubmitForm = async (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();
    const body = { newComment };
    const response = await fetch(`http://localhost:4000/text/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const jsonComment: CommentsProps = await response.json();
    setComments([...comments, jsonComment]);
    //console.log(newComment);
  };

  const deletePaste = async (id: number) => {
    const deleted = await fetch(`http://localhost:4000/text/${id}/comments`, {
      method: "DELETE",
    });
    setComments(comments.filter((c) => c.comment_id !== id));
  }; // keep ones that dont have the same ID as the one you want to delete
  // keep where condition is true

  useEffect(() => {
    getAllComment();
  }, []);

  return (
    <div className="comments">
      <h4>Comments</h4>
      <form onSubmit={(e) => onSubmitForm(e, element.paste_id)}>
        <input
          type="text"
          placeholder="Add new comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button>submit</button>
      </form>
      {comments.map((com) =>
        com.paste_id === element.paste_id ? (
          <div key={com.comment_id}>
            <p>
              {com.comment}
              <button
                onClick={() => deletePaste(com.comment_id)}
                style={{ backgroundColor: "red" }}
              >
                &times;
              </button>
            </p>{" "}
          </div>
        ) : null
      )}
    </div>
  );
};
export default Comments;
