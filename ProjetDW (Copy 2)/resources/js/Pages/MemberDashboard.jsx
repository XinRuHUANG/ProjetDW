import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';

export default function MemberDashboard() {
    const { favoris = [], emprunts = [], reservations = [], usage = [] } = usePage().props;

    const handleRemoveFavorite = (id) => {
        if (confirm('Voulez-vous vraiment retirer ce favori ?')) {
            router.delete(route('favoris.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout header="🎒 Mon Espace Personnel">
            <Head title="Mon Espace" />

            <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
                {/* Favoris */}
                <Section title="❤️ Mes Favoris">
                    {favoris.length === 0 ? (
                        <p className="text-gray-600">Aucun favori pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {favoris.map((fav) => (
                                <div key={fav.id_favorite} className="bg-white dark:bg-zinc-800 rounded shadow p-4">
                                    <img
                                        src={fav.book?.cover_image_url ?? '/default-book.jpg'}
                                        alt={fav.book?.title}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                    <h3 className="mt-2 font-semibold">{fav.book?.title}</h3>
                                    <p className="text-sm text-gray-500">{fav.book?.author}</p>
                                    <button
                                        onClick={() => handleRemoveFavorite(fav.id_favorite)}
                                        className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                                    >
                                        Retirer
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Emprunts */}
                <Section title="📚 Mes Livres Empruntés">
                    {emprunts.length === 0 ? (
                        <p className="text-gray-600">Aucun emprunt pour le moment.</p>
                    ) : (
                        <div className="space-y-4">
                            {emprunts.map((emprunt) => (
                                <div
                                    key={emprunt.id_borrow}
                                    className="p-4 border rounded-lg bg-white dark:bg-zinc-800"
                                >
                                    <p><strong>Livre :</strong> {emprunt.book?.title}</p>
                                    <p><strong>Date d'emprunt :</strong> {emprunt.borrow_date}</p>
                                    <p><strong>À rendre avant :</strong> {emprunt.due_date}</p>
                                    <p className={emprunt.status === 'Borrowed' ? 'text-yellow-600' : 'text-green-600'}>
                                        <strong>Statut :</strong> {emprunt.status}
                                    </p>
                                    {emprunt.notes && <p className="italic text-sm">📝 {emprunt.notes}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Réservations */}
                <Section title="🏠 Réservations de Salle">
                    {reservations.length === 0 ? (
                        <p className="text-gray-600">Aucune réservation.</p>
                    ) : (
                        <div className="space-y-4">
                            {reservations.map((res) => (
                                <div key={res.id_reservation} className="bg-white dark:bg-zinc-800 p-4 border rounded">
                                    <p><strong>Salle :</strong> {res.room?.room_name}</p>
                                    <p><strong>Date :</strong> {res.reservation_date}</p>
                                    <p><strong>Heure :</strong> {res.start_time} - {res.end_time}</p>
                                    <p><strong>Objet :</strong> {res.purpose ?? 'Non spécifié'}</p>
                                    <span className={`inline-block px-3 py-1 rounded text-sm ${
                                        res.status === 'confirmée' ? 'bg-green-100 text-green-800' :
                                        res.status === 'annulée' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {res.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>

                {/* Usage équipements */}
                <Section title="💻 Utilisation des équipements">
                    {usage.length === 0 ? (
                        <p className="text-gray-600">Aucune utilisation enregistrée.</p>
                    ) : (
                        <div className="space-y-4">
                            {usage.map((u) => (
                                <div key={u.id_usage} className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
                                    <p><strong>Équipement :</strong> {u.equipment?.equipment_type} - {u.equipment?.model}</p>
                                    <p><strong>Du :</strong> {u.start_date_time}</p>
                                    <p><strong>Au :</strong> {u.end_date_time}</p>
                                    <p><strong>Objet :</strong> {u.purpose}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </Section>
            </div>
        </AuthenticatedLayout>
    );
}

function Section({ title, children }) {
    return (
        <section>
            <h2 className="text-2xl font-bold text-orange-700 mb-4">{title}</h2>
            {children}
        </section>
    );
}

