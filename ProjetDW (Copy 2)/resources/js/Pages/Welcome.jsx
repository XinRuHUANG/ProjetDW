import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion, books, rooms, equipments }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title="Welcome to Our Library" />
            <div 
                className="bg-gray-50 text-black dark:bg-black dark:text-white overflow-hidden" 
                style={{
                    backgroundImage: 'url(https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)', 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundAttachment: 'fixed',
                    backgroundRepeat: 'no-repeat', 
                }}
            >
                {/* Sidebar */}
                <div className={`mb-12 bg-orange-50/70 dark:bg-red/10 p-6 rounded-lg border border-orange-100 dark:border-orange-800 fixed inset-y-0 left-0 z-50 w-64 bg-red dark:bg-zinc-800 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-6 text-yellow dark:text-yellow">Menu</h2>
                        <nav>
                            <ul className="space-y-3">
                                <li>
                                    <Link href={route('livres.index')} className="block px-4 py-2 rounded hover:bg-orange-100 dark:hover:bg-zinc-600 text-black dark:text-white transition-all duration-300 ease-in-out">
                                        Livres
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('equipments.index')} className="block px-4 py-2 rounded hover:bg-orange-100 dark:hover:bg-zinc-600 text-black dark:text-white transition-all duration-300 ease-in-out">
                                        Objets Connectés
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('salles.index')} className="block px-4 py-2 rounded hover:bg-orange-100 dark:hover:bg-zinc-600 text-black dark:text-white transition-all duration-300 ease-in-out">
                                        Salles
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="block px-4 py-2 rounded hover:bg-orange-100 dark:hover:bg-zinc-600 text-black dark:text-white transition-all duration-300 ease-in-out">
                                        Favoris 
                                    </Link>
                                </li>
                                <li>
                                    {auth.user && auth.user.id_user_type === 3 && (
                                        <Link href={route('admin.dashboard')} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-all duration-300 ease-in-out">
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
                    <div className="fixed inset-0 z-40 bg-black/10 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
                )}

                {/* Main content */}
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-7xl px-6">
                        {/* Menu header */}
                        <header className="grid grid-cols-3 items-center gap-2 py-6">
                            {/* Menu button */}
                            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-md  bg-gray-50/50 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-300 ease-in-out">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Logo */}
                            <div className="flex justify-center">
                                {/* Logo ici */}
                            </div>

                            {/* Auth links */}
                            <nav className="flex justify-end">
                                { auth.user ? (
                                    <Link href={route('dashboard')} className="mb-12 bg-orange-50/70 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800 block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-zinc-600 text-black dark:text-red transition-all duration-300 ease-in-out">
                                        Tableau de bord
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="mb-12 bg-orange-50/70 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800 block px-4 py-2 rounded hover:bg-green-100 dark:hover:bg-zinc-600 text-black dark:text-red transition-all duration-300 ease-in-out">
                                            Log in
                                        </Link><div>  ok</div>
                                        <Link href={route('register')} className="mb-12 bg-orange-50/70 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800 block px-4 py-2 rounded hover:bg-yellow-100 dark:hover:bg-zinc-600 text-black dark:text-white transition-all duration-300 ease-in-out">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        {/* Main content */}
                        <main className="mt-6">
                            <div className="mb-12 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
                                <h3 className="font-bold text-lg text-orange-800 dark:text-orange-200 mb-2">
                                    Bienvenue à la Bibliothèque Connectée
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Découvrez une expérience unique de lecture avec une vaste collection de livres, des salles de lecture adaptées et des équipements connectés.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {/* Aperçu des livres */}
                                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-zinc-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Nos Livres</h4>
                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        {books.slice(0, 3).map((book) => (
                                            <div key={book.id} className="flex items-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                                <img src={book.cover} alt={book.title} className="w-16 h-24 object-cover rounded-md" />
                                                <div className="ml-4">
                                                    <h5 className="text-sm text-gray-900 dark:text-white">{book.title}</h5>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Aperçu des salles */}
                                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-zinc-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Nos Salles</h4>
                                    <div className="mt-4">
                                        {rooms.slice(0, 3).map((room) => (
                                            <div key={room.id} className="mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">{room.room_name}</h5>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{room.features}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Aperçu des équipements */}
                                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-zinc-700 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Équipements Connectés</h4>
                                    <div className="mt-4">
                                        {equipments.slice(0, 3).map((equipment) => (
                                            <div key={equipment.id} className="mb-4 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                                                <h5 className="text-sm font-medium text-gray-900 dark:text-white">{equipment.equipment_type}</h5>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{equipment.model}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

