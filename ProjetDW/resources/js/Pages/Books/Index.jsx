import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const mockBooks = [
    // Fiction
    { 
      id: 1, 
      title: "Le Seigneur des Anneaux", 
      author: "J.R.R. Tolkien", 
      genre: "fantasy", 
      year: 1954,
      cover: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
      available: true,
      rating: 4.8
    },
    { 
      id: 2, 
      title: "Harry Potter à l'école des sorciers", 
      author: "J.K. Rowling", 
      genre: "fantasy", 
      year: 1997,
      cover: "https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF1000,1000_QL80_.jpg",
      available: false,
      rating: 4.7
    },
    // ... (keep all your other mock books)
];

export default function BooksIndex() {
    // State for favorites with localStorage persistence
    const [favorites, setFavorites] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('libraryFavorites');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // State for filters
    const [filters, setFilters] = useState({
        searchQuery: '',
        genre: '',
        availability: '',
        minRating: 0
    });

    // Save favorites to localStorage when they change
    useEffect(() => {
        localStorage.setItem('libraryFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Toggle favorite status
    const toggleFavorite = (bookId) => {
        setFavorites(prev => 
            prev.includes(bookId) 
                ? prev.filter(id => id !== bookId) 
                : [...prev, bookId]
        );
    };

    // Filter books based on current filters
    const filteredBooks = mockBooks.filter(book => {
        const matchesSearch = filters.searchQuery === '' || 
            book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
            book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());
        
        const matchesGenre = filters.genre === '' || book.genre === filters.genre;
        const matchesAvailability = filters.availability === '' || 
            (filters.availability === 'available' && book.available) || 
            (filters.availability === 'borrowed' && !book.available);
        
        const matchesRating = book.rating >= filters.minRating;
        
        return matchesSearch && matchesGenre && matchesAvailability && matchesRating;
    });

    return (
        <AuthenticatedLayout>
            <Head title="Catalogue de Livres" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-6">Catalogue des Livres</h1>
                            
                            {/* Enhanced Filters */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                                {/* Search */}
                                <input
                                    type="text"
                                    value={filters.searchQuery}
                                    onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                                    placeholder="Titre, auteur..."
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                
                                {/* Genre Filter */}
                                <select
                                    value={filters.genre}
                                    onChange={(e) => setFilters({...filters, genre: e.target.value})}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Tous genres</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="science-fiction">Science-Fiction</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="classique">Classique</option>
                                </select>
                                
                                {/* Availability Filter */}
                                <select
                                    value={filters.availability}
                                    onChange={(e) => setFilters({...filters, availability: e.target.value})}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Tous</option>
                                    <option value="available">Disponible</option>
                                    <option value="borrowed">Emprunté</option>
                                </select>
                                
                                {/* Rating Filter */}
                                <select
                                    value={filters.minRating}
                                    onChange={(e) => setFilters({...filters, minRating: Number(e.target.value)})}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="0">Toutes notes</option>
                                    <option value="4">4+ ⭐</option>
                                    <option value="4.5">4.5+ ⭐</option>
                                </select>
                            </div>
                            
                            {/* Enhanced Books Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {filteredBooks.map(book => (
                                    <div key={book.id} className="group relative">
                                        {/* Favorite Button */}
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(book.id);
                                            }}
                                            className={`absolute top-2 right-2 z-10 p-2 rounded-full ${
                                                favorites.includes(book.id) 
                                                    ? 'text-red-500 bg-white/90' 
                                                    : 'text-gray-400 bg-white/70'
                                            }`}
                                        >
                                            {favorites.includes(book.id) ? '❤️' : '🤍'}
                                        </button>
                                        
                                        {/* Book Cover */}
                                        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="h-full w-full object-cover group-hover:opacity-90 transition-opacity"
                                            />
                                        </div>
                                        
                                        {/* Book Info */}
                                        <div className="mt-3">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {book.author}
                                            </p>
                                            <div className="mt-1 flex justify-between items-center">
                                                <span className={`text-xs px-2 py-1 rounded ${
                                                    book.available 
                                                        ? 'bg-green-100 dark:bg-green-900' 
                                                        : 'bg-yellow-100 dark:bg-yellow-900'
                                                }`}>
                                                    {book.available ? 'Disponible' : 'Emprunté'}
                                                </span>
                                                <span className="text-xs">
                                                    {book.rating} ⭐
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
