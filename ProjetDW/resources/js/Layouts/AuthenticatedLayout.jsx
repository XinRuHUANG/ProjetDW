import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0`}>
                {/* Section Membre avec dropdown */}
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <div className="flex items-center space-x-3 cursor-pointer">
                                <img 
                                    src={auth.user.photo_path || '/images/default-avatar.jpg'} 
                                    alt={auth.user.first_name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">{auth.first_name}</p>
                                    <p className="text-xs text-gray-500">Membre</p>
                                </div>
                            </div>
                        </Dropdown.Trigger>

                        <Dropdown.Content align="left" width="48">
                            <Dropdown.Link href={route('profile.edit')}>
                                👤 Mon profil
                            </Dropdown.Link>
                            
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                🚪 Déconnexion
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>

                {/* Navigation principale */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                href={route('members.index')}
                                active={route().current('members.index')}
                                
                                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                👥 Membres
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route('books.index')}
                                active={route().current('books.index')}
                                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                📚 Livres
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href="/"
                                
                                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                            >
                                💻 Appareils
                            </NavLink>
                        </li>
                        <li>
    <NavLink
        href={route('favorites.index')}
        active={route().current('favorites.index')}
        className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
    >
        ❤️ Favoris
    </NavLink>
</li>

                    </ul>
                </nav>
            </div>
            

            {/* Overlay mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/50 md:hidden" 
                    onClick={() => setSidebarOpen(false)}
                />
            )}

<nav className="md:ml-64 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-800">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            {/* Partie gauche - Logo et bouton menu mobile */}
            <div className="flex items-center">
                {/* Bouton menu mobile (seulement visible sur mobile) */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="mr-2 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 md:hidden"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo cliquable (visible sur tous les écrans) */}
                <Link href={route('welcome.public')} className="flex items-center">
                    <ApplicationLogo className="h-8 w-auto fill-current text-gray-800 dark:text-white" />
                    <span className="ml-2 text-xl font-semibold dark:text-white hidden md:block">Bibliotech</span>
                </Link>
            </div>

            
        </div>
    </div>
</nav>

            {/* Contenu principal */}
            <main className="md:ml-64 py-6">
                {header && (
                    <header className="bg-white dark:bg-zinc-800 shadow mx-4 rounded-lg">
                        <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
