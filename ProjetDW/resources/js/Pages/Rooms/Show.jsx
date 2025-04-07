import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

// Mock data
const mockRoom = {
  id: 1,
  name: "Salle d'étude A",
  description: "Salle calme pour 1-2 personnes, idéale pour la concentration",
  capacity: 2,
  equipment: ["prise électrique", "tableau blanc"]
};

const mockReservations = [
  { id: 1, start_time: "09:00", user: { name: "Jean Dupont" } },
  { id: 2, start_time: "11:00", user: { name: "Marie Martin" } }
];

export default function RoomShow() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlots] = useState([
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ]);

  return (
    <AuthenticatedLayout>
      <Head title={`Salle ${mockRoom.name}`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <Link 
                href="/salles"
                className="text-blue-500 hover:text-blue-600 mb-4 inline-block"
              >
                ← Retour aux salles
              </Link>
              
              <h1 className="text-2xl font-bold mb-2">{mockRoom.name}</h1>
              <p className="mb-4">{mockRoom.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Réserver cette salle</h2>
                  
                  <div className="mb-6">
                    <label className="block mb-2">Date de réservation</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Créneaux disponibles</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          className="p-3 border rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Détails</h2>
                  <ul className="space-y-3">
                    <li>
                      <strong>Capacité:</strong> {mockRoom.capacity} personnes
                    </li>
                    <li>
                      <strong>Équipements:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {mockRoom.equipment.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Réservations aujourd'hui</h3>
                    {mockReservations?.length > 0 ? (
                      <ul className="space-y-2">
                        {mockReservations.map(res => (
                          <li key={res.id} className="text-sm">
                            {res.start_time} - {res.user.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Aucune réservation aujourd'hui</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
