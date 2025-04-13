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
                            ⬅ 🏠Acceuil
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
        </div>
    );
}

