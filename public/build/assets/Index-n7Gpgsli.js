import{r as m,u as b,j as e,a as g,M as h,y as x}from"./app-BAbNKuvN.js";import{f as v,e as w,v as C,a as S}from"./formatDate-CXqeFNCc.js";import{A as N}from"./Alert-ClA_9KX2.js";import{A as F}from"./AuthenticatedLayout-Ds1yjU1C.js";import y from"./FormUpload-CGj3u-NS.js";import E from"./Index-Dk1J-NGE.js";import{e as A}from"./excel-BG5q7fmZ.js";import{c as u}from"./useFormFilter-DFyFEhMm.js";import"./Button-B4gK-Qxa.js";import"./TextEditable-BcnRbz83.js";import"./FilterGroups-JLytWIut.js";import"./FilterGroupTable-cJ7vAX2e.js";import"./Preview-igjMsVMW.js";function M(a){const o=a.filtros;let s=[...a.personas];return o.forEach(r=>{r.filters.length>0&&(s=s.filter(i=>r.filters.some(n=>u(n.value,i[r.attr]))))}),s.length}function D(a){const o=a.filtros;let s=[...a.personas];return o.forEach(r=>{r.filters.length>0&&(s=s.filter(i=>r.filters.some(n=>u(n.value,i[r.attr]))))}),s.map(r=>r.documento)}function z(a){const{auth:o,segmentos:s}=a,[r,i]=m.useState(""),[n,d]=m.useState(),l=b();function f(t){l.openConfirm({title:"Confirmar",message:"¿Estás seguro de eliminar este segmento?",buttonText:"Eliminar",buttonVariant:"error",onConfirm(){x.delete(route("segmentos.destroy",{segmento:t})),l.cancel()}})}function j(t){l.openConfirm({title:"Confirmar",message:"¿Estás seguro de crear una campaña a partir de los datos de este segmento?",buttonText:"Sí, crear",buttonVariant:"primary",onConfirm(){x.post(route("campanias.store_by_segmento",{segmento:t}),{},{}),l.cancel()}})}return e.jsxs(F,{user:o.user,children:[e.jsx(g,{title:"Sementación"}),e.jsx("h1",{className:"title",children:"Segmentación"}),e.jsx(N,{text:`Nuestro módulo de Generación de segmentos permite diseñar un segmento de clientes de interés en función a variables demográficas e información
interna de los clientes , para ello es necesario subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo.`}),e.jsx("div",{className:"w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md",children:e.jsxs("table",{className:"table table-blue",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Segmento"}),e.jsx("th",{children:"Fecha de creación"}),e.jsx("th",{children:"Cantidad de registros"}),e.jsx("th",{children:"Listado de ingreso"}),e.jsx("th",{children:"Filtros"}),e.jsx("th",{children:"Programar campaña"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{children:s==null?void 0:s.map(t=>e.jsxs("tr",{children:[e.jsx("td",{children:t.nombre}),e.jsx("td",{children:v(t.created_at)}),e.jsx("td",{children:M(t)}),e.jsx("td",{children:e.jsx("a",{href:route("segmentos.download",{segmento:t,documentos:D(t)}),className:"btn btn-sm",children:e.jsx("img",{src:A,alt:"icono de excel",width:24})})}),e.jsx("td",{children:e.jsx("div",{className:"flex flex-wrap gap-1",children:t.filtros.map(p=>p.filters.map(c=>e.jsx("span",{className:"badge",children:c.text},c.text)))})}),e.jsx("td",{children:e.jsx("button",{onClick:()=>j(t),children:e.jsx("img",{src:w,alt:"icono de play",width:24})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex w-20 gap-1",children:[e.jsx("button",{onClick:()=>{i("Preview"),d(t)},children:e.jsx("img",{src:C,alt:"icono de ver",width:24})}),e.jsx("button",{onClick:()=>f(t),children:e.jsx("img",{src:S,alt:"icono de eliminar",width:24})})]})})]},t.id))})]})}),e.jsx("button",{onClick:()=>i("Form"),className:"m-auto btn btn-primary",children:"Generar nuevo segmento"}),e.jsx(h,{show:r=="Form",onClose:()=>i(""),maxWidth:"xs",children:e.jsx(y,{onSended:t=>{i("Preview"),d(t)}})}),e.jsx(h,{show:r=="Preview",onClose:()=>i(""),maxWidth:"xl",children:n&&e.jsx(E,{segmento:n,onSaved:()=>i(""),departamentos:a.departamentos,distritos:a.distritos,provincias:a.provincias})})]})}export{z as default};