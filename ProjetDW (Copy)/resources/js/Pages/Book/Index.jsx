import FavoriteButton from '@/Components/FavoriteButton';

// Dans votre boucle de livres :
<FavoriteButton 
    book={book} 
    isFavorited={book.favorited_by && book.favorited_by.some(u => u.idUser === auth.user.id)}
/>