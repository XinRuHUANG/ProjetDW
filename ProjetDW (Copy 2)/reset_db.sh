#!/bin/bash

# Configurations
DB_NAME="votre_base_de_données"
DB_USER="root"
DB_PASSWORD="votre_mot_de_passe"  # À éviter en clair dans le script !
DUMP_FILE="database/database.sql"

# 1. Réinitialisation de la base
mysql -u $DB_USER -p"$DB_PASSWORD" -e "DROP DATABASE IF EXISTS $DB_NAME; CREATE DATABASE $DB_NAME;"

# 2. Import du dump
mysql -u $DB_USER -p"$DB_PASSWORD" $DB_NAME < $DUMP_FILE

# 3. Notification
echo "✅ Base de données réinitialisée à partir de $DUMP_FILE"