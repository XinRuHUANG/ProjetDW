import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion,books }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    // Filtrage des livres
    const filteredBooks = books.filter(book => {
        const matchesSearch = searchQuery === '' || 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesYear = yearFilter === '' || book.year === yearFilter;
        const matchesGenre = genreFilter === '' || book.genre === genreFilter;
        
        return matchesSearch && matchesYear && matchesGenre;
    });

    // Options pour les filtres (générées dynamiquement)
    const availableYears = [...new Set(books.map(book => book.year))];
    const availableGenres = [...new Set(books.map(book => book.genre))];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">Menu</h2>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link href={route('livres.index')} className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Livres
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('objets.connectes')} className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Objets Connectés
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('salles.index')} className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Salles
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Favoris
                                    </Link>
                                </li>
                                <li>
                                    {auth.user && auth.user.id_user_type === 3 && (
                                        <Link href={route('admin.dashboard')} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                                            Espace Admin
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Overlay when sidebar is open */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                )}

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-7xl px-6">
                        <header className="grid grid-cols-3 items-center gap-2 py-6">
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md text-white hover:bg-gray-200 dark:hover:bg-zinc-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className="flex justify-center">
                                <h1 className="text-4xl font-bold text-white">Bienvenue à la Bibliothèque Connectée</h1>
                            </div>
                            <nav className="flex justify-end">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="rounded-md px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="rounded-md px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition">
                                            Log in
                                        </Link>
                                        <Link href={route('register')} className="rounded-md px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 transition">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                                <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-2">Actualités de la bibliothèque</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 dark:text-blue-300 mr-2">•</span>
                                        <span>Exposition Tolkien du 15/09 au 20/10</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 dark:text-blue-300 mr-2">•</span>
                                        <span>Atelier d'écriture le 25/09 (sur inscription)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 dark:text-blue-300 mr-2">•</span>
                                        <span>Nouveaux horaires : 9h-19h du lundi au samedi</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Barre de recherche améliorée */}
                            <div className="mb-12 flex justify-center">
                                <div className="w-full max-w-4xl">
                                    <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                                        <div className="relative flex-grow">
                                            <input
                                                type="text"
                                                placeholder="Rechercher auteur, livre..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full rounded-full border border-gray-300 px-6 py-3 shadow-lg focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                            />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#FF2D20] p-2 text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <select
                                            value={yearFilter}
                                            onChange={(e) => setYearFilter(e.target.value)}
                                            className="rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                        >
                                            <option value="">Toutes années</option>
                                            {availableYears.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>

                                        <select
                                            value={genreFilter}
                                            onChange={(e) => setGenreFilter(e.target.value)}
                                            className="rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                                        >
                                            <option value="">Tous genres</option>
                                            {availableGenres.map(genre => (
                                                <option key={genre} value={genre}>{genre}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Résultats de recherche */}
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {filteredBooks.map((book) => (
                                    <div key={book.id} className="group cursor-pointer transition-all transform hover:scale-105">
                                        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700">
                                            <img 
                                                src={book.cover} 
                                                alt={book.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="mt-2">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {book.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {book.author} ({book.year})
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </main>

                        <footer className="py-8 text-center text-sm text-white">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

