var m=Object.defineProperty;var d=(s,e,t)=>e in s?m(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>(d(s,typeof e!="symbol"?e+"":e,t),t);import{r as o,j as c}from"./app-D77_fFI3.js";class h{constructor(e,t){i(this,"callback");i(this,"timerId");i(this,"start");i(this,"remaining");this.callback=e,this.remaining=t,this.timerId=-1,this.start=-1,this.resume()}resume(){this.start=Date.now(),window.clearTimeout(this.timerId),this.timerId=window.setTimeout(this.callback,this.remaining)}pause(){window.clearTimeout(this.timerId),this.remaining-=Date.now()-this.start}}function g(s){const{text:e}=s,[t,a]=o.useState(!0);o.useRef();const r=o.useRef();if(o.useEffect(()=>(r.current=new h(()=>{a(!1)},3e3),()=>{var n;(n=r.current)==null||n.pause()}),[]),!t)return null;function u(){var n;(n=r.current)==null||n.pause()}function l(){var n;(n=r.current)==null||n.resume()}return c.jsxs("div",{onMouseEnter:u,onMouseLeave:l,className:"mb-6 text-center alert alert-info transition-[height] overflow-hidden",children:[c.jsx("div",{className:"alert-content",children:c.jsx("p",{className:"max-w-[90%] m-auto",children:e})}),c.jsx("div",{className:"indicator"})]})}const w="/build/assets/eliminar-6SEU7Stc.svg",p="/build/assets/ver-C5A1F2Zc.svg",x="/build/assets/enviar-BmbHHMwt.svg";function b(s){const e=new Date(s),t=e.getDate(),a=e.getMonth()+1,r=e.getFullYear();return`${t<10?"0"+t:t}-${a<10?"0"+a:a}-${r.toString().slice(-2)}`}export{g as A,w as a,x as e,b as f,p as v};