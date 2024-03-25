"use strict";(self.webpackChunkizanami_documentation=self.webpackChunkizanami_documentation||[]).push([[9097],{8299:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>p,frontMatter:()=>d,metadata:()=>c,toc:()=>o});var i=s(5893),t=s(1151),a=s(9217);const d={title:"UI usage"},l=void 0,c={id:"ui",title:"UI usage",description:"Global search",source:"@site/v1/08-ui.mdx",sourceDirName:".",slug:"/ui",permalink:"/izanami/v1/ui",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"UI usage"},sidebar:"defaultSidebar",previous:{title:"All the settings",permalink:"/izanami/v1/settings/settings"},next:{title:"APIs usage",permalink:"/izanami/v1/api"}},r={},o=[{value:"Global search",id:"global-search",level:2},{value:"Features",id:"features",level:2},{value:"Configurations",id:"configurations",level:2},{value:"Experiments (A/B testing)",id:"experiments-ab-testing",level:2},{value:"Scripts",id:"scripts",level:2},{value:"Create or update a script",id:"create-or-update-a-script",level:3},{value:"Web hooks",id:"web-hooks",level:2},{value:"Manage web hooks",id:"manage-web-hooks",level:2},{value:"Download and Upload",id:"download-and-upload",level:3},{value:"Manage users",id:"manage-users",level:2},{value:"Edit a user",id:"edit-a-user",level:3},{value:"Download and Upload",id:"download-and-upload-1",level:3},{value:"Manage API keys",id:"manage-api-keys",level:2},{value:"Edit a api key",id:"edit-a-api-key",level:3},{value:"Download and Upload",id:"download-and-upload-2",level:3}];function h(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"global-search",children:"Global search"}),"\n",(0,i.jsx)(n.p,{children:'On the top of the screen you can quick search and access "features", "configurations", "experiments" or "global script".'}),"\n",(0,i.jsx)(n.p,{children:"The search can be refined by clicking the buttons:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Search",src:s(8594).Z+"",width:"2528",height:"812"})}),"\n",(0,i.jsx)(n.p,{children:"Clicking one item will bring you to the edit page of the selected item."}),"\n",(0,i.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,i.jsxs)(n.p,{children:["Visit to the ",(0,i.jsx)(n.a,{href:"http://google.com",children:"features UI doc"})]}),"\n",(0,i.jsx)(n.h2,{id:"configurations",children:"Configurations"}),"\n",(0,i.jsxs)(n.p,{children:["Visit to the ",(0,i.jsx)(n.a,{href:"http://google.com",children:"features UI doc"})]}),"\n",(0,i.jsx)(n.h2,{id:"experiments-ab-testing",children:"Experiments (A/B testing)"}),"\n",(0,i.jsxs)(n.p,{children:["Visit to the ",(0,i.jsx)(n.a,{href:"http://google.com",children:"experiments UI doc"})]}),"\n",(0,i.jsx)(n.h2,{id:"scripts",children:"Scripts"}),"\n",(0,i.jsxs)(n.p,{children:["You can write script once and reuse it between strategies. Just click to the ",(0,i.jsx)(n.code,{children:"Global Scripts"})," menu."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Scripts",src:s(3790).Z+"",width:"2520",height:"794"})}),"\n",(0,i.jsx)(n.h3,{id:"create-or-update-a-script",children:"Create or update a script"}),"\n",(0,i.jsxs)(n.p,{children:["Hit the ",(0,i.jsx)(n.code,{children:"Add item"})," or the pencil button to edit a script"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Scripts",src:s(1848).Z+"",width:"2524",height:"1348"})}),"\n",(0,i.jsx)(n.p,{children:"When writing a script, you have access to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"context"}),": A json object send by the client"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"enabled"}),": A function to call, the feature is enabled"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"disabled"}),": A function to call, the feature is disabled"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"http"}),": An http client that can be used to request an API."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"The http client expose the call method that take two args :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"options"}),", an object with the following possible attributes","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"url"})," (required): The url to call."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"method"})," (default get): The http method betwwen ",(0,i.jsx)(n.code,{children:"get"}),", ",(0,i.jsx)(n.code,{children:"post"}),", ",(0,i.jsx)(n.code,{children:"put"}),", ",(0,i.jsx)(n.code,{children:"delete"}),", ",(0,i.jsx)(n.code,{children:"option"}),", ",(0,i.jsx)(n.code,{children:"patch"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"headers"})," : A object with headerName -> Value"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"body"})," : An optional json string"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"callback"}),": A bifunction with failure or success."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:'function enabled(context, enabled, disabled, http) {\n  http.call(\n    {\n      url: "http://localhost:9000/api/features/feature:with:script/check",\n      method: "post",\n      headers: {\n        "Izanami-Client-Id": "xxxx",\n        "Izanami-Client-Secret": "xxxx",\n        "Content-Type": "application/json",\n      },\n      body: JSON.stringify({\n        user: context.user,\n      }),\n    },\n    function (error, success) {\n      if (error) {\n        return enabled();\n      } else {\n        var resp = JSON.parse(success);\n        if (resp.active) {\n          return enabled();\n        } else {\n          return disabled();\n        }\n      }\n    }\n  );\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"web-hooks",children:"Web hooks"}),"\n",(0,i.jsx)(n.p,{children:"Like the other screen you can see the existing hooks on a table:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Hooks",src:s(639).Z+"",width:"2514",height:"776"})}),"\n",(0,i.jsx)(n.h2,{id:"manage-web-hooks",children:"Manage web hooks"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Hook",src:s(7070).Z+"",width:"2548",height:"896"})}),"\n",(0,i.jsx)(n.p,{children:"The registered hooks will be called when new events occur"}),"\n",(0,i.jsx)(n.h3,{id:"download-and-upload",children:"Download and Upload"}),"\n",(0,i.jsx)(n.p,{children:"If you're admin you have the right to download or upload."}),"\n",(0,i.jsx)("img",{src:a.Z,width:"50%"}),"\n",(0,i.jsx)(n.h2,{id:"manage-users",children:"Manage users"}),"\n",(0,i.jsx)(n.p,{children:"You can manage user if you're an admin."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Users",src:s(269).Z+"",width:"2524",height:"792"})}),"\n",(0,i.jsx)(n.p,{children:"Like the other screen you can see the existing users on a table:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Users",src:s(7516).Z+"",width:"2876",height:"794"})}),"\n",(0,i.jsx)(n.h3,{id:"edit-a-user",children:"Edit a user"}),"\n",(0,i.jsx)(n.p,{children:"To create or edit a user, you have to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"an Id"}),"\n",(0,i.jsx)(n.li,{children:"A name"}),"\n",(0,i.jsx)(n.li,{children:"An email"}),"\n",(0,i.jsx)(n.li,{children:"A password"}),"\n",(0,i.jsx)(n.li,{children:"Specified if the user is admin"}),"\n",(0,i.jsx)(n.li,{children:"Patterns to apply restriction on user"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Edit user",src:s(4678).Z+"",width:"2876",height:"1218"})}),"\n",(0,i.jsx)(n.h3,{id:"download-and-upload-1",children:"Download and Upload"}),"\n",(0,i.jsx)(n.p,{children:"If you're admin you have the right to download or upload."}),"\n",(0,i.jsx)("img",{src:a.Z,width:"50%"}),"\n",(0,i.jsx)(n.h2,{id:"manage-api-keys",children:"Manage API keys"}),"\n",(0,i.jsx)(n.p,{children:"You can manage api keys if you're an admin."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Apikeys",src:s(7650).Z+"",width:"2510",height:"774"})}),"\n",(0,i.jsx)(n.p,{children:"Like the other screen you can see the existing api keys on a table:"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Apikeys",src:s(2298).Z+"",width:"2504",height:"776"})}),"\n",(0,i.jsx)(n.h3,{id:"edit-a-api-key",children:"Edit a api key"}),"\n",(0,i.jsx)(n.p,{children:"To create or edit a api key, you have to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"A name"}),"\n",(0,i.jsx)(n.li,{children:"A client id"}),"\n",(0,i.jsx)(n.li,{children:"A client secret"}),"\n",(0,i.jsx)(n.li,{children:"Patterns to apply restriction on api key"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{alt:"Edit an api key",src:s(5014).Z+"",width:"2540",height:"830"})}),"\n",(0,i.jsx)(n.h3,{id:"download-and-upload-2",children:"Download and Upload"}),"\n",(0,i.jsx)(n.p,{children:"If you're admin you have the right to download or upload."}),"\n",(0,i.jsx)("img",{src:a.Z,width:"50%"})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},9217:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/download-upload-190ece8c34554fe2d94962988d681ca3.png"},7650:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/access-apikeys-9c249de93117411c749e5fba86a06124.png"},2298:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/all-1852b062887aeec28ff3838abd6a18a6.png"},5014:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/apikey-d0c8f02212ef3ccb219077716e62de56.png"},8594:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/search-5235b522061acbcca5160cab315c7227.png"},639:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/all-912290ff7736f75af16ef71a8600df67.png"},7070:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/hook-c87a9c865bf25da2f21816a8e7cd3dfe.png"},3790:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/list-4c4ddfe386e3c7954d9f88a988c4b4da.png"},1848:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/script-b5c8258551c722c2e1ce6d4ab212d428.png"},269:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/access-users-2774dd5ec17023397b75257aa834254a.png"},7516:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/all-03ae667f510b97add959ee96af434aa3.png"},4678:(e,n,s)=>{s.d(n,{Z:()=>i});const i=s.p+"assets/images/user-46aba09dd8c6feec9b0453da301f64f1.png"},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>d});var i=s(7294);const t={},a=i.createContext(t);function d(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);