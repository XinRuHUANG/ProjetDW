import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


const mockRooms = [
  {
    id: 1,
    name: "Salle d'étude A",
    description: "Salle calme pour 1-2 personnes, idéale pour la concentration",
    capacity: 2,
    equipment: ["prise électrique", "tableau blanc"]
  },
  {
    id: 2,
    name: "Salle de groupe B",
    description: "Espace pour travail d'équipe (3-5 personnes)",
    capacity: 5,
    equipment: ["projecteur", "tableau blanc", "prises multiples"]
  },
  {
    id: 3,
    name: "Salle multimédia",
    description: "Espace équipé d'ordinateurs pour 6 personnes",
    capacity: 6,
    equipment: ["6 PC", "projecteur", "tableau interactif"]
  }
];

export default function RoomsIndex() {
  return (
    <AuthenticatedLayout>
      <Head title="Salles de la bibliothèque" />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h1 className="text-2xl font-bold mb-6">Salles disponibles</h1>
              
              {/* Search and filters */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Rechercher une salle..."
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="">Toutes les capacités</option>
                    <option value="1">1-2 personnes</option>
                    <option value="2">3-5 personnes</option>
                    <option value="3">6+ personnes</option>
                  </select>
                </div>
                
                <div>
                  <select className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="">Tous les équipements</option>
                    <option value="projector">Projecteur</option>
                    <option value="whiteboard">Tableau blanc</option>
                    <option value="computer">Ordinateur</option>
                  </select>
                </div>
              </div>
              
              {/* Rooms list */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockRooms.map(room => (
                  <div key={room.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{room.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Capacité: {room.capacity} personnes</span>
                      <Link 
                        href={`/salles/${room.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Réserver
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
