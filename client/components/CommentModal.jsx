import React, { useState, useEffect } from 'react';
import { getRequest, postRequest, deleteRequest } from './webRequests';
import './CommentModal.css';

const CommentModal = ({ card, onClose }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ message: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const data = await getRequest(`/card/${card.card_id}/comments`);
            setComments(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments");
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.message.trim()) {
            return;
        }

        setSubmitting(true);
        try {
            const comment = await postRequest(`/card/${card.card_id}/comments`, {
                message: newComment.message,
                author: newComment.author || 'Anonymous'
            });

            setComments(prev => [comment, ...prev]);
            setNewComment({ message: '', author: '' });
        } catch (err) {
            console.error("Error creating comment:", err);
            setError("Failed to add comment");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const success = await deleteRequest(`/comment/${commentId}`);
            if (success) {
                setComments(prev => prev.filter(comment => comment.comment_id !== commentId));
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <div className="modal-overlay">
            <div className="comment-modal">
                <div className="comment-modal-content">
                    <div className="comment-modal-header">
                        <h2>{card.title}</h2>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>

                    <div className="card-details">
                        <div className="card-gif">
                            <img src={card.gif} alt="Card GIF" />
                        </div>
                        <p className="card-description">{card.description}</p>
                        {card.owner && <p className="card-author">By: {card.owner}</p>}
                    </div>

                    <div className="comment-form">
                        <h3>Add a Comment</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={newComment.message}
                                    onChange={handleInputChange}
                                    placeholder="Enter your comment"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="author">Your Name (optional)</label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={newComment.author}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                />
                            </div>

                            <button
                                type="submit"
                                className="submit-comment-button"
                                disabled={submitting || !newComment.message.trim()}
                            >
                                {submitting ? 'Adding...' : 'Add Comment'}
                            </button>
                        </form>
                    </div>

                    <div className="comments-section">
                        <h3>Comments ({comments.length})</h3>

                        {loading ? (
                            <p>Loading comments...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : comments.length === 0 ? (
                            <p>No comments yet. Be the first to comment!</p>
                        ) : (
                            <div className="comments-list">
                                {comments.map(comment => (
                                    <div key={comment.comment_id} className="comment-item">
                                        <div className="comment-header">
                                            <span className="comment-author">{comment.author}</span>
                                            <span className="comment-date">{formatDate(comment.createdAt)}</span>
                                        </div>
                                        <p className="comment-message">{comment.message}</p>
                                        <button
                                            className="delete-comment-button"
                                            onClick={() => handleDeleteComment(comment.comment_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
