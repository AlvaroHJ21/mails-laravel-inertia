import{j as e}from"./app-goKU949F.js";import r from"./FilterGroupTable-Cj9kGV1P.js";function m(x){const{filterGroups:l,resetFilters:c,isFilterActive:a,toogleFilter:i}=x;return e.jsxs("div",{className:"",children:[e.jsx("h2",{className:"text-xl font-bold",hidden:!0,children:"Filtros"}),e.jsx("div",{className:"flex flex-wrap gap-4 mb-8",children:l.slice(0,7).map(t=>e.jsxs("div",{children:[e.jsx("h3",{className:"mb-1 text-xl font-bold text-celeste-claro",children:t.text}),t.table?e.jsx("span",{children:e.jsx(r,{group:t,isFilterActive:a,toogleFilter:i})}):e.jsx("div",{className:"flex flex-wrap gap-2",children:t.filters.map(s=>e.jsx("button",{onClick:()=>i(t,s),className:"border shadow-sm text-sm px-3 rounded-md py-0 "+(a(t,s)?"bg-azul-marino text-amarillo":""),children:s.text},s.id))})]},t.text))}),e.jsx("div",{className:"flex items-start gap-4 mb-6",children:l.slice(7,l.length).map(t=>e.jsx(r,{group:t,isFilterActive:a,toogleFilter:i},t.attr))}),e.jsx("button",{onClick:c,className:"m-auto text-white btn bg-celeste-claro",children:"Reestablecer filtros"})]})}export{m as default};