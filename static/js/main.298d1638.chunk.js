(this.webpackJsonpsegmind=this.webpackJsonpsegmind||[]).push([[0],{32:function(e,t,n){},34:function(e,t){},36:function(e,t){},37:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(0),s=n.n(i),c=n(22),o=n.n(c),r=(n(32),n(17)),l=n.n(r),d=n(23),u=n(10),h=n(11),f=n(13),b=n(12);function p(){return Object(a.jsx)("div",{style:j.navbar})}var j={navbar:{height:"50px",display:"flex",justifyContent:"center",alignItems:"center",color:"black"}},m=n(26),g=n(24),v=n.n(g),x=n(6),O=n.n(x),C=function(e){var t=e.location.state,n=t.selectedImage,s=t.annotations,c=t.categories,o=n.id,r=(n.coco_url,n.width),l=n.height,d=[],u=[];function h(e){!function(){var e=document.getElementById("paper-canvas");e.getContext("2d").clearRect(0,0,e.width,e.height)}();new O.a.Raster({source:n.coco_url,position:O.a.view.center});d.forEach((function(e){if(e.image_id==o){var t=e.bbox,n=t[0],a=t[1],i=t[2],s=t[3],c=new O.a.Rectangle(n,a,i,s),r=new O.a.Path.Rectangle(c);r.hasStroke=!0,r.strokeWidth=2,r.strokeColor=u[e.category_id]}}))}return Object(i.useEffect)((function(){!function(){for(;u.length<100;){do{var e=Math.floor(1e6*Math.random()+1)}while(u.indexOf(e)>=0);u.push("#"+("000000"+e.toString(16)).slice(-6))}}(),O.a.setup("paper-canvas"),new O.a.Raster({source:n.coco_url,position:O.a.view.center}),s.forEach((function(e){if(e.image_id==o){var t=e.bbox,n=t[0],a=t[1],i=t[2],s=t[3],c=new O.a.Rectangle(n,a,i,s),r=new O.a.Path.Rectangle(c);r.hasStroke=!0,r.strokeWidth=2,r.strokeColor=u[e.category_id],d.push(e)}}))})),Object(a.jsx)("div",{className:"flex",children:Object(a.jsx)("canvas",{id:"paper-canvas",height:l,width:r,resize:"true",onMouseEnter:function(e){d.forEach((function(e){var t=c.find((function(t){return t.id===e.category_id})).name,n=e.bbox[0],a=e.bbox[1],i=new O.a.PointText({point:new O.a.Point(n,a),content:t,justification:"center",fontFamily:"Noto Sans",fillColor:"white"}),s=new O.a.Path.Rectangle(i.bounds);s.fillColor="black",s.strokeColor="black",i.insertAbove(s)}))},onMouseLeave:function(e){h()}})})},k=(n(37),n(2));function w(e){var t=e.images,n=e.dataRaw,s=Object(k.e)(),c=Object(i.useState)(0),o=Object(m.a)(c,2),r=o[0],l=o[1],d=t;var u=8*r,h=d.slice(u,u+8).map((function(e){return Object(a.jsx)("img",{src:e.coco_url,onClick:function(){s.push({pathname:"/canvas",state:{selectedImage:e,annotations:n.annotations,categories:n.categories}})}})})),f=Math.ceil(d.length/8);return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("div",{className:"imageGrid",children:h}),Object(a.jsx)(v.a,{previousLabel:"\u2190 Previous",nextLabel:"Next \u2192",pageCount:f,onPageChange:function(e){var t=e.selected;l(t)},containerClassName:"pagination",previousLinkClassName:"pagination__link",nextLinkClassName:"pagination__link",disabledClassName:"pagination__link--disabled",activeClassName:"pagination__link--active"})]})}s.a.Component,n(42);var I=n(16),S=function(e){Object(f.a)(n,e);var t=Object(b.a)(n);function n(){var e;return Object(u.a)(this,n),(e=t.call(this)).handleChange=function(t){e.setState({data:JSON.parse(t.target.value)})},e.handleSubmit=function(t){t.preventDefault(),1==e.state.fileInput?e.uploadFile():1==e.state.demoDataInput&&e.useDemoData()},e.useDemoData=Object(d.a)(l.a.mark((function t(){var n,a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.jsonbin.io/b/600dc2edd4d77374a3f42c2d");case 2:return n=t.sent,t.next=5,n.json();case 5:a=t.sent,e.setState({data:a,displayImages:!0});case 7:case"end":return t.stop()}}),t)}))),e.uploadFile=function(){var t=document.getElementById("fileInput");if(t&&t.files.length>0){var n=new FileReader;n.addEventListener("load",(function(){var t=JSON.parse(n.result);e.setState({data:t,displayImages:!0})})),n.readAsText(t.files[0])}},e.state={data:null,displayImages:!1,selectedImage:null,showCanvas:!1,fileInput:!1,demoDataInput:!1},e}return Object(h.a)(n,[{key:"render",value:function(){var e=this,t=this.state,n=t.data,i=t.displayImages,s=(t.selectedImage,t.showCanvas,t.fileInput),c=t.demoDataInput;return Object(a.jsxs)(I.a,{children:[Object(a.jsxs)("div",{children:[Object(a.jsx)(p,{}),Object(a.jsxs)("div",{style:{backgroundColor:"lightGray",padding:"20px 0"},children:[Object(a.jsx)("h1",{children:"Object Detection"}),Object(a.jsxs)("h2",{children:["Upload a JSON file (in COCO JSON format), or use our ",Object(a.jsx)("a",{href:"https://api.jsonbin.io/b/600dc2edd4d77374a3f42c2d",target:"_blank",children:"demo dataset"}),"."]}),Object(a.jsxs)("div",{className:"flex mb-20",children:[Object(a.jsx)("button",{onClick:function(){e.setState({fileInput:!0,demoDataInput:!1})},children:"Upload JSON"}),Object(a.jsx)("button",{onClick:function(){e.setState({demoDataInput:!0,fileInput:!1})},children:"Use Demo Dataset"})]}),Object(a.jsxs)("div",{children:[s?Object(a.jsx)("div",{className:"flex mb-20",children:Object(a.jsx)("input",{type:"file",id:"fileInput"})}):"",c?Object(a.jsx)("h3",{children:"Demo file uploaded. Please press Submit."}):""]}),Object(a.jsx)("div",{className:"flex mb-20",children:Object(a.jsx)("button",{onClick:this.handleSubmit,children:"Submit"})})]}),i?Object(a.jsx)(w,{dataRaw:n,images:n.images}):""]}),Object(a.jsx)(k.a,{path:"/canvas",component:C})]})}}]),n}(s.a.Component),y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),s(e),c(e)}))};o.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(S,{})}),document.getElementById("root")),y()}},[[43,1,2]]]);
//# sourceMappingURL=main.298d1638.chunk.js.map