import{createContext as K,useState as L} from"react";import{v4 as M} from"uuid";import{useState as G} from"react";var J=({initialValues:R})=>{const[f,y]=G(R??{});return{state:f,getValue:(D)=>f[D]}},w=J;import{jsxDEV as Q} from"react/jsx-dev-runtime";var O=({initialValues:R,children:f})=>{const[y]=L(M()),q={...w({initialValues:R}),formId:y};return Q(b.Provider,{value:q,children:f},void 0,!1,void 0,this)},b=K({formId:"",state:{},getValue:()=>({})}),z=O;import{jsxDEV as U} from"react/jsx-dev-runtime";var T=(R)=>{return U(z,{...R},void 0,!1,void 0,this)},W=T;import{jsxDEV as Z,Fragment as Y} from"react/jsx-dev-runtime";var X=(R)=>{return Z(Y,{},void 0,!1,void 0,this)},_=X;import{jsxDEV as E,Fragment as A} from"react/jsx-dev-runtime";var $=(R)=>{return E(A,{},void 0,!1,void 0,this)},N=$;import{jsxDEV as H,Fragment as k} from"react/jsx-dev-runtime";var h=(R)=>{return H(k,{},void 0,!1,void 0,this)},I=h;import{jsxDEV as V,Fragment as S} from"react/jsx-dev-runtime";var P=(R)=>{return V(S,{},void 0,!1,void 0,this)},j=P;import{useContext as C} from"react";var p=()=>C(b),g=p;var x=(R)=>{const{getValue:f}=g();return{value:f(R)}},l=x;export{l as useFormElement,g as useFormContext,j as TextArea,I as Select,N as NestedForm,_ as Input,W as Form};
