<!-- resources/views/profile/show.blade.php -->
@extends('layouts.app')

@section('content')
<div class="container mx-auto px-4 py-8">
    <!-- Section Profil Utilisateur -->
    <div class="bg-white rounded-lg shadow p-6 mb-8">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
            @if(auth()->user()->photo_url)
                <img src="{{ asset('storage/' . auth()->user()->photo_url) }}" 
                     alt="Photo de profil" 
                     class="w-24 h-24 rounded-full object-cover border-2 border-gray-200">
            @else
                <div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-4xl">
                    {{ strtoupper(substr(auth()->user()->first_name, 0, 1)) }}{{ strtoupper(substr(auth()->user()->last_name, 0, 1)) }}
                </div>
            @endif
            
            <div class="flex-1">
                <h1 class="text-2xl font-bold text-gray-800">
                    {{ auth()->user()->first_name }} {{ auth()->user()->last_name }}
                </h1>
                <p class="text-gray-600">{{ auth()->user()->email }}</p>
                
                <div class="flex flex-wrap gap-4 mt-4">
                    <div class="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-800">
                        {{ auth()->user()->id_user_type }}
                    </div>
                    <div class="bg-green-50 px-3 py-1 rounded-full text-sm text-green-800">
                        {{ auth()->user()->points }} points
                    </div>
                </div>
            </div>
            
            <a href="{{ route('profile.edit') }}" class="btn btn-primary mt-4 md:mt-0">
                Modifier le profil
            </a>
        </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Favoris</h3>
            <p class="text-3xl font-bold text-blue-600">{{ auth()->user()->favorites->count() }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Livres empruntés</h3>
            <p class="text-3xl font-bold text-green-600">{{ auth()->user()->borrowedBooks()->count() }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Réservations</h3>
            <p class="text-3xl font-bold text-purple-600">{{ auth()->user()->computers()->count() + auth()->user()->tablets()->count() }}</p>
        </div>
    </div>

    <!-- Section Favoris -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800 flex items-center">
                <svg class="w-6 h-6 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
                Mes Livres Favoris
            </h2>
        </div>

        @if($favorites->isEmpty())
            <div class="p-8 text-center">
                <p class="text-gray-500 mb-4">Vous n'avez aucun livre favori pour l'instant.</p>
                <a href="{{ route('books.index') }}" class="btn btn-outline-primary">
                    Découvrir les livres disponibles
                </a>
            </div>
        @else
            <div class="divide-y divide-gray-200">
                @foreach($favorites as $book)
                    <div class="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
                        <div class="flex flex-col md:flex-row gap-6">
                            <div class="flex-shrink-0">
                                <div class="w-20 h-28 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                    @if($book->cover_image)
                                        <img src="{{ asset('storage/' . $book->cover_image) }}" alt="Couverture du livre" class="w-full h-full object-cover rounded">
                                    @else
                                        <span class="text-xs text-center">Pas de couverture</span>
                                    @endif
                                </div>
                            </div>
                            
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold text-gray-800">{{ $book->title }}</h3>
                                <p class="text-gray-600">{{ $book->author }}</p>
                                
                                <div class="mt-2 flex flex-wrap gap-2">
                                    <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                        {{ $book->yearPublished }}
                                    </span>
                                    <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                        {{ $book->category }}
                                    </span>
                                    <span class="px-2 py-1 bg-{{ $book->status === 'Available' ? 'green' : 'yellow' }}-100 text-{{ $book->status === 'Available' ? 'green' : 'yellow' }}-800 text-xs rounded-full">
                                        {{ $book->status === 'Available' ? 'Disponible' : 'Emprunté' }}
                                    </span>
                                </div>
                                
                                <p class="mt-3 text-sm text-gray-500 line-clamp-2">
                                    {{ $book->summary ?? 'Aucun résumé disponible.' }}
                                </p>
                            </div>
                            
                            <div class="flex-shrink-0 flex flex-col items-end">
                                <form action="{{ route('favorites.destroy', $book) }}" method="POST">
                                    @csrf @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 flex items-center text-sm">
                                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                        </svg>
                                        Retirer
                                    </button>
                                </form>
                                
                                @if($book->status === 'Available')
                                    <a href="{{ route('books.borrow', $book) }}" 
                                       class="mt-4 btn btn-sm btn-primary">
                                        Emprunter
                                    </a>
                                @endif
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            
            <div class="px-6 py-4 border-t border-gray-200">
                {{ $favorites->links() }}
            </div>
        @endif
    </div>
</div>
@endsection

