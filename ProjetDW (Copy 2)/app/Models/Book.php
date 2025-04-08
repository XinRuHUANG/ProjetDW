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
    protected $primaryKey = 'id_book';

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
        'isbn',
        'year',
        'id_category',
        'summary',
        'stock',
        'status',
        'cover_image_url',
    ];

    public $timestamps = true;

    /**
     * Relation avec l'utilisateur qui a emprunté le livre
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function borrowedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Relation many-to-many avec les utilisateurs qui ont mis en favori
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function favoritedBy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'favorites', 'id_book', 'id_bser')
                   ->using(Favorite::class)
                   ->withTimestamps();
    }

    /**
     * Relation avec la catégorie du livre
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(BookCategory::class, 'id_category');
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
