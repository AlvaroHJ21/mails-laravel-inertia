import{r as w,W as v,j as s}from"./app-CbZxairI.js";import{I as n}from"./InputError-CemdJBqs.js";import{I as c}from"./InputLabel-C9NLZi5U.js";import{P as _}from"./PrimaryButton-B7iyQC2N.js";import{T as l}from"./TextInput-BG0c727z.js";import{q as y}from"./transition-CTvPzFXL.js";function E({className:x=""}){const u=w.useRef(null),d=w.useRef(null),{data:e,setData:r,errors:t,put:f,reset:o,processing:j,recentlySuccessful:h}=v({current_password:"",password:"",password_confirmation:""}),g=a=>{a.preventDefault(),f(route("password.update"),{preserveScroll:!0,onSuccess:()=>o(),onError:p=>{var i,m;p.password&&(o("password","password_confirmation"),(i=u.current)==null||i.focus()),p.current_password&&(o("current_password"),(m=d.current)==null||m.focus())}})};return s.jsxs("section",{className:x,children:[s.jsxs("header",{children:[s.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Actualizar Contraseña"}),s.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Asegúrese de que su cuenta utilice una contraseña larga y aleatoria para mantenerse segura."})]}),s.jsxs("form",{onSubmit:g,className:"mt-6 space-y-6",children:[s.jsxs("div",{children:[s.jsx(c,{htmlFor:"current_password",value:"Contraseña actual"}),s.jsx(l,{id:"current_password",ref:d,value:e.current_password,onChange:a=>r("current_password",a.target.value),type:"password",className:"block w-full mt-1",autoComplete:"current-password"}),s.jsx(n,{message:t.current_password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password",value:"Nueva contraseña"}),s.jsx(l,{id:"password",ref:u,value:e.password,onChange:a=>r("password",a.target.value),type:"password",className:"block w-full mt-1",autoComplete:"new-password"}),s.jsx(n,{message:t.password,className:"mt-2"})]}),s.jsxs("div",{children:[s.jsx(c,{htmlFor:"password_confirmation",value:"Repite contraseña"}),s.jsx(l,{id:"password_confirmation",value:e.password_confirmation,onChange:a=>r("password_confirmation",a.target.value),type:"password",className:"block w-full mt-1",autoComplete:"new-password"}),s.jsx(n,{message:t.password_confirmation,className:"mt-2"})]}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx(_,{disabled:j,children:"Guardar"}),s.jsx(y,{show:h,enter:"transition ease-in-out",enterFrom:"opacity-0",leave:"transition ease-in-out",leaveTo:"opacity-0",children:s.jsx("p",{className:"text-sm text-gray-600",children:"Guardado."})})]})]})]})}export{E as default};