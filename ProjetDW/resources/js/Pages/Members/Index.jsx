import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';

export default function MembersIndex({ members }) {
    return (
        <AuthenticatedLayout>
            <Head title="Liste des Membres" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Liste des Membres</h1>

                <ul className="space-y-4">
                    {members.map((member) => (
                        <li key={member.idUser} className="border-b pb-2">
                            <Link
                                href={route('members.show', member.idUser)}
                                className="text-blue-600 hover:underline"
                            >
                                {member.firstName} {member.lastName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}

