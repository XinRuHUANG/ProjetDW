import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({ auth, user }) {


    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-bold text-gray-800">👤 Mon Profil</h2>}>
            <Head title="Profil" />

            <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-8 mt-10">

                <div className="flex items-center gap-6">
                    {user.photo_url ? (
                        <img src={`/storage/profile-photos/${user.photo_url}`} alt="Photo de profil" className="w-24 h-24 rounded-full object-cover" />
                    ) : (
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            Aucune photo
                        </div>
                        
                    )}
                    <div>
                        <h3 className="text-2xl font-semibold">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>
                
                
                <hr className="my-6" />
                
                <UpdateProfileInformationForm className="mt-6" />
                <UpdatePasswordForm className="mt-6" />
                <DeleteUserForm className="mt-6" />
                
                                
                <div className="pt-6 border-t text-sm text-gray-500">
                    <p><strong>Points :</strong> {user.points}</p>
                    <p><strong>Type utilisateur :</strong> {user.id_user_type}</p>
                    <p><strong>Compte actif :</strong> {user.is_active ? 'Oui ✅' : 'Non ❌'}</p>
                    <p><strong>Créé le :</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                    <p><strong>Dernière mise à jour :</strong> {new Date(user.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

