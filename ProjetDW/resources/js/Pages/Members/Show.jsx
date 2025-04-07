import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MemberProfile({ member }) {
    return (
        <AuthenticatedLayout>
            <Head title={`${member.firstName} ${member.lastName}`} />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Profil de {member.firstName} {member.lastName}</h1>

                <p>Email : {member.email}</p>
                <p>Âge : {member.age}</p>
                <p>Genre : {member.gender}</p>
                <p>Points : {member.points}</p>
            </div>
        </AuthenticatedLayout>
    );
}
