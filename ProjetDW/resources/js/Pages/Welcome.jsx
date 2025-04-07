import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';



export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    // Données simulées - remplacez par vos livres
    const mockBooks = [
        { 
            id: 1, 
            title: "Le Seigneur des Anneaux", 
            author: "J.R.R. Tolkien", 
            year: "1954", 
            genre: "fantasy",
            cover: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg"
        },
        { 
            id: 2, 
            title: "Dune", 
            author: "Frank Herbert", 
            year: "1965", 
            genre: "science-fiction",
            cover: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg"
        },
        { 
            id: 3, 
            title: "1984", 
            author: "George Orwell", 
            year: "1949", 
            genre: "dystopie",
            cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg"
        },
        { 
            id: 4, 
            title: "Harry Potter à l'école des sorciers", 
            author: "J.K. Rowling", 
            year: "1997", 
            genre: "fantasy",
            cover: "https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF1000,1000_QL80_.jpg"
        },
        { 
            id: 5, 
            title: "Le Petit Prince", 
            author: "Antoine de Saint-Exupéry", 
            year: "1943", 
            genre: "conte",
            cover: "https://m.media-amazon.com/images/I/71M4JH5gECL._AC_UF1000,1000_QL80_.jpg"
        },
    ];

    // Filtrage des livres
    const filteredBooks = mockBooks.filter(book => {
        const matchesSearch = searchQuery === '' || 
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            book.author.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesYear = yearFilter === '' || book.year === yearFilter;
        const matchesGenre = genreFilter === '' || book.genre === genreFilter;
        
        return matchesSearch && matchesYear && matchesGenre;
    });

    // Options pour les filtres (générées dynamiquement)
    const availableYears = [...new Set(mockBooks.map(book => book.year))];
    const availableGenres = [...new Set(mockBooks.map(book => book.genre))];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                {/* Sidebar */}
                <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-6 text-black dark:text-white">Menu</h2>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link href={route('livres.index')}
                                     className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Livres
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('objets.connectes')} 
       
                                   
                                    className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Objet Connectés
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('salles.index')} className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Salles
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" 
                                    className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white">
                                        Favoris
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Overlay when sidebar is open */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-7xl px-6">
                        <header className="grid grid-cols-3 items-center gap-2 py-6">
                            {/* Menu button */}
                            <button 
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            
                            {/* Logo */}
                           <div className="flex justify-center">
   
                         </div>

                            
                            {/* Auth links */}
                            <nav className="flex justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                        <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-2">
      Actualités de la bibliothèque
    </h3>
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

                            {/* Barre de recherche simplifiée */}
                            <div className="mb-12 flex justify-center">
                <div className="w-full max-w-4xl">
                    <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                        {/* Champ de recherche principal */}
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Rechercher auteur, livre..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-full border border-gray-300 px-6 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#FF2D20] p-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* Filtre Année */}
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

                        {/* Filtre Genre */}
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
                    <div key={book.id} className="group cursor-pointer">
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700">
                            <img 
                                src={book.cover} 
                                alt={book.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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

                            {/* Section À la une */}
                            <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-black dark:text-white">
            {searchQuery || yearFilter || genreFilter ? "Résultats" : "À la une"}
        </h2>
        
        {filteredBooks?.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredBooks.map((book) => (
                    <div key={book.id} className="group cursor-pointer">
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700">
                            <img 
                                src={book.cover} 
                                alt={book.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                {searchQuery || yearFilter || genreFilter 
                    ? "Aucun résultat trouvé" 
                    : "Chargement des livres..."}
            </p>
        )}
    </div>
</main>

                        <footer className="py-8 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
