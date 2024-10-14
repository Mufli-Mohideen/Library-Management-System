import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import '../components/Auth'
import Swal from 'sweetalert2';


import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/Auth.css';
import '../styles/Dashboard.css';

// Defining a book object
interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
}

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Fetch books from the API when the dashboard is loaded
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5289/api/Books');
                if (response.ok) {
                    const data: Book[] = await response.json();
                    setBooks(data);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error Fetching the Books.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Function to add a new book
    const handleAddBook = async (newBook: Omit<Book, 'id'>) => {
        // Check if a book with the same title already exists
        const exists = books.some(book => book.title.toLowerCase() === newBook.title.toLowerCase());
        
        if (exists) {
            Swal.fire({
                title: 'Warning!',
                text: 'A book with the same title already exists.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5289/api/Books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });
    
            if (response.ok) {
                const savedBook: Book = await response.json();
                setBooks([...books, savedBook]);
                Swal.fire({
                    title: 'Success!',
                    text: 'Book added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Failed to add book');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add book.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error adding book:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error adding book.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    

    // Function to update an existing book
    const handleEditBook = async (updatedBook: Book) => {
        try {
            const response = await fetch(`http://localhost:5289/api/Books/${updatedBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (response.ok) {
                const updatedBooks = books.map((book) =>
                    book.id === updatedBook.id ? updatedBook : book
                );
                setBooks(updatedBooks);
                Swal.fire({
                    title: 'Success!',
                    text: 'Book updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Failed to update book');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update book.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error updating book:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error updating book.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // Function to open the edit modal with the selected book's details
    const handleEditClick = (book: Book) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    const handleDeleteBook = async (bookId: string) => {
        try {
            const response = await fetch(`http://localhost:5289/api/Books/${bookId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setBooks(books.filter((book) => book.id !== bookId));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Book deleted successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Failed to delete book');
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to delete book.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error deleting book:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting book.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    // New filteredBooks array based on search query
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle logout
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!',
        }).then((result) => {

            if (result.isConfirmed) {
                console.log('User logged out');
                navigate('/auth');
            } else {
                Swal.fire({
                    title: 'Logout cancelled!',
                    icon: 'info',
                });
            }
        }).catch((error) => {
            console.error('Error during logout:', error);
            Swal.fire({
                title: 'An error occurred while logging out!',
                icon: 'error',
            });
        });
    };

    if (isLoading) {
        return <div>Loading books...</div>;
    };

    if (isError) {
        return <div>Error loading books. Please try again later.</div>;
    }

    return (
        <div className="dashboard-container">
            <nav className="nav-bar">
                <div className="nav-left">
                    <h3 className="logo">Library Management System</h3>
                </div>
                <div className="nav-center">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search books"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="nav-right">
                    <button className="add-book-btn" onClick={() => setIsAddModalOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} className="add-icon" /> Add Book
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <main className="book-list">
                {filteredBooks.map((book) => (
                    <div className="book-card" key={book.id}>
                        <img src={book.imageUrl} alt={book.title} className="book-img" />
                        <div className="book-details">
                            <h2 className="book-title">{book.title}</h2>
                            <h3 className="book-author">by {book.author}</h3>
                            <p className="book-description">{book.description}</p>
                            <button
                                type="button"
                                className="edit-book-btn"
                                onClick={() => handleEditClick(book)}
                            >
                                Edit Book
                            </button>
                        </div>
                    </div>
                ))}
            </main>

            {/* Modal for Adding a Book */}
            <AddBookModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onAddBook={handleAddBook} 
            />

            {/* Modal for Editing a Book */}
            {selectedBook && (
                <EditBookModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    book={selectedBook}
                    onEditBook={handleEditBook}
                    onDeleteBook={handleDeleteBook}
                />
            )}
        </div>
    );
};

export default Dashboard;
