import{j as e}from"./app-C321aNSj.js";import a from"./FilterGroupTable-DUKAaGfx.js";function n(i){const{filterGroups:s,resetFilters:r}=i;return e.jsxs("div",{className:"",children:[e.jsx("h2",{className:"text-xl font-bold",hidden:!0,children:"Filtros"}),e.jsx("div",{className:"flex flex-wrap gap-4 mb-8",children:s.slice(0,7).map(l=>e.jsxs("div",{children:[e.jsx("h3",{className:"mb-1 text-xl font-bold text-celeste-claro",children:l.text}),l.table?e.jsx("span",{children:e.jsx(a,{group:l})}):e.jsx("div",{className:"flex flex-wrap gap-2",children:l.allFilter.map(t=>e.jsx("button",{onClick:()=>l.handleToggleActiveFilter(t),className:"border shadow-sm text-sm px-3 rounded-md py-0 "+(l.isActiveFilter(t)?"bg-azul-marino text-amarillo":""),children:t.text},t.id))})]},l.text))}),e.jsx("div",{className:"flex gap-4 mb-6",children:s.slice(7,s.length).map(l=>e.jsx(a,{group:l},l.attr))}),e.jsx("button",{onClick:r,className:"m-auto text-white btn bg-celeste-claro",children:"Reestablecer filtros"})]})}export{n as default};
