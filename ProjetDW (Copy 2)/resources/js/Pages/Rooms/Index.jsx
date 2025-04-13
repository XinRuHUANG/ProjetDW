import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function RoomsIndex({ rooms, seats }) {
    const [activeRoomId, setActiveRoomId] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id_room: '',
        reservation_date: '',
        start_time: '',
        end_time: '',
        purpose: '',
        seats: [],
    });

    const openForm = (roomId) => {
        setActiveRoomId(prev => prev === roomId ? null : roomId);
        setData({
            id_room: roomId,
            reservation_date: '',
            start_time: '',
            end_time: '',
            purpose: '',
            seats: [],
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('salles.reserver'), {
            onSuccess: () => {
                reset();
                setActiveRoomId(null);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Salles disponibles" />

            <div className="max-w-6xl mx-auto py-10 px-6">
                <h1 className="text-3xl font-bold mb-8 text-center">📚 Réservation de Salles</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rooms.map(room => (
                        <div key={room.id_room} className="bg-white rounded-xl shadow p-6 relative">
                            <h2 className="text-xl font-semibold mb-2">{room.room_name}</h2>
                            <p><strong>Capacité :</strong> {room.capacity} personnes</p>
                            <p><strong>Caractéristiques :</strong> {room.features}</p>

                            <button
                                onClick={() => openForm(room.id_room)}
                                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                {activeRoomId === room.id_room ? 'Annuler' : 'Réserver'}
                            </button>

                            {activeRoomId === room.id_room && (
                                <form onSubmit={submit} className="mt-6 space-y-4 border-t pt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm">Date</label>
                                            <input
                                                type="date"
                                                value={data.reservation_date}
                                                onChange={(e) => setData('reservation_date', e.target.value)}
                                                className="w-full border px-3 py-2 rounded"
                                            />
                                            {errors.reservation_date && <p className="text-red-500 text-sm">{errors.reservation_date}</p>}
                                        </div>

                                        <div>
                                            <label className="text-sm">Objet</label>
                                            <input
                                                type="text"
                                                value={data.purpose}
                                                onChange={(e) => setData('purpose', e.target.value)}
                                                className="w-full border px-3 py-2 rounded"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm">Heure de début</label>
                                            <input
                                                type="time"
                                                value={data.start_time}
                                                onChange={(e) => setData('start_time', e.target.value)}
                                                className="w-full border px-3 py-2 rounded"
                                            />
                                            {errors.start_time && <p className="text-red-500 text-sm">{errors.start_time}</p>}
                                        </div>

                                        <div>
                                            <label className="text-sm">Heure de fin</label>
                                            <input
                                                type="time"
                                                value={data.end_time}
                                                onChange={(e) => setData('end_time', e.target.value)}
                                                className="w-full border px-3 py-2 rounded"
                                            />
                                            {errors.end_time && <p className="text-red-500 text-sm">{errors.end_time}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm">Choisir des sièges (optionnel)</label>
                                        <select
                                            multiple
                                            value={data.seats}
                                            onChange={(e) =>
                                                setData('seats', Array.from(e.target.selectedOptions, option => option.value))
                                            }
                                            className="w-full border px-3 py-2 rounded"
                                        >
                                            {seats.map(seat => (
                                                <option key={seat.id_seat} value={seat.id_seat}>
                                                    {seat.seat_number} ({seat.zone})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        disabled={processing}
                                    >
                                        Valider la réservation
                                    </button>
                                </form>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

