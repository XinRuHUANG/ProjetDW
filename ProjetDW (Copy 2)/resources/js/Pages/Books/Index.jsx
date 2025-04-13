import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function BooksIndex() {
    const { books=[], categories=[] } = usePage().props;
    
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('libraryFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    const [filters, setFilters] = useState({
        searchQuery: '',
        year: '',
        genre: '',
    });

    useEffect(() => {
        localStorage.setItem('libraryFavorites', JSON.stringify(favorites));
    }, [favorites]);

    const handleFavorite = (bookId) => {
        router.post(route('favoris.store'), { id_book: bookId });
        if (!favorites.includes(bookId)) setFavorites([...favorites, bookId]);
    };

    const handleBorrow = (bookId) => {
        router.post(route('borrow.store'), { id_book: bookId });
    };

    const filteredBooks = books.filter((book) => {
        const matchSearch =
            filters.searchQuery === '' ||
            book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(filters.searchQuery.toLowerCase());

        const matchYear = filters.year === '' || book.year == filters.year;
        const matchGenre = filters.genre === '' || book.category?.name === filters.genre;

        return matchSearch && matchYear && matchGenre;
    });

    const availableYears = [...new Set(books.map((book) => book.year))];
    const availableGenres = [...new Set(categories.map((cat) => cat.name))];
console.log('Books:', books);
    console.log('Categories:', categories);
    return (
        <AuthenticatedLayout>
            <Head title="Catalogue des Livres" />

            <div className="max-w-7xl mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold text-center mb-8">📚 Catalogue des Livres</h1>

                {/* Filtres */}
                <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <input
                        type="text"
                        placeholder="Recherche titre ou auteur..."
                        className="border px-4 py-2 rounded w-full sm:w-64"
                        value={filters.searchQuery}
                        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    />
                    <select
                        value={filters.year}
                        onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="">Toutes années</option>
                        {availableYears.map((year) => (
                            <option key={year}>{year}</option>
                        ))}
                    </select>
                    <select
                        value={filters.genre}
                        onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                        className="border px-4 py-2 rounded"
                    >
                        <option value="">Tous genres</option>
                        {availableGenres.map((genre) => (
                            <option key={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                {/* Affichage des livres */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id_book} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                            <img
                                src={book.cover_image_url || '/default-book.jpg'}
                                alt={book.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{book.title}</h2>
                                <p className="text-gray-600">{book.author}</p>
                                <p className="text-sm text-gray-500">{book.year} — {book.category?.name}</p>

                                <div className="mt-4 flex justify-between">
                                    <button
                                        onClick={() => handleFavorite(book.id_book)}
                                        className={`px-3 py-1 text-sm rounded ${
                                            favorites.includes(book.id_book)
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                        } hover:bg-red-600`}
                                    >
                                        ❤️ Favori
                                    </button>
                                    
                                    <button
                                        onClick={() => handleBorrow(book.id_book)}
                                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        📚 Emprunter
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

