import{r as l,j as e,a as j,y as u}from"./app-Bqmz_ksN.js";import{A as p,f,e as g,v,a as b}from"./formatDate-BHuo_VRi.js";import{A as w}from"./AuthenticatedLayout-B8j3_ADu.js";import S from"./FormUpload-CvZGBXdM.js";import N from"./Index-D-jfa5S7.js";import{M as c}from"./Modal-7dpO-14s.js";import{e as F}from"./excel-BG5q7fmZ.js";import"./transition-kE0npjb6.js";import"./Button-Br79uyge.js";import"./TextEditable-CM0q9bXF.js";import"./FilterGroups-9d_8XHII.js";import"./FilterGroupTable-BYaYaYRi.js";import"./Preview-CcwJYt_c.js";function R(r){const{auth:m,segmentos:i}=r,[a,s]=l.useState(""),[n,d]=l.useState();function h(t){confirm("¿Estás seguro de eliminar este segmento?")&&u.delete(route("segmentos.destroy",{segmento:t}))}return e.jsxs(w,{user:m.user,children:[e.jsx(j,{title:"Sementación"}),e.jsx("h1",{className:"title",children:"Segmentación"}),e.jsx(p,{text:`Nuestro módulo de Generación de segmentos permite diseñar un segmento de clientes de interés en función a variables demográficas e información
interna de los clientes , para ello es necesario subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo.`}),e.jsx("div",{className:"w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md",children:e.jsxs("table",{className:"table table-blue",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Segmento"}),e.jsx("th",{children:"Fecha de creación"}),e.jsx("th",{children:"Cantidad de registros"}),e.jsx("th",{children:"Listado de ingreso"}),e.jsx("th",{children:"Filtros"}),e.jsx("th",{children:"Programar campaña"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{children:i==null?void 0:i.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.nombre}),e.jsx("td",{children:f(t.created_at)}),e.jsx("td",{children:t.personas.length}),e.jsx("td",{children:e.jsx("a",{href:route("segmentos.download",{segmento:t}),className:"btn btn-sm",children:e.jsx("img",{src:F,alt:"icono de excel",width:24})})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-wrap gap-1",children:t.filtros.map(x=>x.filters.map(o=>e.jsx("span",{className:"badge",children:o.text},o.text)))})}),e.jsx("td",{children:e.jsx("button",{children:e.jsx("img",{src:g,alt:"icono de ver",width:24})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex w-20 gap-1",children:[e.jsx("button",{onClick:()=>{s("Preview"),d(t)},children:e.jsx("img",{src:v,alt:"icono de ver",width:24})}),e.jsx("button",{onClick:()=>h(t),children:e.jsx("img",{src:b,alt:"icono de eliminar",width:24})})]})})]},t.id))})]})}),e.jsx("button",{onClick:()=>s("Form"),className:"m-auto btn btn-primary",children:"Generar nuevo segmento"}),e.jsx(c,{show:a=="Form",onClose:()=>s(""),maxWidth:"xs",children:e.jsx(S,{onSended:t=>{s("Preview"),d(t)}})}),e.jsx(c,{show:a=="Preview",onClose:()=>s(""),maxWidth:"xl",children:n&&e.jsx(N,{segmento:n,onSaved:()=>s(""),departamentos:r.departamentos,distritos:r.distritos,provincias:r.provincias})})]})}export{R as default};