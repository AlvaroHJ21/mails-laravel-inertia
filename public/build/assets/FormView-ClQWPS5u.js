import{r as o,j as e,y as n}from"./app-azuD7i1a.js";import{T as c}from"./TextEditable-rNJDPlVc.js";function l(s){const{perfil:r}=s,[i,a]=o.useState(r.nombre);function m(t){n.put(route("perfiles.update",{perfil:r}),{nombre:t})}return e.jsxs("div",{className:"",children:[e.jsx("div",{className:"flex items-center justify-center gap-2 p-4 text-white bg-azul-marino",children:e.jsx(c,{value:i,onClickOutside:t=>{a(t),i!==t&&m(t)}})}),e.jsx("div",{className:"m-auto border w-fit",children:e.jsx("div",{children:e.jsx("iframe",{title:"dashboard perfilamiento",width:"1350",height:"680",src:"https://app.powerbi.com/view?r=eyJrIjoiN2MxYjU0ZmItNTg2YS00M2FiLWEyYjUtNjE4NjkzZGMzMmMyIiwidCI6IjBmYjBkZjA5LTc0MGYtNDFmZS1hODNmLTVhOWVjZjcwMmRhYiIsImMiOjR9",frameBorder:"0",allowFullScreen:!0})})})]})}export{l as default};