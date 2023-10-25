import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../config/config";
import { Desk, User } from "../../../types/types";

const CommentsComponent: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  interface Comment {
    comment: string;
    id: string;
    user: User;
    desk: Desk;
    commentedAt: string;
    updatedAt: string;
  }
  //comments abrufen + seiten anpassung falls nötig
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/comments?page=0`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  //comments löschen
  const deleteComment = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/admin/comments/${id}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Nach Löschen rausfiltern
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {}
  };

  return (
    <div className="bg-slate-200 my-3">
      <h3 className="H3 text-center">User Comments</h3>
      <div className="grid gap-3 p-3 md:grid-cols-2">
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "bisque",
            }}
          >
            <p>
              <b> Userdaten: </b>
              {comment.user.firstname} {comment.user.lastname} (
              {comment.user.email})
            </p>
            <p>
              <b>Kommentar:</b> {comment.comment}
            </p>
            <p>
              <b>Desk:</b> {comment.desk.label}
            </p>
            <p>
              <b>Kommentiert am: </b> {comment.commentedAt}
            </p>
            <button onClick={() => deleteComment(comment.id)}>&#10060;</button>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsComponent;
