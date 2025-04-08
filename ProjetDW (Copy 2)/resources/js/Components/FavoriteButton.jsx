import { useForm } from '@inertiajs/react';

export default function FavoriteButton({ book, isFavorited }) {
    const { post } = useForm();

    const toggleFavorite = () => {
        post(route('favorites.toggle', book.idBook));
    };

    return (
        <button 
            onClick={toggleFavorite}
            className={`p-2 rounded-full ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            title={isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        >
            {isFavorited ? '❤️' : '🤍'}
        </button>
    );
}