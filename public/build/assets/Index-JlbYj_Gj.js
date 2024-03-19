import{r as c,j as e,a as u,y as j}from"./app-KmnGMM83.js";import{A as p,f as v,v as g,e as b}from"./formatDate-Pt_W1Anh.js";import{A as w}from"./AuthenticatedLayout-By6G-0no.js";import S from"./FormUpload-DNclcNIW.js";import N from"./Index-BmQLCFV6.js";import{M as m}from"./Modal-CV7W2YX3.js";import{e as F}from"./enviar-D_zYGquv.js";import{e as A}from"./excel-BG5q7fmZ.js";import{c as h}from"./useFormFilter-DVlkjE5l.js";import"./transition-BN2xlhNw.js";import"./Button-DSX1vD1W.js";import"./TextEditable-CGfGM1Nf.js";import"./FilterGroups-BQMkaCId.js";import"./FilterGroupTable-BbQA0sDy.js";import"./Preview-C7T-mg5X.js";function C(i){const o=i.filtros;let s=[...i.personas];return o.forEach(r=>{r.filters.length>0&&(s=s.filter(a=>r.filters.some(n=>h(n.value,a[r.attr]))))}),s.length}function y(i){const o=i.filtros;let s=[...i.personas];return o.forEach(r=>{r.filters.length>0&&(s=s.filter(a=>r.filters.some(n=>h(n.value,a[r.attr]))))}),s.map(r=>r.documento)}function q(i){const{auth:o,segmentos:s}=i,[r,a]=c.useState(""),[n,l]=c.useState();function x(t){confirm("¿Estás seguro de eliminar este segmento?")&&j.delete(route("segmentos.destroy",{segmento:t}))}return e.jsxs(w,{user:o.user,children:[e.jsx(u,{title:"Sementación"}),e.jsx("h1",{className:"title",children:"Segmentación"}),e.jsx(p,{text:`Nuestro módulo de Generación de segmentos permite diseñar un segmento de clientes de interés en función a variables demográficas e información
interna de los clientes , para ello es necesario subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo.`}),e.jsx("div",{className:"w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md",children:e.jsxs("table",{className:"table table-blue",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Segmento"}),e.jsx("th",{children:"Fecha de creación"}),e.jsx("th",{children:"Cantidad de registros"}),e.jsx("th",{children:"Listado de ingreso"}),e.jsx("th",{children:"Filtros"}),e.jsx("th",{children:"Programar campaña"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.nombre}),e.jsx("td",{children:v(t.created_at)}),e.jsx("td",{children:C(t)}),e.jsx("td",{children:e.jsx("a",{href:route("segmentos.download",{segmento:t,documentos:y(t)}),className:"btn btn-sm",children:e.jsx("img",{src:A,alt:"icono de excel",width:24})})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-wrap gap-1",children:t.filtros.map(f=>f.filters.map(d=>e.jsx("span",{className:"badge",children:d.text},d.text)))})}),e.jsx("td",{children:e.jsx("button",{children:e.jsx("img",{src:F,alt:"icono de ver",width:24})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex w-20 gap-1",children:[e.jsx("button",{onClick:()=>{a("Preview"),l(t)},children:e.jsx("img",{src:g,alt:"icono de ver",width:24})}),e.jsx("button",{onClick:()=>x(t),children:e.jsx("img",{src:b,alt:"icono de eliminar",width:24})})]})})]},t.id))})]})}),e.jsx("button",{onClick:()=>a("Form"),className:"m-auto btn btn-primary",children:"Generar nuevo segmento"}),e.jsx(m,{show:r=="Form",onClose:()=>a(""),maxWidth:"xs",children:e.jsx(S,{onSended:t=>{a("Preview"),l(t)}})}),e.jsx(m,{show:r=="Preview",onClose:()=>a(""),maxWidth:"xl",children:n&&e.jsx(N,{segmento:n,onSaved:()=>a(""),departamentos:i.departamentos,distritos:i.distritos,provincias:i.provincias})})]})}export{q as default};