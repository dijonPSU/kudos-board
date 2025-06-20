import React, { useState } from 'react';
import { postRequest } from './webRequests';
import './Modal.css';
import { baseURL } from '../src/global.js';

const ViewBoard = ({ board, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="view-modal">
        <div className="view-modal-content">
          <h2>{board?.title}</h2>
          <p>Category: {board?.category}</p>
          {board?.author && <p>Author: {board?.author}</p>}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const CreateBoard = ({ onClose, onBoardCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });


    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const newBoard = await postRequest('/board', formData);
      if (newBoard) {
        onBoardCreated(newBoard);
        onClose();
      }
    } catch (error) {
      console.error('Error creating board:', error);
      setErrors({ submit: 'Failed to create board. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="create-modal">
        <div className="create-modal-content">
          <h2>Create New Board</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter board title"
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="author">Author (optional)</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            {errors.submit && <p className="error">{errors.submit}</p>}

            <div className="form-buttons">
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Board'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { ViewBoard, CreateBoard };
