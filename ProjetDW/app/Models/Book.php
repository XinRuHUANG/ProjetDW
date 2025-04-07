<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    /**
     * Clé primaire de la table
     * @var string
     */
    protected $primaryKey = 'idBook';

    /**
     * Nom de la table associée au modèle
     * @var string
     */
    protected $table = 'books';

    /**
     * Champs remplissables massivement
     * @var array
     */
    protected $fillable = [
        'title',
        'author',
        'yearPublished',
        'category',
        'summary',
        'status',
        'stock',
        'cover_image_url'
    ];

    /**
     * Relation avec l'utilisateur qui a emprunté le livre
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function borrowedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    /**
     * Relation many-to-many avec les utilisateurs qui ont mis en favori
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites', 'idBook', 'idUser')
                   ->using(Favorite::class)
                   ->withTimestamps();
    }

    /**
     * Relation avec la catégorie du livre
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BookCategory::class, 'idCategory');
    }

    /**
     * Vérifie si le livre est disponible
     * @return bool
     */
    public function isAvailable(): bool
    {
        return $this->status === 'Available' && $this->stock > 0;
    }
}