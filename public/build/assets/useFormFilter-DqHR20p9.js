import{r as v}from"./app-IyyKhYsv.js";const I=[{id:1,text:"15-24",value:"JOVEN"},{id:2,text:"25-44",value:"ADULTO"},{id:3,text:"45-59",value:"ADULTO MAYOR"},{id:4,text:"+60",value:"TERCERA EDAD"}],b=[{id:1,text:"Hombres",value:"M"},{id:2,text:"Mujeres",value:"F"}],L=[{id:1,text:"Solteros",value:"SOLTERO"},{id:2,text:"Casados",value:"CASADO"},{id:3,text:"Divorciados",value:"DIVORCIADO"},{id:4,text:"Viudos",value:"VIUDO"}],R=[{id:1,text:"Generación Alpha",value:"GENERACIÓN ALPHA"},{id:2,text:"Generación Z",value:"GENERACIÓN Z"},{id:3,text:"Millennials",value:"MILLENNIALS"},{id:4,text:"Generación X",value:"GENERACIÓN X"},{id:5,text:"Boomers",value:"BOOMERS"},{id:6,text:"Silenciosa",value:"GENERACIÓN SILENCIOSA"}];function h(o,l){if(o===null||l===null||o==null||l===void 0||o===""||l==="")return!1;const u=o.toString().replace("Ã‘","Ñ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""),c=l.toString().replace("Ã‘","Ñ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return u===c}function E(o,l){let u=[...o.personas];return l.forEach(c=>{c.filters.length>0&&(u=u.filter(x=>c.filters.some(p=>h(x[c.attr],p.value))))}),u.length}function G(o){return o.filter((u,c,x)=>x.indexOf(u)===c&&u!==null)}function M(o){const{segmento:l,departamentos:u,provincias:c,distritos:x}=o,[p,m]=v.useState([]),[n,f]=v.useState([]),F=v.useMemo(()=>{let t=[...n],r=[];for(let i=0;i<t.length;i++)r.push(E(l,t.slice(0,i+1)));return r},[n]),A=v.useMemo(()=>E(l,n),[n]);v.useEffect(()=>(m([{attr:"edad_grupo",filters:I,text:"Edad"},{attr:"estado_civil",filters:L,text:"Estado Civil"},{attr:"sexo",filters:b,text:"Género"},{attr:"generacion",filters:R,text:"Generación"},{attr:"departamento",filters:u.map(t=>({id:t.id,text:t.name,value:t.name})),text:"Departamento"},{attr:"provincia",filters:[],text:"Provincia",table:!0},{attr:"distrito",filters:[],text:"Distrito",table:!0},{attr:"var1",filters:G(l.personas.map(t=>t.var1)).map(t=>({id:t,text:t,value:t})),text:"Variable 1",table:!0},{attr:"var2",filters:G(l.personas.map(t=>t.var2)).map(t=>({id:t,text:t,value:t})),text:"Variable 2",table:!0},{attr:"var3",filters:G(l.personas.map(t=>t.var3)).map(t=>({id:t,text:t,value:t})),text:"Variable 3",table:!0}]),()=>{}),[]),v.useEffect(()=>(f(l.filtros),()=>{}),[l]),v.useEffect(()=>{const t=n.find(r=>r.attr==="departamento");if(t){const r=t.filters.map(e=>e.id),i=c.filter(e=>r.includes(e.department_id)).map(e=>({id:e.id,text:e.name,value:e.name}));p.find(e=>e.attr==="provincia")&&m(e=>e.map(s=>s.attr==="provincia"?{...s,filters:i}:s))}else{const r=p.find(a=>a.attr==="provincia"),i=p.find(a=>a.attr==="distrito");r&&m(a=>a.map(e=>e.attr==="provincia"?{...e,filters:[]}:e)),i&&m(a=>a.map(e=>e.attr==="distrito"?{...e,filters:[]}:e))}return()=>{}},[n.find(t=>t.attr==="departamento")]),v.useEffect(()=>{const t=n.find(r=>r.attr==="provincia");if(t){const r=t.filters.map(e=>e.id),i=x.filter(e=>r.includes(e.province_id)).map(e=>({id:e.id,text:e.name,value:e.name}));p.find(e=>e.attr==="distrito")&&m(e=>e.map(s=>s.attr==="distrito"?{...s,filters:i}:s))}else p.find(i=>i.attr==="distrito")&&m(i=>i.map(a=>a.attr==="distrito"?{...a,filters:[]}:a));return()=>{}},[n.find(t=>t.attr==="provincia")]);function S(){f([])}function C(t,r){return n.some(i=>i.attr===t.attr&&i.filters.some(a=>a.id===r.id))}function O(t,r){const i=n.find(a=>a.attr===t.attr);if(i){const a=i.filters.find(s=>s.id===r.id),e={...i};a?e.filters=e.filters.filter(s=>s.id!==r.id):e.filters=[...e.filters,{...r}],e.filters.length===0?(f(s=>s.filter(d=>d.attr!==t.attr)),t.attr==="departamento"&&(f(s=>s.filter(d=>d.attr!=="provincia")),f(s=>s.filter(d=>d.attr!=="distrito"))),t.attr==="provincia"&&f(s=>s.filter(d=>d.attr!=="distrito"))):f(s=>s.map(d=>d.attr===t.attr?e:d))}else f(a=>[...a,{...t,filters:[r]}])}function N(t){const r=n.find(i=>i.attr===t.attr);f(r?i=>i.filter(a=>a.attr!==t.attr):i=>[...i,{...t,filters:t.filters}])}function D(t){const r=n.find(i=>i.attr===t.attr);return r?r.filters.length===t.filters.length:!1}return{allFilterGroups:p,activeFilterGroups:n,partialCounts:F,totalCount:A,resetFilters:S,isFilterActive:C,toogleFilter:O,toggleSelectAll:N,isGroupAllSelected:D}}const _=Object.freeze(Object.defineProperty({__proto__:null,default:M},Symbol.toStringTag,{value:"Module"}));export{_ as a,h as c,M as u};