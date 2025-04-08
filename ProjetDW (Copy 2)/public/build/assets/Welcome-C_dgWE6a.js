import{r as i,j as e,L as w,$ as s}from"./app-DcsQ8JI0.js";function N({auth:x,laravelVersion:h,phpVersion:u}){const[n,o]=i.useState(!1),[t,m]=i.useState(""),[a,g]=i.useState(""),[l,p]=i.useState(""),c=[{id:1,title:"Le Seigneur des Anneaux",author:"J.R.R. Tolkien",year:"1954",genre:"fantasy",cover:"https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg"},{id:2,title:"Dune",author:"Frank Herbert",year:"1965",genre:"science-fiction",cover:"https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg"},{id:3,title:"1984",author:"George Orwell",year:"1949",genre:"dystopie",cover:"https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg"},{id:4,title:"Harry Potter à l'école des sorciers",author:"J.K. Rowling",year:"1997",genre:"fantasy",cover:"https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF1000,1000_QL80_.jpg"},{id:5,title:"Le Petit Prince",author:"Antoine de Saint-Exupéry",year:"1943",genre:"conte",cover:"https://m.media-amazon.com/images/I/71M4JH5gECL._AC_UF1000,1000_QL80_.jpg"}],d=c.filter(r=>{const v=t===""||r.title.toLowerCase().includes(t.toLowerCase())||r.author.toLowerCase().includes(t.toLowerCase()),f=a===""||r.year===a,k=l===""||r.genre===l;return v&&f&&k}),b=[...new Set(c.map(r=>r.year))],j=[...new Set(c.map(r=>r.genre))];return e.jsxs(e.Fragment,{children:[e.jsx(w,{title:"Welcome"}),e.jsxs("div",{className:"bg-gray-50 text-black/50 dark:bg-black dark:text-white/50",children:[e.jsx("div",{className:`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-zinc-900 shadow-lg transform ${n?"translate-x-0":"-translate-x-full"} transition-transform duration-300 ease-in-out`,children:e.jsxs("div",{className:"p-4",children:[e.jsx("h2",{className:"text-xl font-semibold mb-6 text-black dark:text-white",children:"Menu"}),e.jsx("nav",{children:e.jsxs("ul",{className:"space-y-3",children:[e.jsx("li",{children:e.jsx(s,{href:route("livres.index"),className:"block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white",children:"Livres"})}),e.jsx("li",{children:e.jsx(s,{href:route("objets.connectes"),className:"block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white",children:"Objet Connectés"})}),e.jsx("li",{children:e.jsx(s,{href:route("salles.index"),className:"block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white",children:"Salles"})}),e.jsx("li",{children:e.jsx(s,{href:"#",className:"block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-black dark:text-white",children:"Favoris"})})]})})]})}),n&&e.jsx("div",{className:"fixed inset-0 z-40 bg-black/50 lg:hidden",onClick:()=>o(!1)}),e.jsx("div",{className:"relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white",children:e.jsxs("div",{className:"relative w-full max-w-7xl px-6",children:[e.jsxs("header",{className:"grid grid-cols-3 items-center gap-2 py-6",children:[e.jsx("button",{onClick:()=>o(!n),className:"p-2 rounded-md text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-6 w-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h16"})})}),e.jsx("div",{className:"flex justify-center"}),e.jsx("nav",{className:"flex justify-end",children:x.user?e.jsx(s,{href:route("dashboard"),className:"rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",children:"Dashboard"}):e.jsxs(e.Fragment,{children:[e.jsx(s,{href:route("login"),className:"rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",children:"Log in"}),e.jsx(s,{href:route("register"),className:"rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white",children:"Register"})]})})]}),e.jsxs("main",{className:"mt-6",children:[e.jsxs("div",{className:"mb-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800",children:[e.jsx("h3",{className:"font-bold text-lg text-blue-800 dark:text-blue-200 mb-2",children:"Actualités de la bibliothèque"}),e.jsxs("ul",{className:"space-y-3",children:[e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-500 dark:text-blue-300 mr-2",children:"•"}),e.jsx("span",{children:"Exposition Tolkien du 15/09 au 20/10"})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-500 dark:text-blue-300 mr-2",children:"•"}),e.jsx("span",{children:"Atelier d'écriture le 25/09 (sur inscription)"})]}),e.jsxs("li",{className:"flex items-start",children:[e.jsx("span",{className:"text-blue-500 dark:text-blue-300 mr-2",children:"•"}),e.jsx("span",{children:"Nouveaux horaires : 9h-19h du lundi au samedi"})]})]})]}),e.jsx("div",{className:"mb-12 flex justify-center",children:e.jsx("div",{className:"w-full max-w-4xl",children:e.jsxs("div",{className:"space-y-4 sm:space-y-0 sm:flex sm:space-x-4",children:[e.jsxs("div",{className:"relative flex-grow",children:[e.jsx("input",{type:"text",placeholder:"Rechercher auteur, livre...",value:t,onChange:r=>m(r.target.value),className:"w-full rounded-full border border-gray-300 px-6 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"}),e.jsx("button",{className:"absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#FF2D20] p-2 text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})})})]}),e.jsxs("select",{value:a,onChange:r=>g(r.target.value),className:"rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white",children:[e.jsx("option",{value:"",children:"Toutes années"}),b.map(r=>e.jsx("option",{value:r,children:r},r))]}),e.jsxs("select",{value:l,onChange:r=>p(r.target.value),className:"rounded-full border border-gray-300 px-4 py-3 shadow-sm focus:border-[#FF2D20] focus:outline-none focus:ring-2 focus:ring-[#FF2D20] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white",children:[e.jsx("option",{value:"",children:"Tous genres"}),j.map(r=>e.jsx("option",{value:r,children:r},r))]})]})})}),e.jsx("div",{className:"grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",children:d.map(r=>e.jsxs("div",{className:"group cursor-pointer",children:[e.jsx("div",{className:"aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700",children:e.jsx("img",{src:r.cover,alt:r.title,className:"h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"})}),e.jsxs("div",{className:"mt-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 dark:text-white",children:r.title}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:[r.author," (",r.year,")"]})]})]},r.id))}),e.jsxs("div",{className:"mb-16",children:[e.jsx("h2",{className:"mb-8 text-center text-3xl font-bold text-black dark:text-white",children:t||a||l?"Résultats":"À la une"}),d.length>0?e.jsx("div",{className:"grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",children:d.map(r=>e.jsxs("div",{className:"group cursor-pointer",children:[e.jsx("div",{className:"aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-zinc-700",children:e.jsx("img",{src:r.cover,alt:r.title,className:"h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"})}),e.jsxs("div",{className:"mt-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 dark:text-white",children:r.title}),e.jsxs("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:[r.author," (",r.year,")"]})]})]},r.id))}):e.jsx("p",{className:"text-center text-gray-500 dark:text-gray-400 py-8",children:t||a||l?"Aucun résultat trouvé":"Chargement des livres..."})]})]}),e.jsxs("footer",{className:"py-8 text-center text-sm text-black dark:text-white/70",children:["Laravel v",h," (PHP v",u,")"]})]})})]})]})}export{N as default};
