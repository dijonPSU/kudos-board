import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getRequest, postRequest, putRequest, deleteRequest } from './webRequests';
import './BoardDetails.css';

const GIPHY_API_KEY = 'snp2aFURx0Xl1SiINTH19NRDAA1fu26H';

const BoardDetails = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showNewCardForm, setShowNewCardForm] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('');
    const [newCardDescription, setNewCardDescription] = useState('');
    const [newCardAuthor, setNewCardAuthor] = useState('');
    const [newCardGif, setNewCardGif] = useState('');
    const [gifSearchTerm, setGifSearchTerm] = useState('');
    const [gifSearchResults, setGifSearchResults] = useState([]);
    const [isSearchingGifs, setIsSearchingGifs] = useState(false);

    useEffect(() => {
        fetchBoardDetails();
    }, [boardId]);

    const fetchBoardDetails = async () => {
        try {
            const data = await getRequest(`http://localhost:3000/board/${boardId}`);
            setBoard(data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching board details:", err);
            setError("Failed to load board details");
            setLoading(false);
        }
    };

    const handleUpvoteCard = async (cardId) => {
        try {
            await putRequest(`http://localhost:3000/card/${cardId}/upvote`);
            setBoard(prevBoard => {
                const updatedCards = prevBoard.cards.map(card => {
                    if (card.card_id === cardId) {
                        return { ...card, votes: card.votes + 1 };
                    }
                    return card;
                });
                return { ...prevBoard, cards: updatedCards };
            });
        } catch (err) {
            console.error("Error upvoting card:", err);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await deleteRequest(`http://localhost:3000/card/${cardId}`);
            setBoard(prevBoard => {
                const updatedCards = prevBoard.cards.filter(card => card.card_id !== cardId);
                return { ...prevBoard, cards: updatedCards };
            });
        } catch (err) {
            console.error("Error deleting card:", err);
        }
    };

    const searchGifs = async () => {
        if (!gifSearchTerm.trim()) return;

        setIsSearchingGifs(true);
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(gifSearchTerm)}&limit=9`);
            const data = await response.json();
            setGifSearchResults(data.data || []);
        } catch (err) {
            console.error("Error searching GIFs:", err);
        } finally {
            setIsSearchingGifs(false);
        }
    };

    const selectGif = (gifUrl) => {
        setNewCardGif(gifUrl);
        setGifSearchResults([]);
        setGifSearchTerm('');
    };

    const handleCreateCard = async (e) => {
        e.preventDefault();

        if (!newCardTitle.trim() || !newCardDescription.trim() || !newCardGif) {
            alert("Please fill in all required fields and select a GIF");
            return;
        }

        try {
            const newCard = await postRequest('http://localhost:3000/card', {
                title: newCardTitle,
                description: newCardDescription,
                gif: newCardGif,
                owner: newCardAuthor || 'Anonymous',
                board_id: boardId
            });

            // Add the new card to the board
            setBoard(prevBoard => ({
                ...prevBoard,
                cards: [...(prevBoard.cards || []), newCard]
            }));

            // Reset form
            setNewCardTitle('');
            setNewCardDescription('');
            setNewCardAuthor('');
            setNewCardGif('');
            setShowNewCardForm(false);
        } catch (err) {
            console.error("Error creating card:", err);
        }
    };

    if (loading) return <div className="board-details-container">Loading board details...</div>;
    if (error) return <div className="board-details-container">{error}</div>;
    if (!board) return <div className="board-details-container">Board not found</div>;

    return (
        <div className="board-details-container">
            <div className="board-details">
                <h1>{board.title}</h1>
                <h3>Category: {board.category}</h3>
                {board.owner && <p>Created by: {board.owner}</p>}

                <div className="board-actions">
                    <button
                        className="add-card-button"
                        onClick={() => setShowNewCardForm(!showNewCardForm)}
                    >
                        {showNewCardForm ? 'Cancel' : 'Add New Card'}
                    </button>
                    <Link to="/" className="back-button">Back to Boards</Link>
                </div>

                {showNewCardForm && (
                    <div className="new-card-form">
                        <h3>Create New Card</h3>
                        <form onSubmit={handleCreateCard}>
                            <div className="form-group">
                                <label>Title (required)</label>
                                <input
                                    type="text"
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message (required)</label>
                                <textarea
                                    value={newCardDescription}
                                    onChange={(e) => setNewCardDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Your Name (optional)</label>
                                <input
                                    type="text"
                                    value={newCardAuthor}
                                    onChange={(e) => setNewCardAuthor(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>GIF (required)</label>
                                <div className="gif-search">
                                    <input
                                        type="text"
                                        value={gifSearchTerm}
                                        onChange={(e) => setGifSearchTerm(e.target.value)}
                                        placeholder="Search for a GIF"
                                    />
                                    <button
                                        type="button"
                                        onClick={searchGifs}
                                        disabled={isSearchingGifs}
                                    >
                                        {isSearchingGifs ? 'Searching...' : 'Search'}
                                    </button>
                                </div>

                                {newCardGif && (
                                    <div className="selected-gif">
                                        <img src={newCardGif} alt="Selected GIF" />
                                        <button type="button" onClick={() => setNewCardGif('')}>Remove</button>
                                    </div>
                                )}

                                {gifSearchResults.length > 0 && (
                                    <div className="gif-results">
                                        {gifSearchResults.map(gif => (
                                            <div
                                                key={gif.id}
                                                className="gif-result"
                                                onClick={() => selectGif(gif.images.fixed_height.url)}
                                            >
                                                <img
                                                    src={gif.images.fixed_height_small.url}
                                                    alt={gif.title}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="create-card-button"
                                disabled={!newCardTitle || !newCardDescription || !newCardGif}
                            >
                                Create Card
                            </button>
                        </form>
                    </div>
                )}

                <div className="board-content">
                    {board.cards && board.cards.length > 0 ? (
                        <div className="cards-grid">
                            {board.cards.map((card) => (
                                <div key={card.card_id} className="card-item">
                                    <h3>{card.title}</h3>
                                    <div className="card-gif">
                                        <img src={card.gif} alt="Card GIF" />
                                    </div>
                                    <p className="card-description">{card.description}</p>
                                    {card.owner && <p className="card-author">By: {card.owner}</p>}
                                    <div className="card-actions">
                                        <div className="upvote-section">
                                            <button
                                                className="upvote-button"
                                                onClick={() => handleUpvoteCard(card.card_id)}
                                            >
                                                👍
                                            </button>
                                            <span className="vote-count">{card.votes || 0}</span>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteCard(card.card_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-cards">
                            <p>No cards yet. Add a new card to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoardDetails;
