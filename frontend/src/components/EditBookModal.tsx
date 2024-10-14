import React, { useState, useEffect } from 'react';
import '../styles/EditBookModal.css';

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
}

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book;
    onEditBook: (updatedBook: Book) => void;
    onDeleteBook: (bookId: string) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, book, onEditBook, onDeleteBook }) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [description, setDescription] = useState(book.description);
    const [imageUrl, setImageUrl] = useState(book.imageUrl);

    useEffect(() => {
        if (isOpen) {
            setTitle(book.title);
            setAuthor(book.author);
            setDescription(book.description);
            setImageUrl(book.imageUrl);
        }
    }, [isOpen, book]);

    const handleSave = () => {
        const updatedBook = {
            ...book,
            title,
            author,
            description,
            imageUrl,
        };
        onEditBook(updatedBook);
        onClose();
    };

    const handleDelete = () => {
        onDeleteBook(book.id);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Book</h2>
                <div className="form-group">
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Author:</label>
                    <input 
                        type="text" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input 
                        type="text" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave} className='save-btn'>Save</button>
                    <button onClick={onClose} className='cancel-btn'>Cancel</button>
                    <button onClick={handleDelete} className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default EditBookModal;
