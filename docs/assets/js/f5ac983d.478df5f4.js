"use strict";(self.webpackChunkizanami_documentation=self.webpackChunkizanami_documentation||[]).push([[959],{1894:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>o});var a=i(5893),r=i(1151);const s={title:"From sources"},t=void 0,l={id:"getizanami/fromsources",title:"From sources",description:"To run izanami from sources, you will need :",source:"@site/v1/06-getizanami/03-fromsources.mdx",sourceDirName:"06-getizanami",slug:"/getizanami/fromsources",permalink:"/izanami/v1/getizanami/fromsources",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"From sources"},sidebar:"defaultSidebar",previous:{title:"From Docker",permalink:"/izanami/v1/getizanami/docker"},next:{title:"Settings",permalink:"/izanami/v1/settings/"}},c={},o=[{value:"Build the javascript",id:"build-the-javascript",level:2},{value:"Package the server",id:"package-the-server",level:2},{value:"Build the native package",id:"build-the-native-package",level:3},{value:"Build the fat jar",id:"build-the-fat-jar",level:3}];function d(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"To run izanami from sources, you will need :"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"git"}),"\n",(0,a.jsx)(n.li,{children:"JDK 11"}),"\n",(0,a.jsx)(n.li,{children:"SBT"}),"\n",(0,a.jsx)(n.li,{children:"Node.js 10"}),"\n",(0,a.jsx)(n.li,{children:"yarn or npm"}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"First get the sources :"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/MAIF/izanami.git --depth=1\n"})}),"\n",(0,a.jsx)(n.h2,{id:"build-the-javascript",children:"Build the javascript"}),"\n",(0,a.jsx)(n.p,{children:"Then go to the js folder :"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"cd izanami-server/javascript\n"})}),"\n",(0,a.jsx)(n.p,{children:"And then"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"yarn install \nyarn build \n"})}),"\n",(0,a.jsx)(n.h2,{id:"package-the-server",children:"Package the server"}),"\n",(0,a.jsx)(n.p,{children:"Allow the compiler to use more memory :"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:'SBT_OPTS="-Xmx2G -Xss20M -XX:MaxMetaspaceSize=512M"\n'})}),"\n",(0,a.jsx)(n.p,{children:"From the root folder"}),"\n",(0,a.jsx)(n.h3,{id:"build-the-native-package",children:"Build the native package"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sbt 'izanami-server/dist'\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The build package is located on the folder ",(0,a.jsx)(n.code,{children:"izanami-server/target/universal/"})]}),"\n",(0,a.jsx)(n.h3,{id:"build-the-fat-jar",children:"Build the fat jar"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"sbt 'izanami-server/assembly'\n"})}),"\n",(0,a.jsxs)(n.p,{children:["The build package is located on the folder ",(0,a.jsx)(n.code,{children:"izanami-server/scala-2.12/izanami/"})]})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>t});var a=i(7294);const r={},s=a.createContext(r);function t(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);