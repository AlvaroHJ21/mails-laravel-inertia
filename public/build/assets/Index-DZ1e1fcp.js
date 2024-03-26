import{r as h,u as b,j as e,a as v,M as w,y as d}from"./app-azuD7i1a.js";import{A as C}from"./AuthenticatedLayout--ztQkz6D.js";import{A as N}from"./Alert-DtVLtK1g.js";import{B as S}from"./Button-Ckv7IhWP.js";import{F as E}from"./Form-DpMP-zAw.js";import{f as u,e as y,v as F,a as A}from"./formatDate-CXqeFNCc.js";import{e as M}from"./excel-BG5q7fmZ.js";import{T as i}from"./Tooltip-DWXG1n8_.js";function k(l){const c=new Date(l),o=c.getHours(),r=c.getMinutes();return`${o<10?"0"+o:o}:${r<10?"0"+r:r}`}function H(l){const{auth:c,campanias:o}=l,[r,a]=h.useState(""),[x,m]=h.useState(),n=b();h.useEffect(()=>(l.flash.message&&(a("Form"),m(o[o.length-1])),()=>{}),[]);function f(s){n.openConfirm({title:"Confirmar",message:"¿Estás seguro de eliminar esta campaña?",buttonText:"Eliminar",buttonVariant:"error",onConfirm(){d.delete(route("campanias.destroy",s.id)),n.cancel()}})}function j(s){n.openConfirm({title:"Confirmar",message:"¿Estás seguro de enviar esta campaña?",buttonText:"Sí, enviar",buttonVariant:"primary",onConfirm(){d.post(route("campanias.send",{campania:s}),{},{onSuccess(t){console.log(t),window.toast.success(t.props.flash.message)},onError(t){console.log(t)}}),n.cancel()}})}function p(s){d.post(route("campanias.sync_report",{campania:s}),{},{onSuccess(t){console.log(t),window.toast.success(t.props.flash.message)},onError(t){console.log(t)}}),n.cancel()}function g(s){d.get(route("campanias.report",{campania:s.id}))}return e.jsxs(C,{user:c.user,children:[e.jsx(v,{title:"Programación de campañas"}),e.jsx("h1",{className:"title",children:"Programación de Campañas"}),e.jsx(N,{text:`Nuestro módulo de perfilamiento de clientes permite conocer el perfil demográfico de los clientes, para ello es necesario
subir un listado de Documentos de Identidad (DNI), con un formato prestablecido de un archivo.`}),e.jsx("div",{className:"w-full mb-6 overflow-x-auto bg-white rounded-lg shadow-md",children:e.jsxs("table",{className:"table table-blue",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Campaña"}),e.jsx("th",{children:"Fecha de creación"}),e.jsx("th",{children:"Fecha de envío"}),e.jsx("th",{children:"Hora de envío"}),e.jsx("th",{children:"Cantidad de registros"}),e.jsx("th",{children:"Listado de ingreso"}),e.jsx("th",{children:"Acciones"})]})}),e.jsx("tbody",{children:o.map(s=>e.jsxs("tr",{children:[e.jsx("td",{children:s.nombre}),e.jsx("td",{children:u(s.created_at)}),e.jsx("td",{children:u(s.fecha_envio)}),e.jsx("td",{children:k(s.fecha_envio)}),e.jsx("td",{children:s.personas.length}),e.jsx("td",{children:e.jsx("a",{href:route("campanias.download",{campania:s}),className:"btn btn-sm",children:e.jsx("img",{src:M,alt:"icono de excel",width:24})})}),e.jsx("td",{children:e.jsxs("div",{className:"flex justify-end w-40 gap-2",children:[s.enviado?e.jsxs(e.Fragment,{children:[e.jsx(i,{text:"Actualizar reporte de campaña",direction:"left",children:e.jsx("button",{onClick:()=>p(s),className:"rounded-full w-7 h-7 bg-amarillo text-azul-marino",children:e.jsx("i",{className:"fa fa-refresh"})})}),e.jsx(i,{text:"Ver reporte de campaña",direction:"left",children:e.jsx("button",{onClick:()=>g(s),className:"rounded-full w-7 h-7 bg-amarillo text-azul-marino",children:e.jsx("i",{className:"fa fa-bar-chart"})})})]}):e.jsx(i,{text:"Enviar ahora",direction:"left",children:e.jsx("button",{onClick:()=>j(s),children:e.jsx("img",{src:y,alt:"icono de play",width:24})})}),e.jsx(i,{text:"Ver/Editar campaña",direction:"left",children:e.jsx("button",{onClick:()=>{a("Form"),m(s)},children:e.jsx("img",{src:F,alt:"icono de ver",width:24,className:"w-7"})})}),e.jsx(i,{text:"Eliminar campaña",direction:"left",children:e.jsx("button",{onClick:()=>f(s),children:e.jsx("img",{src:A,alt:"icono de eliminar",width:24,className:"w-7"})})})]})})]},s.id))})]})}),e.jsx(S,{onClick:()=>{a("Form"),m(void 0)},className:"m-auto",children:"Generar nueva campaña"}),e.jsx(w,{show:r==="Form",onClose:()=>a(""),maxWidth:"2xl",children:e.jsx(E,{campania:x,onClose:()=>a("")})})]})}export{H as default};