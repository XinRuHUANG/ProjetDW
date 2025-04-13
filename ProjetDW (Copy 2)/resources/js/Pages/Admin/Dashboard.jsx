import { router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({ users }) {
    // States pour les entités
    const [room, setRoom] = useState({ room_name: '', capacity: '', features: '', is_active: true });
    const [book, setBook] = useState({ title: '', author: '', isbn: '', year: '', id_category: '', summary: '', stock: '', status: 'Available', cover_image_url: '' });
    const [seat, setSeat] = useState({ seat_number: '', zone: '', features: '', is_active: true });
    const [equipment, setEquipment] = useState({ equipment_type: '', model: '', brand: '', status: 'Available', location: '', assigned_to: '', notes: '' });

    // Gérer changement de type utilisateur
    const handleChangeType = (userId, newType) => {
        router.patch(route('admin.users.update'), {
            id_user: userId,
            id_user_type: parseInt(newType),
        });
    };

    // Gérer suppression utilisateur
    const handleDelete = (userId) => {
        if (confirm("Es-tu sûr de vouloir supprimer cet utilisateur ?")) {
            router.delete(route('admin.users.delete', userId));
        }
    };

    // Gérer soumission générique
    const handleSubmit = (data, routeName) => {
        router.post(route(routeName), data);
    };

    return (
    <AuthenticatedLayout>
        <div className="max-w-5xl mx-auto p-6">
        <div className="flex justify-end mb-4">
            <button
                onClick={() => router.visit(route('admin.equipment.requests'))}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                📋 Voir les demandes d'utilisation d'équipements
            </button>
        </div>
        
        <div className="flex justify-end mb-4">
        <button
                onClick={() => router.visit(route('admin.rooms.requests'))}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                📋 Voir les demandes d'utilisation de salles
            </button>
        </div>
            <h1 className="text-3xl font-bold mb-8">Tableau de bord Admin</h1>

            {/* Gestion des utilisateurs */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">ID</th>
                            <th className="p-2 border">Nom</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id_user} className="text-center border-b">
                                <td className="p-2 border">{user.id_user}</td>
                                <td className="p-2 border">{user.first_name}</td>
                                <td className="p-2 border">{user.email}</td>
                                <td className="p-2 border">
                                    <select
                                        value={user.id_user_type}
                                        onChange={(e) => handleChangeType(user.id_user, e.target.value)}
                                        className="rounded px-2 py-1 border"
                                    >
                                        <option value={1}>Simple</option>
                                        <option value={2}>Avancé</option>
                                        <option value={3}>Admin</option>
                                    </select>
                                </td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleDelete(user.id_user)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Formulaires d'ajout */}
            <section className="space-y-10">
                {/* Salle */}
                <FormBlock title="Ajouter une Salle" onSubmit={() => handleSubmit(room, 'admin.rooms.store')}>
                    <Input placeholder="Nom de la salle" onChange={e => setRoom({ ...room, room_name: e.target.value })} />
                    <Input type="number" placeholder="Capacité" onChange={e => setRoom({ ...room, capacity: e.target.value })} />
                    <Input placeholder="Caractéristiques" onChange={e => setRoom({ ...room, features: e.target.value })} />
                </FormBlock>

                {/* Livre */}
                <FormBlock title="Ajouter un Livre" onSubmit={() => handleSubmit(book, 'admin.books.store')}>
                    <Input placeholder="Titre" onChange={e => setBook({ ...book, title: e.target.value })} />
                    <Input placeholder="Auteur" onChange={e => setBook({ ...book, author: e.target.value })} />
                    <Input placeholder="ISBN" onChange={e => setBook({ ...book, isbn: e.target.value })} />
                    <Input type="number" placeholder="Année" onChange={e => setBook({ ...book, year: e.target.value })} />
                    <Input type="number" placeholder="ID Catégorie" onChange={e => setBook({ ...book, id_category: e.target.value })} />
                    <Input placeholder="Résumé" onChange={e => setBook({ ...book, summary: e.target.value })} />
                    <Input type="number" placeholder="Stock" onChange={e => setBook({ ...book, stock: e.target.value })} />
                    <Input placeholder="Statut" onChange={e => setBook({ ...book, status: e.target.value })} />
                    <Input placeholder="URL Image" onChange={e => setBook({ ...book, cover_image_url: e.target.value })} />
                </FormBlock>

                {/* Siège */}
                <FormBlock title="Ajouter un Siège" onSubmit={() => handleSubmit(seat, 'admin.seats.store')}>
                    <Input placeholder="Numéro du siège" onChange={e => setSeat({ ...seat, seat_number: e.target.value })} />
                    <Input placeholder="Zone" onChange={e => setSeat({ ...seat, zone: e.target.value })} />
                    <Input placeholder="Caractéristiques" onChange={e => setSeat({ ...seat, features: e.target.value })} />
                </FormBlock>

                {/* Équipement */}
                <FormBlock title="Ajouter un Équipement" onSubmit={() => handleSubmit(equipment, 'admin.equipments.store')}>
                    <Input placeholder="Type" onChange={e => setEquipment({ ...equipment, equipment_type: e.target.value })} />
                    <Input placeholder="Modèle" onChange={e => setEquipment({ ...equipment, model: e.target.value })} />
                    <Input placeholder="Marque" onChange={e => setEquipment({ ...equipment, brand: e.target.value })} />
                    <Input placeholder="Statut" onChange={e => setEquipment({ ...equipment, status: e.target.value })} />
                    <Input placeholder="Localisation" onChange={e => setEquipment({ ...equipment, location: e.target.value })} />
                    <Input placeholder="Assigné à (id)" onChange={e => setEquipment({ ...equipment, assigned_to: e.target.value })} />
                    <Input placeholder="Notes" onChange={e => setEquipment({ ...equipment, notes: e.target.value })} />
                </FormBlock>
            </section>
        </div>
         </AuthenticatedLayout>
    );
}

// Composant pour chaque formulaire
function FormBlock({ title, onSubmit, children }) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid grid-cols-2 gap-3">
                {children}
                <button type="submit" className="col-span-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">
                    Ajouter
                </button>
            </form>
        </div>
       
    );
}

// Composant input générique
function Input({ type = 'text', ...props }) {
    return <input type={type} className="border px-3 py-2 rounded w-full" {...props} />;
}

