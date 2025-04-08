import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children, header }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation */}
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex space-x-4 items-center">
                            <Link href="/" className="text-lg font-bold text-gray-800">
                                🏠 Dashboard
                            </Link>
                            <Link href={route('profile.edit')} className="text-gray-600 hover:text-gray-800">
                                👤 Profil
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600 text-sm">
                                {auth.user.first_name} {auth.user.last_name}
                            </span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Se déconnecter
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

<<<<<<< HEAD
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
=======
            {/* Header */}
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main content */}
            <main>{children}</main>
>>>>>>> bf8e38b (dernier modif)
        </div>
    );
}

