import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function ObjetConnectes() {
    return (
        <AuthenticatedLayout>
            <Head title="Objets Connectés" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-2xl font-bold mb-6">Recherche d'Objets Connectés</h1>
                            
                            {/* Barre de recherche et filtres */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nom de l'objet..."
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                </div>
                                
                                <div>
                                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                        <option value="">Tous les types</option>
                                        <option value="thermostat">Thermostat</option>
                                        <option value="camera">Caméra</option>
                                        <option value="capteur">Capteur</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                                        <option value="">Tous les statuts</option>
                                        <option value="actif">Actif</option>
                                        <option value="inactif">Inactif</option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Résultats (vide pour l'instant) */}
                            <div className="text-center py-12 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p className="text-gray-500 dark:text-gray-300">
                                    Les résultats des objets connectés apparaîtront ici
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
