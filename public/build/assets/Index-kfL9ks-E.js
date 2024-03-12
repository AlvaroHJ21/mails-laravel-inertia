import{r as f,j as l,y as C}from"./app-BeXNwoRY.js";import{T as O}from"./TextEditable-gwhDsqb4.js";import S from"./FilterGroups-DCZvxVXA.js";import L from"./Preview-BBnbAFfd.js";import"./FilterGroupTable-BA0AAPD6.js";const b=[{attr:"edad_grupo",text:"Edad",filters:[{id:1,text:"18-25",value:"JOVEN"},{id:2,text:"26-35",value:"ADULTO"},{id:3,text:"36-45",value:"ADULTO MAYOR"}],count:0},{attr:"sexo",text:"Género",filters:[{id:1,text:"Hombres",value:"M"},{id:2,text:"Mujeres",value:"F"}],count:0},{attr:"estado_civil",text:"Estado Civil",filters:[{id:1,text:"Solteros",value:"SOLTERO"},{id:2,text:"Casados",value:"CASADO"},{id:3,text:"Divorciados",value:"DIVORCIADO"},{id:4,text:"Viudos",value:"VIUDO"}],count:0},{attr:"generacion",text:"Generaciones",filters:[{id:1,text:"Generación x",value:"GENERACIÓN X"},{id:2,text:"Millennials",value:"MILLENNIALS"},{id:3,text:"Generación z",value:"GENERACIÓN Z"}],count:0}];function D(c){const{segmento:a,departamentos:x,provincias:m,distritos:p}=c,[F,G]=f.useState(b),[s,o]=f.useState([]),A=f.useMemo(()=>{let i=[];return i=a.personas.filter(e=>s.every(r=>{const t=e[r.attr];return r.filters.some(d=>d.value.toLowerCase()===t.toString().toLowerCase())})),i.length},[s]);function h(i,e){const r=s.find(t=>t.attr===i.attr);if(r){if(r.filters.length==1&&r.filters[0].value===e.value){o(s.filter(n=>n.attr!==i.attr));return}let t=[...r.filters];t.find(n=>n.value===e.value)?t=t.filter(n=>n.value!==e.value):t=[...t,e];const w={...r,filters:t};let E=s.map(n=>n.attr===i.attr?w:n);E=v(E),o(E)}else{const t={attr:i.attr,text:i.text,filters:[e],count:0};let d=[...s,t];d=v(d),o(d)}}function v(i){return i.map(e=>({...e,count:a.personas.filter(r=>e.filters.some(t=>r[e.attr].toString().toLowerCase()===t.value.toLowerCase())).length}))}function N(i,e){return s.some(r=>r.attr===i.attr?r.filters.some(t=>t.value===e.value):!1)}function g(){o(a.filtros)}function u(){o([])}function j(){const i={attr:"departamento",count:0,filters:x.map(t=>({id:t.id,text:t.name,value:t.name})),text:"Departamento"},e={attr:"provincia",count:0,filters:m.map(t=>({id:t.id,text:t.name,value:t.name})),text:"Provincia",table:!0},r={attr:"distrito",count:0,filters:p.map(t=>({id:t.id,text:t.name,value:t.name})),text:"Distrito",table:!0};G([...b,i,e,r])}return{allfiltersGroups:F,activeFilterGroups:s,handleToggleActiveFilter:h,isFilterActive:N,loadFilterGroups:g,resetFilters:u,totalByAllActiveFilters:A,updateAllFilters:j}}function U(c){const{segmento:a,onSaved:x}=c,[m,p]=f.useState(a.nombre),{allfiltersGroups:F,activeFilterGroups:G,handleToggleActiveFilter:s,isFilterActive:o,loadFilterGroups:A,resetFilters:h,totalByAllActiveFilters:v,updateAllFilters:N}=D({segmento:a,departamentos:c.departamentos,provincias:c.provincias,distritos:c.distritos});f.useEffect(()=>(N(),()=>{}),[]),f.useEffect(()=>(A(),()=>{}),[a]);function g(u){C.put(route("segmentos.update",{segmento:a}),{nombre:u})}return l.jsxs("div",{className:"p-10 bg-gray-100",children:[l.jsx("h1",{className:"title",children:"Generación de Segmentos"}),l.jsx("div",{className:"flex items-center justify-center gap-2 p-4 mb-4 text-white rounded-full bg-azul-marino",children:l.jsx(O,{value:m,onClickOutside:u=>{p(u),m!==u&&g(u)}})}),l.jsxs("div",{className:"flex flex-col gap-4 md:flex-row",children:[l.jsx("div",{className:"flex-1 p-8 bg-white rounded-lg",children:l.jsx(S,{allfiltersGroups:F,handleToggleActiveFilter:s,isFilterActive:o,resetFilters:h})}),l.jsx("div",{className:"flex flex-col pb-8 md:w-[400px]",children:l.jsx(L,{segmento:a,activeFilterGroups:G,totalByAllActiveFilters:v,onSaved:x})})]})]})}export{U as default};