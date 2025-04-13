import { router } from '@inertiajs/react';

export default function RoomRequests({ reservations }) {
    const handleAction = (id, action) => {
        if (action === 'approve') {
            router.patch(route('admin.rooms.approve', id));
        } else {
            router.patch(route('admin.rooms.reject', id));
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">📝 Réservations de salles</h1>

            {reservations.length === 0 ? (
                <p className="text-gray-500">Aucune demande pour le moment.</p>
            ) : (
                <div className="space-y-6">
                    {reservations.map(res => (
                        <div key={res.id_reservation} className="p-4 bg-white rounded shadow flex flex-col md:flex-row justify-between">
                            <div>
                              {!res.user || !res.room ? (
                                <p><strong>Utilisateur :</strong> Inconnu</p>
                              ) : (
                                <>
                                  <p><strong>Utilisateur :</strong> {res.user.first_name}</p>
                                  <p><strong>Salle :</strong> {res.room.room_name}</p>
                                  <p><strong>Date :</strong> {res.reservation_date} de {res.start_time} à {res.end_time}</p>
                                  <p><strong>Objet :</strong> {res.purpose}</p>
                                  <p><strong>Sièges :</strong> {res.seats?.map(seat => seat.seat_number).join(', ') || 'Aucun'}</p>
                                  <p>
                                    <strong>Statut :</strong>{' '}
                                    <span
                                      className={`font-semibold ${
                                        res.status === 'confirmée'
                                          ? 'text-green-600'
                                          : res.status === 'annulée'
                                          ? 'text-red-600'
                                          : 'text-yellow-600'
                                      }`}
                                    >
                                      {res.status}
                                    </span>
                                  </p>
                                </>
                              )}

                              {res.status === 'pending' && (
                                <div className="mt-4 md:mt-0 flex space-x-2">
                                  <button
                                    onClick={() => handleAction(res.id_reservation, 'approve')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                  >
                                    Valider
                                  </button>
                                  <button
                                    onClick={() => handleAction(res.id_reservation, 'reject')}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                  >
                                    Rejeter
                                  </button>
                                </div>
                              )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

