import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, user}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>

            <div>
                <h2>Mes favoris</h2>

                {/* Vérifier si l'utilisateur a des favoris */}
                {user?.favorites.length === 0 ? (
                    <p>Aucun livre dans vos favoris pour le moment.</p>
                ) : (
                    <ul>
                        {user.favorites.map((favorite) => (
                        <li key={favorite.id}>
                            <strong>{favorite.title}</strong> par {favorite.author} (publiée en {favorite.yearPublished})
                        </li>
                        ))}
                    </ul>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
