(this["webpackJsonpblockchain-demo"]=this["webpackJsonpblockchain-demo"]||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){},24:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(9),o=n.n(s),i=(n(20),n(5)),r=n(2),l=(n(21),n(37)),d=n(3),u=function(e){for(var t=0;t<e.length;t++)if(!e[t].isValid)return!1;return!0},b="receive",f="update",h="failed",j="success",g="no update",p={},O=function(e){return e.map((function(e){return Object(d.a)(Object(d.a)({},e),{},{key:Object(l.a)()})}))},m=(n(22),n(0)),x=function(e){var t=e.block,n=e.updateNextBlock,a=Object(c.useState)(t.data),s=Object(r.a)(a,2),o=s[0],i=s[1],l=Object(c.useState)(t.idx),u=Object(r.a)(l,2),b=u[0],f=u[1],h=Object(c.useState)(t.prevHash),j=Object(r.a)(h,2),g=j[0],p=j[1],O=Object(c.useState)(t.hash),x=Object(r.a)(O,2),k=x[0],v=x[1],N=Object(c.useState)(t.nonce),S=Object(r.a)(N,2),C=S[0],y=S[1],w=Object(c.useState)(t.isValid),D=Object(r.a)(w,2),A=D[0],J=D[1],R=Object(c.useState)(t.createdAt),B=Object(r.a)(R,2),I=B[0],L=B[1],T=Object(c.useRef)(k),E=Object(c.useRef)(g),H=Object(c.useRef)(I),P=Object(c.useRef)(!0),F=Object(c.useCallback)((function(e){console.log("updateBlock called"),f(e.idx),p(e.prevHash),v(e.hash),y(e.nonce),J(e.isValid),L(e.createdAt),n(e.idx)}),[n]);Object(c.useEffect)((function(){return function(){P.current=!1}}),[]),Object(c.useEffect)((function(){fetch("".concat("https://0u7w8ed6rl.execute-api.us-east-1.amazonaws.com/prod","/generateblock"),{method:"post",body:JSON.stringify(Object(d.a)(Object(d.a)({},t),{},{data:o})),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){P.current&&(e.prevHash===E.current&&e.hash===T.current?(console.log("lastCreatedAt: "+H.current),console.log("current createdAT: "+e.createdAt),e.createdAt=H.current):(E.current=e.prevHash,T.current=e.hash,H.current=e.createdAt),Object.assign(t,e),F(e))})).catch(console.log)}),[o,t,F]);var M="fc-g";return A||(M="fc-r"),Object(m.jsxs)("div",{className:"box-1 box-hover br-2 padding-5 block-width mv-5",children:[Object(m.jsxs)("div",{className:"box-1-gray flex",children:[Object(m.jsx)("div",{className:"br-1-gray ta-center pa-v-2 pa-h-5 inline-block bg-lg",children:"DATA"}),Object(m.jsx)("input",{placeholder:"Enter Data",className:"fg-4 pa-h-4",value:o,onChange:function(e){i(e.target.value)}})]}),Object(m.jsxs)("div",{className:"flex pa-t-5 pa-b-2 fs-s-8",children:[Object(m.jsx)("div",{className:"pa-r-4 no-text-wrap",children:"PREVIOUS HASH"}),Object(m.jsx)("div",{className:M+" hash-box",children:g})]}),Object(m.jsxs)("div",{className:"flex  pa-b-5 pa-t-2 fs-s-8",children:[Object(m.jsx)("div",{className:"pa-r-4",children:"HASH"}),Object(m.jsx)("div",{className:M+" hash-box",children:k})]}),Object(m.jsxs)("div",{className:"flex fs-l-5 pa-v-2 flex-baseline",children:[Object(m.jsxs)("div",{className:"mr-2",children:[0===b?"GENESIS BLOCK":"BLOCK #"+b," "]}),Object(m.jsxs)("div",{className:"fs-s-8",children:[" ",I]}),Object(m.jsx)("div",{className:"ml-a",children:C})]})]})},k=Object(c.memo)(x),v=function(){return Object(m.jsx)("div",{className:"fs-xl-5",children:"\u21e9"})},N=function(e){var t=e.children,n=c.Children.count(t),a="";return n>0&&(a=[],c.Children.forEach(t,(function(e,t){a.push(e),t<n-1&&a.push(Object(m.jsx)(v,{},t))}))),Object(m.jsx)("div",{className:"flex flex-column fit-content flex-align-center",children:a})},S=function(e){var t=e.addNewBlock,n=Object(c.useState)(""),a=Object(r.a)(n,2),s=a[0],o=a[1],i=Object(c.useRef)();return Object(m.jsxs)("div",{className:"box-1 box-hover br-2 padding-5 flex flex-column w-fit-content mv-5",children:[Object(m.jsxs)("div",{className:"box-1-gray flex",children:[Object(m.jsx)("div",{className:"br-1-gray ta-center pa-v-2 pa-h-5 inline-block bg-lg",children:"DATA"}),Object(m.jsx)("input",{placeholder:"Enter Data",className:"fg-4 pa-h-4",onChange:function(e){return o(e.target.value)},value:s,onKeyUp:function(e){13===e.keyCode&&i.current.click()}})]}),Object(m.jsx)("button",{className:"padding-2 mt-5 w-fit-content center pa-h-5",onClick:function(){o(""),t(s)},ref:i,children:"ADD DATA"})]})},C=(n(24),function(e){var t=e.peer,n=e.changeCurrentPeer,c="";return e.focused&&(c=" focused"),Object(m.jsx)("div",{id:"avatar",className:"mh-5 min-width-fc flex-shrink-0"+c,onClick:function(){return n(t)}})}),y=n(10),w=n.n(y),D=function(e){var t=e.modalIsOpen,n=e.setModalIsOpen;w.a.setAppElement("#root");var c=function(){n(!1)};return Object(m.jsxs)(w.a,{isOpen:t,onRequestClose:c,style:{content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",display:"flex",flexDirection:"column"}},contentLabel:"failure popUp",children:[Object(m.jsx)("p",{className:"f-l fc-r ta-center",children:"Failed to reconcile the blocks as the blockchain was illegal"}),Object(m.jsx)("button",{className:"center btn btn-bg-red padding-4",onClick:c,children:"Close"})]})};var A=function(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)([]),o=Object(r.a)(s,2),d=o[0],x=o[1],v=Object(c.useState)(!1),y=Object(r.a)(v,2),w=y[0],A=y[1],J=Object(c.useState)(null),R=Object(r.a)(J,2),B=R[0],I=R[1],L=Object(c.useRef)(),T=function(e){B!==e&&(L.current.classList.remove("slide-in"),function(e,t,n,c,a,s){e.blocks=s,e.channel.onmessage=function(e){var s=JSON.parse(e.data);s.message===j?t.getBlocks():s.message===h&&(c(t.blocks),console.log("failed update"),console.log(t.blocks),n(t),a(!0))},t.channel.onmessage=function(e){var a=JSON.parse(e.data);a.message===b&&(console.log("blocks received"),t.blocks=O(a.blocks),console.log(t.blocks),c(t.blocks),n(t))},e.updatedBlocks()}(B,e,I,a,A,n))},E=Object(c.useCallback)((function(e){a((function(t){return e+1<t.length?(t[e+1].prevHash=t[e].hash,t[e+1].key=Object(l.a)(),Object(i.a)(t)):t}))}),[]);return Object(c.useEffect)((function(){fetch("".concat("https://0u7w8ed6rl.execute-api.us-east-1.amazonaws.com/prod","/generatevalidblock"),{method:"post",body:JSON.stringify({data:"Welcome to SimpleChain!",prevHash:"0",prevIdx:-1}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){return e.key=Object(l.a)(),function(e,t){p.peers=[];var n={};p.blocks=e;var c=new RTCPeerConnection,a=c.createDataChannel("blockchain",{negotiated:!0,id:0});n.peer=c,n.channel=a,p.peers.push(n),a.onmessage=function(e){var t=JSON.parse(e.data);if(t.message===b)a.send(JSON.stringify({message:b,blocks:p.blocks}));else if(t.message===f){var n=t.blocks;console.log("received updated blocks:"),console.log(n),u(n)?(p.blocks=n,a.send(JSON.stringify({message:j}))):a.send(JSON.stringify({message:h}))}};var s={};s.updateStatus=g;var o=new RTCPeerConnection,i=o.createDataChannel("blockchain",{negotiated:!0,id:0});return i.onmessage=function(e){var n=JSON.parse(e.data);n.message===b&&(s.loading=!1,s.blocks=O(n.blocks),t(s.blocks))},i.onopen=function(){s.getBlocks()},s.peer=o,s.channel=i,s.loading=!1,s.getBlocks=function(){s.loading=!0,console.log("in getblocks"),i.send(JSON.stringify({message:b}))},s.updatedBlocks=function(){i.send(JSON.stringify({message:f,blocks:s.blocks}))},s.blocks=[],c.onicecandidate=function(e){e.candidate&&(console.log("ice 1"),o.addIceCandidate(e.candidate))},o.onicecandidate=function(e){e.candidate&&(console.log("ice 2"),c.addIceCandidate(e.candidate),console.log(i.readyState))},c.createOffer().then((function(e){return c.setLocalDescription(e)})).then((function(){return o.setRemoteDescription(c.localDescription)})).then((function(){return o.createAnswer()})).then((function(e){return o.setLocalDescription(e)})).then((function(){return c.setRemoteDescription(o.localDescription)})).then((function(){return s})).catch(console.log)}([e],a)})).then((function(e){x([e]),I(e)})).catch(console.log)}),[]),n&&0!==n.length?(L.current&&!L.current.classList.contains("slide-in")&&L.current.classList.add("slide-in"),Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{className:"ta-center",children:"SIMPLE CHAIN"}),Object(m.jsx)("h2",{className:"peer-text",children:"Peers"}),Object(m.jsxs)("div",{className:"flex flex-align-center max-width-100p peer-box",children:[Object(m.jsx)("div",{className:"flex overflow-auto pa-v-4 mr-4",children:d.map((function(e,t){return Object(m.jsx)(C,{peer:e,changeCurrentPeer:T,focused:e===B},t)}))}),Object(m.jsx)("button",{className:"btn padding-4 ml-a h-fit-content dim no-text-wrap min-width-fc",onClick:function(){return function(e){var t={},n=new RTCPeerConnection,c=n.createDataChannel("blockchain",{negotiated:!0,id:0});t.peer=n,t.channel=c,t.updateRequest=p.peers.push(t),c.onmessage=function(e){var t=JSON.parse(e.data);if(t.message===b)console.log("sending blocks:"),console.log(p.blocks),c.send(JSON.stringify({message:b,blocks:p.blocks}));else if(t.message===f){var n=t.blocks;u(n)?(p.blocks=n,c.send(JSON.stringify({message:j}))):c.send(JSON.stringify({message:h}))}};var a={};a.updateStatus=g;var s=new RTCPeerConnection,o=s.createDataChannel("blockchain",{negotiated:!0,id:0});return o.onmessage=function(t){var n=JSON.parse(t.data);n.message===b&&(a.loading=!1,a.blocks=O(n.blocks),console.log("peer added and working"),e((function(e){return[].concat(Object(i.a)(e),[a])})))},o.onopen=function(){a.getBlocks()},a.peer=s,a.channel=o,a.loading=!1,a.getBlocks=function(){a.loading=!0,console.log("in getblocks"),o.send(JSON.stringify({message:b}))},a.updatedBlocks=function(){o.send(JSON.stringify({message:f,blocks:a.blocks}))},a.blocks=[],n.onicecandidate=function(e){e.candidate&&(console.log("ice 1"),s.addIceCandidate(e.candidate))},s.onicecandidate=function(e){e.candidate&&(console.log("ice 2"),n.addIceCandidate(e.candidate),console.log(o.readyState))},n.createOffer().then((function(e){return n.setLocalDescription(e)})).then((function(){return s.setRemoteDescription(n.localDescription)})).then((function(){return s.createAnswer()})).then((function(e){return s.setLocalDescription(e)})).then((function(){return n.setRemoteDescription(s.localDescription)})).then((function(){return a})).catch(console.log)}(x)},children:"Add Peer"})]}),Object(m.jsx)(D,{modalIsOpen:w,setModalIsOpen:A}),Object(m.jsxs)("div",{ref:L,className:"flex flex-column flex-align-center mt-4 blockchain-box slide-in",children:[Object(m.jsx)(N,{children:n.map((function(e){return Object(m.jsx)(k,{block:e,updateNextBlock:E},e.key)}))}),Object(m.jsx)(S,{addNewBlock:function(e){fetch("".concat("https://0u7w8ed6rl.execute-api.us-east-1.amazonaws.com/prod","/generatevalidblock"),{method:"post",body:JSON.stringify({data:String(e),prevHash:n[n.length-1].hash,prevIdx:n.length-1}),headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.key=Object(l.a)(),a((function(t){return[].concat(Object(i.a)(t),[e])}))})).catch(console.log)}})]})]})):Object(m.jsx)("div",{children:"Loading"})},J=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),s(e),o(e)}))};o.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(A,{})}),document.getElementById("root")),J()}},[[36,1,2]]]);
//# sourceMappingURL=main.d76bc46c.chunk.js.map