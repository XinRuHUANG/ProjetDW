import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function BooksIndex({ books: serverBooks, userFavorites }) {
    const [books, setBooks] = useState(serverBooks || []);
     const [favorites, setFavorites] = useState(() => {
        // Si userFavorites est défini et non vide, on le map pour en faire un tableau d'entiers
        return Array.isArray(userFavorites) ? userFavorites.map(id => parseInt(id)) : []});

    const [filters, setFilters] = useState({
        searchQuery: '',
        genre: '',
        availability: '',
        minRating: 0
    });
   
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get(route('favorites.index'));
                const ids = response.data.favorites.map(book => book.idBook);
                setFavorites(ids);
            } catch (error) {
                console.error("Erreur lors du rechargement des favoris", error);
            }
        };
    
        fetchFavorites();
    }, []);

    const toggleFavorite = async (bookId) => {
        try {
            const response = await axios.post(route('favorites.toggle'), { idBook  : bookId });
    
            // Recharge les favoris à partir de la BDD
            const updated = await axios.get('/api/favoris');
            setFavorites(updated.data.favorites);

            console.log('Favoris actuels:', favorites);
        } catch (error) {
            console.error('Erreur lors du toggle favori', error);
        }
    };

    const filteredBooks = books.filter(book => {
        const matchesSearch = filters.searchQuery === '' ||
            book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());

        const matchesGenre = filters.genre === '' || book.category === filters.genre;
        const matchesAvailability = filters.availability === '' ||
            (filters.availability === 'available' && book.status === 'Available') ||
            (filters.availability === 'borrowed' && book.status === 'Borrowed');

        const matchesRating = !book.rating || book.rating >= filters.minRating;

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

                            {/* Filtres */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    value={filters.searchQuery}
                                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                                    placeholder="Titre, auteur..."
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                />

                                <select
                                    value={filters.genre}
                                    onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Tous genres</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="science-fiction">Science-Fiction</option>
                                    <option value="thriller">Thriller</option>
                                    <option value="classique">Classique</option>
                                </select>

                                <select
                                    value={filters.availability}
                                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">Tous</option>
                                    <option value="available">Disponible</option>
                                    <option value="borrowed">Emprunté</option>
                                </select>

                                <select
                                    value={filters.minRating}
                                    onChange={(e) => setFilters({ ...filters, minRating: Number(e.target.value) })}
                                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="0">Toutes notes</option>
                                    <option value="4">4+ ⭐</option>
                                    <option value="4.5">4.5+ ⭐</option>
                                </select>
                            </div>

                            {/* Grille de livres */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {filteredBooks.map(book => (
                                    <div key={book.idBook} className="group relative">
                                       <button
  onClick={() => toggleFavorite(book.idBook)}
  className={`mt-2 px-3 py-1 rounded ${
    favorites.includes(book.idBook)
      ? 'bg-red-600 text-white'
      : 'bg-gray-200 text-black'
  }`}
>
  {favorites.includes(book.idBook) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
</button>

                                        <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                                            <img
                                                src={book.cover || '/placeholder.jpg'}
                                                alt={book.title}
                                                className="h-full w-full object-cover group-hover:opacity-90 transition-opacity"
                                            />
                                        </div>

                                        <div className="mt-3">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {book.author}
                                            </p>
                                            <div className="mt-1 flex justify-between items-center">
                                                <span className={`text-xs px-2 py-1 rounded ${
                                                    book.status === 'Available' 
                                                        ? 'bg-green-100 dark:bg-green-900'
                                                        : 'bg-yellow-100 dark:bg-yellow-900'
                                                }`}>
                                                    {book.status === 'Available' ? 'Disponible' : 'Emprunté'}
                                                </span>
                                                <span className="text-xs">
                                                    {book.rating || '–'} ⭐
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
