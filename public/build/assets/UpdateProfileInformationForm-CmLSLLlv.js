import{q as h,W as j,j as e,d as v}from"./app-KmnGMM83.js";import{I as n}from"./InputError-Ce6wBH02.js";import{I as o}from"./InputLabel-CDjekX1a.js";import{P as g}from"./PrimaryButton-BlDVsehX.js";import{T as l}from"./TextInput-CEWSJ5gM.js";import{q as y}from"./transition-BN2xlhNw.js";function w({mustVerifyEmail:m,status:c,className:d=""}){const a=h().props.auth.user,{data:s,setData:r,patch:u,errors:i,processing:x,recentlySuccessful:f}=j({name:a.name,email:a.email}),p=t=>{t.preventDefault(),u(route("profile.update"))};return e.jsxs("section",{className:d,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Información de Perfil"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Actualice la información del perfil y la dirección de correo electrónico de su cuenta."})]}),e.jsxs("form",{onSubmit:p,className:"mt-6 space-y-6",children:[e.jsxs("div",{children:[e.jsx(o,{htmlFor:"name",value:"Nombre"}),e.jsx(l,{id:"name",className:"block w-full mt-1",value:s.name,onChange:t=>r("name",t.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e.jsx(n,{className:"mt-2",message:i.name})]}),e.jsxs("div",{children:[e.jsx(o,{htmlFor:"email",value:"Correo electrónico"}),e.jsx(l,{id:"email",type:"email",className:"block w-full mt-1",value:s.email,onChange:t=>r("email",t.target.value),required:!0,autoComplete:"username"}),e.jsx(n,{className:"mt-2",message:i.email})]}),m&&a.email_verified_at===null&&e.jsxs("div",{children:[e.jsxs("p",{className:"mt-2 text-sm text-gray-800",children:["Your email address is unverified.",e.jsx(v,{href:route("verification.send"),method:"post",as:"button",className:"text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Click here to re-send the verification email."})]}),c==="verification-link-sent"&&e.jsx("div",{className:"mt-2 text-sm font-medium text-green-600",children:"A new verification link has been sent to your email address."})]}),e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(g,{disabled:x,children:"Guardar"}),e.jsx(y,{show:f,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Guardado."})})]})]})]})}export{w as default};