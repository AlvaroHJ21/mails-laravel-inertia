import{r as l,W as x,j as s,a as f}from"./app-BeXNwoRY.js";import{G as g}from"./GuestLayout-CQ_FIDHO.js";import{I as i}from"./InputError-DtqHT2j4.js";import{B as h}from"./Button-BVyh6dWg.js";function y({status:t,canResetPassword:j}){const[a,m]=l.useState(!1),{data:r,setData:o,post:c,processing:u,errors:n,reset:d}=x({username:"",password:"",remember:!1});l.useEffect(()=>()=>{d("password")},[]);const p=e=>{e.preventDefault(),c(route("login"))};return s.jsxs(g,{children:[s.jsx(f,{title:"Login"}),t&&s.jsx("div",{className:"mb-4 text-sm font-medium text-green-600",children:t}),s.jsx("div",{className:"absolute left-0 right-0 grid w-24 h-24 m-auto border rounded-full bg-cielo-alba place-content-center -top-12",children:s.jsx("img",{src:"/logo.png",alt:"",width:"48"})}),s.jsx("h1",{className:"mb-6 text-xl font-bold text-center text-azul-marino",children:"Plataforma de contactabilidad y gestión de contactos"}),s.jsxs("form",{onSubmit:p,children:[s.jsxs("div",{className:"mb-3",children:[s.jsxs("label",{className:"input-group",children:[s.jsx("span",{className:"input-group-icon",children:s.jsx("i",{className:"fa fa-user"})}),s.jsx("input",{type:"text",name:"username",className:"input",placeholder:"Nombre de usuario",value:r.username,onChange:e=>o("username",e.target.value)})]}),s.jsx(i,{message:n.username,className:"mt-2"})]}),s.jsxs("div",{className:"mb-3",children:[s.jsxs("label",{className:"relative input-group",children:[s.jsx("span",{className:"input-group-icon",children:s.jsx("i",{className:"fa fa-key"})}),s.jsx("input",{type:a?"text":"password",name:"password",className:"input",placeholder:"Contraseña",value:r.password,onChange:e=>o("password",e.target.value)}),s.jsx("button",{type:"button",className:"absolute top-0 bottom-0 m-auto right-4",onClick:()=>m(!a),children:a?s.jsx("i",{className:"fa fa-eye-slash"}):s.jsx("i",{className:"fa fa-eye"})})]}),s.jsx(i,{message:n.password,className:"mt-2"})]}),s.jsx(h,{className:"w-full",isLoading:u,children:"Ingresar"})]})]})}export{y as default};
