import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function FavoritesIndex({ favorites, setFavorites }) {
    const removeFavorite = (bookId) => {
        setFavorites(prev => prev.filter(book => book.id !== bookId));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Mes Favoris" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-6">Mes Favoris</h1>
                            
                            {favorites.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                    {favorites.map(book => (
                                        <div key={book.id} className="relative group">
                                            <button
                                                onClick={() => removeFavorite(book.id)}
                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                                            >
                                                ❌
                                            </button>
                                            <img 
                                                src={book.cover} 
                                                alt={book.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <h3 className="mt-2 font-medium">{book.title}</h3>
                                            <p className="text-sm text-gray-500">{book.author}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Vous n'avez aucun favori</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
