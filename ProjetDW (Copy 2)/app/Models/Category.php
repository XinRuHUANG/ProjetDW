<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * Clé primaire de la table
     * @var string
     */
    protected $primaryKey = 'id_category';

    /**
     * Nom de la table associée au modèle
     * @var string
     */
    protected $table = 'book_categories';

    /**
     * Champs remplissables massivement
     * @var array
     */

    protected $fillable = [
        'name',
    ];

    public $timestamps = true;
}
