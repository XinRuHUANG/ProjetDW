import{m as i,j as e}from"./app-DcsQ8JI0.js";function a({book:o,isFavorited:t}){const{post:r}=i(),s=()=>{r(route("favorites.toggle",o.idBook))};return e.jsx("button",{onClick:s,className:`p-2 rounded-full ${t?"text-red-500":"text-gray-400"}`,title:t?"Retirer des favoris":"Ajouter aux favoris",children:t?"❤️":"🤍"})}book,book.favorited_by&&book.favorited_by.some(o=>o.idUser===auth.user.id);
