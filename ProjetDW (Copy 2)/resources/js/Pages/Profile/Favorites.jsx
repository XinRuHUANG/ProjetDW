import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Favorites({ auth, favorites }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mes Favoris" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Mes Livres Favoris</h1>
                        
                        {favorites.data.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">Vous n'avez aucun livre favori.</p>
                                <Link 
                                    href={route('books.index')} 
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Parcourir les livres
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {favorites.data.map(book => (
                                        <div key={book.idBook} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <h3 className="font-semibold text-lg">{book.title}</h3>
                                            <p className="text-gray-600">{book.author}</p>
                                            {book.category && (
                                                <p className="text-sm text-gray-500 mt-2">{book.category}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {favorites.links && (
                                    <div className="mt-6 flex justify-center">
                                        {Object.entries(favorites.links).map(([key, link]) => (
                                            link.url && (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-3 py-1 mx-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}