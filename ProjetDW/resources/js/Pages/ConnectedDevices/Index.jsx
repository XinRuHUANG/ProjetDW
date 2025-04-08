import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function ConnectedDevicesIndex({ devices, filters }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const filteredDevices = devices.filter(device => {
        const matchesSearch = device.model.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = typeFilter === '' || device.equipmentType === typeFilter;
        const matchesStatus = statusFilter === '' || device.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <>
            <Head title="Objets Connectés" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Objets Connectés</h1>

                {/* Barre de recherche */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Rechercher par modèle..."
                        className="p-2 border rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Tous types</option>
                        <option value="Computer">Ordinateur</option>
                        <option value="Tablet">Tablette</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Tous statuts</option>
                        <option value="Available">Disponible</option>
                        <option value="In Use">En cours d'utilisation</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Retired">Retraité</option>
                    </select>
                </div>

                {/* Liste des objets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDevices.map(device => (
                        <div key={device.idEquipment} className="border rounded p-4 bg-white shadow">
                            <h2 className="text-lg font-semibold">{device.model}</h2>
                            <p>Type : {device.equipmentType}</p>
                            <p>Statut : {device.status}</p>
                            <p>Marque : {device.brand}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

