@extends('layouts.app')

@section('content')
<div class="container">
    <h2>📚 Mes Favoris</h2>

    @if($favorites->isEmpty())
        <p class="alert alert-warning">❌ Vous n'avez pas encore de livres en favoris.</p>
    @else
        <div class="row">
            @foreach ($favorites as $favorite)
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">{{ $favorite->book->title }}</h5>
                            <p class="card-text"><strong>Auteur :</strong> {{ $favorite->book->author }}</p>
                            <p class="card-text"><strong>Catégorie :</strong> {{ $favorite->book->category }}</p>
                            <form action="{{ route('favorites.remove', $favorite->book->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-danger">❌ Retirer des favoris</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
@endsection
