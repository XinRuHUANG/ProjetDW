import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm,router } from '@inertiajs/react';
import { useState } from 'react';

export default function ObjetsConnectes({ equipments }) {
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const { data, setData, post, reset, processing } = useForm({
        id_equipment: '',
        start_date_time: '',
        end_date_time: '',
        purpose: ''
    });

    const openForm = (equipment) => {
        setSelectedEquipment(equipment);
        setData('id_equipment', equipment.id_equipment);
    };

    const handleSubmit = () => {
        router.post(route('equipments.usage.request'), {
            id_equipment: selectedId,
            start_date_time: dateDebut,
            end_date_time: dateFin,
            purpose: raison,
        });
    };


    return (
        <AuthenticatedLayout>
            <Head title="Objets Connectés" />
            <div className="p-6 space-y-6 max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-center">Objets Connectés Disponibles</h1>

                <div className="grid md:grid-cols-2 gap-4">
                    {equipments.map((eq) => (
                        <div key={eq.id_equipment} className="border p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">{eq.equipment_type} - {eq.model}</h2>
                            <p className="text-sm text-gray-500">Marque : {eq.brand}</p>
                            <p>Status : <span className={`font-bold ${eq.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>{eq.status}</span></p>
                            <p>Localisation : {eq.location}</p>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                onClick={() => openForm(eq)}
                            >
                                Utiliser
                            </button>
                        </div>
                    ))}
                </div>

                {/* Formulaire modal */}
                {selectedEquipment && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full">
                            <h2 className="text-xl font-semibold mb-4">Demande d'utilisation : {selectedEquipment.model}</h2>

                            <label className="block mb-2">Début</label>
                            <input type="datetime-local" value={data.start_date_time} onChange={(e) => setData('start_date_time', e.target.value)} className="w-full p-2 border rounded mb-4" />

                            <label className="block mb-2">Fin</label>
                            <input type="datetime-local" value={data.end_date_time} onChange={(e) => setData('end_date_time', e.target.value)} className="w-full p-2 border rounded mb-4" />

                            <label className="block mb-2">Motif (facultatif)</label>
                            <input type="text" value={data.purpose} onChange={(e) => setData('purpose', e.target.value)} className="w-full p-2 border rounded mb-4" />

                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setSelectedEquipment(null)} className="px-4 py-2 bg-gray-300 rounded">Annuler</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={processing}>
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

