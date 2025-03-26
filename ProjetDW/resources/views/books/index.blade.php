@auth
    @if(auth()->user()->favoriteBooks->contains($book))
        <form action="{{ route('books.unfavorite', $book) }}" method="POST">
            @csrf @method('DELETE')
            <button>❤️ Retirer des favoris</button>
        </form>
    @else
        <form action="{{ route('books.favorite', $book) }}" method="POST">
            @csrf
            <button>🤍 Ajouter aux favoris</button>
        </form>
    @endif
@endauth