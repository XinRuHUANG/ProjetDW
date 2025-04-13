import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function EquipmentUsageRequests({ usages }) {
    const handleApprove = (id) => {
        router.patch(route('admin.equipment.approve', id));
    };

    const handleReject = (id) => {
        router.patch(route('admin.equipment.reject', id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Demandes d'Équipement" />

            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">📋 Demandes d'utilisation d'équipements</h1>

                <table className="w-full border-collapse border">
                    <thead className="bg-gray-100 dark:bg-zinc-800">
                        <tr>
                            <th className="p-3 border">Utilisateur</th>
                            <th className="p-3 border">Équipement</th>
                            <th className="p-3 border">Début</th>
                            <th className="p-3 border">Fin</th>
                            <th className="p-3 border">Motif</th>
                            <th className="p-3 border">Statut</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usages.map((usage) => (
                            <tr key={usage.id_usage} className="text-center border-b">
                                <td className="p-2">{usage.user?.first_name} {usage.user?.last_name}</td>
                                <td className="p-2">{usage.equipment?.equipment_type} ({usage.equipment?.model})</td>
                                <td className="p-2">{usage.start_date_time}</td>
                                <td className="p-2">{usage.end_date_time}</td>
                                <td className="p-2">{usage.purpose || '—'}</td>
                                <td className="p-2 font-bold">
                                    {usage.status === 'approved' ? (
                                        <span className="text-green-600">✔ Approuvé</span>
                                    ) : usage.status === 'rejected' ? (
                                        <span className="text-red-600">✖ Rejeté</span>
                                    ) : (
                                        <span className="text-yellow-500">⏳ En attente</span>
                                    )}
                                </td>
                                <td className="p-2 space-x-2">
                                    {usage.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleApprove(usage.id_usage)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                                ✅ Approuver
                                            </button>
                                            <button onClick={() => handleReject(usage.id_usage)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                                                ❌ Rejeter
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}

