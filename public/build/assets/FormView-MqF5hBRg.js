import{r as m,j as e,y as n}from"./app-g_Ga4a36.js";import{T as l}from"./TextEditable-CLY4OeTU.js";function j(s){const{perfil:r}=s,[i,o]=m.useState(r.nombre);function a(t){n.put(route("perfiles.update",{perfil:r}),{nombre:t})}return e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center justify-center gap-2 p-4 text-white bg-azul-marino",children:e.jsx(l,{value:i,onClickOutside:t=>{o(t),i!==t&&a(t)}})}),e.jsx("div",{className:"m-auto border w-fit",children:e.jsx("div",{children:e.jsx("iframe",{title:"dashboard perfilamiento",width:"1350",height:"550",src:"https://app.powerbi.com/view?r=eyJrIjoiZDg5NTljMTgtMDU0Yi00NzI4LWI4ODYtZTZjYzc5Y2YzYWFlIiwidCI6IjBmYjBkZjA5LTc0MGYtNDFmZS1hODNmLTVhOWVjZjcwMmRhYiIsImMiOjR9",frameBorder:"0",allowFullScreen:!0})})})]})}export{j as default};