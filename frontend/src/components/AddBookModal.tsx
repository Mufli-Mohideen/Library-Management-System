import React, { useState } from 'react';
import '../styles/AddBookModal.css';

interface AddBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddBook: (book: {title: string; author: string; description: string; imageUrl: string }) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddBook({ title, author, description, imageUrl });
        onClose();
    };

    const handleModalClose = () =>{
        setTitle('');
        setAuthor('');
        setDescription('');
        setImageUrl('');
        onClose();
    }

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Book</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        Author:
                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                    </label>
                    <label>
                        Description:
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                    </label>
                    <button type="submit" className="add-btn">Add Book</button>
                </form>
                <button onClick={handleModalClose} className="close-btn">Close</button>
            </div>
        </div>
    );
};

export default AddBookModal;
