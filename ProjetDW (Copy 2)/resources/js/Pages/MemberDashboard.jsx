import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function MemberDashboard({ auth }) {
    return (
        <AuthenticatedLayout>
            <Head title="Espace Membre" />
            
            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Bienvenue {auth.user.name} !</h1>
                        <Link 
                            href="/" 
                            className="text-blue-500 hover:underline"
                        >
                            ← Retour à l'accueil
                        </Link>
                    </div>
                    
                    {/* Contenu spécifique au dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Vos cartes de fonctionnalités ici */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
