import React, { useState } from 'react';
import './PostModal.css';

const PostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [postType, setPostType] = useState('question'); // 'question' or 'article'
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSuccess(true);
    setTimeout(() => {
      if (onPostCreated) {
        onPostCreated({
          type: postType,
          title,
          tags: tags.split(',').map((t) => t.trim()),
          content
        });
      }
      setIsSuccess(false);
      setTitle('');
      setTags('');
      setContent('');
      onClose();
    }, 700);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="post-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="post-modal-header">
          <h2 className="post-modal-title">Create a New Post</h2>
          <p className="post-modal-sub">
            Share a question or write an article for the DEV@Deakin community.
          </p>
        </div>

        {/* Post Type Selector */}
        <div className="post-type-selector">
          <label className={`type-option ${postType === 'question' ? 'active' : ''}`}>
            <input
              type="radio"
              name="postType"
              value="question"
              checked={postType === 'question'}
              onChange={() => setPostType('question')}
            />
            <span>❓ Question</span>
          </label>
          <label className={`type-option ${postType === 'article' ? 'active' : ''}`}>
            <input
              type="radio"
              name="postType"
              value="article"
              checked={postType === 'article'}
              onChange={() => setPostType('article')}
            />
            <span>📝 Article</span>
          </label>
        </div>

        {isSuccess ? (
          <div className="post-success-message">
            <span className="success-icon">🎉</span>
            <h3>Post Created Successfully!</h3>
            <p>Your {postType} has been published to DEV@Deakin.</p>
          </div>
        ) : (
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="post-title">
                {postType === 'question' ? 'Question Title' : 'Article Title'}
              </label>
              <input
                id="post-title"
                type="text"
                placeholder={
                  postType === 'question'
                    ? 'e.g. How do I optimize React re-renders with useMemo?'
                    : 'e.g. Building Scalable Web Apps with React & Node'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-tags">Tags (comma-separated)</label>
              <input
                id="post-tags"
                type="text"
                placeholder="e.g. react, hooks, javascript"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="post-content">
                {postType === 'question' ? 'Describe your problem' : 'Article Abstract / Content'}
              </label>
              <textarea
                id="post-content"
                rows="4"
                placeholder="Write your details here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="post-modal-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-publish">
                Publish {postType === 'question' ? 'Question' : 'Article'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostModal;
