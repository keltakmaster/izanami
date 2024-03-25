"use strict";(self.webpackChunkizanami_documentation=self.webpackChunkizanami_documentation||[]).push([[2888],{7501:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>r,toc:()=>d});var i=t(5893),s=t(1151),a=t(2450);const l={title:"Scripts"},c=void 0,r={id:"features-flipping/scripts",title:"Scripts",description:"With Izanami, scripts can be evaluated to decide if a feature is active or not. You have the choice between 3 languages :",source:"@site/v1/11-features-flipping/02-scripts.mdx",sourceDirName:"11-features-flipping",slug:"/features-flipping/scripts",permalink:"/izanami/v1/features-flipping/scripts",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Scripts"},sidebar:"defaultSidebar",previous:{title:"The UI",permalink:"/izanami/v1/features-flipping/ui"},next:{title:"APIs",permalink:"/izanami/v1/features-flipping/api"}},o={},d=[{value:"Debugging",id:"debugging",level:2},{value:"Writing script with javascript",id:"writing-script-with-javascript",level:2},{value:"Writing script with scala",id:"writing-script-with-scala",level:2},{value:"Writing script with kotlin",id:"writing-script-with-kotlin",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"With Izanami, scripts can be evaluated to decide if a feature is active or not. You have the choice between 3 languages :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"javascript"}),"\n",(0,i.jsx)(n.li,{children:"scala"}),"\n",(0,i.jsx)(n.li,{children:"kotlin"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"When writing a script, you have access to"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"context"}),": A json object send by the client"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"enabled"}),": A function to call, the feature is enabled"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"disabled"}),": A function to call, the feature is disabled"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"http"}),": An http client that can be used to request an API."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"debugging",children:"Debugging"}),"\n",(0,i.jsx)(n.p,{children:"You can debug script in the UI"}),"\n",(0,i.jsx)("img",{src:a.Z,width:"100%"}),"\n",(0,i.jsx)(n.p,{children:"Click on the run button to test the script, compiling errors will be printed on the right panel."}),"\n",(0,i.jsxs)(n.p,{children:["You can print logs using ",(0,i.jsx)(n.code,{children:"println"})," in scala or kotlin and ",(0,i.jsx)(n.code,{children:"console.log"})," in javascript.\nThe logs will be printed on the left panel."]}),"\n",(0,i.jsx)(n.h2,{id:"writing-script-with-javascript",children:"Writing script with javascript"}),"\n",(0,i.jsx)(n.p,{children:"The http client expose the call method that take two args :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"options"}),", an object with the following possible attributes","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"url"})," (required): The url to call."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"method"})," (default get): The http method betwwen ",(0,i.jsx)(n.code,{children:"get"}),", ",(0,i.jsx)(n.code,{children:"post"}),", ",(0,i.jsx)(n.code,{children:"put"}),", ",(0,i.jsx)(n.code,{children:"delete"}),", ",(0,i.jsx)(n.code,{children:"option"}),", ",(0,i.jsx)(n.code,{children:"patch"})]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"headers"})," : A object with headerName -> Value"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"body"})," : An optional json string"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"callback"}),": A bifunction with failure or success."]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-javascript",children:'function enabled(context, enabled, disabled, http) {\n  http.call(\n    {\n      url: "http://localhost:9000/api/features/feature:with:script/check",\n      method: "post",\n      headers: {\n        "Izanami-Client-Id": "xxxx",\n        "Izanami-Client-Secret": "xxxx",\n        "Content-Type": "application/json",\n      },\n      body: JSON.stringify({\n        user: context.user,\n      }),\n    },\n    function (error, success) {\n      if (error) {\n        return enabled();\n      } else {\n        var resp = JSON.parse(success);\n        if (resp.active) {\n          return enabled();\n        } else {\n          return disabled();\n        }\n      }\n    }\n  );\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"writing-script-with-scala",children:"Writing script with scala"}),"\n",(0,i.jsx)(n.p,{children:"In scala, the http client is the default playframework WSClient and the json value is play json JsValue.\nYou can find more information here :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["http client: ",(0,i.jsx)(n.a,{href:"https://www.playframework.com/documentation/2.6.x/ScalaWS",children:"https://www.playframework.com/documentation/2.6.x/ScalaWS"})]}),"\n",(0,i.jsxs)(n.li,{children:["json : ",(0,i.jsx)(n.a,{href:"https://www.playframework.com/documentation/2.6.x/ScalaJson",children:"https://www.playframework.com/documentation/2.6.x/ScalaJson"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"A example script doing an http call could be"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-scala",children:'def enabled(context: play.api.libs.json.JsObject,\n             enabled: () => Unit,\n             disabled: () => Unit,\n             http: play.api.libs.ws.WSClient)(implicit ec: ExecutionContext): Unit = {\n    import scala.util._\n\n    http.url("http://localhost:9000/api/features/you:can:write:script:with:scala/check")\n        .addHttpHeaders(\n            "Izanami-Client-Id" -> "xxxx",\n            "Izanami-Client-Secret" -> "xxxx"\n        )\n        .post(context)\n        .onComplete {\n            case Success(response) =>\n                response.status match {\n                    case 200 if (response.json \\ "active").asOpt[Boolean].contains(true) =>\n                        enabled()\n                    case other =>\n                        println(s"Oups $other")\n                        disabled()\n                }\n            case Failure(e) =>\n                println(s"Oups $e")\n                disabled()\n        }\n}\n'})}),"\n",(0,i.jsx)(n.h2,{id:"writing-script-with-kotlin",children:"Writing script with kotlin"}),"\n",(0,i.jsx)(n.p,{children:"In kotlin, the http client is the default playframework java WSClient and the json value is jackson JsonValue.\nYou can find more information here :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["http client: ",(0,i.jsx)(n.a,{href:"https://www.playframework.com/documentation/2.6.x/ScalaWS",children:"https://www.playframework.com/documentation/2.6.x/ScalaWS"})]}),"\n",(0,i.jsxs)(n.li,{children:["json : ",(0,i.jsx)(n.a,{href:"https://www.playframework.com/documentation/2.6.x/ScalaJson",children:"https://www.playframework.com/documentation/2.6.x/ScalaJson"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"A example script doing an http call could be"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-kotlin",children:'fun enabled(context: JsonNode, enabled: () -> Unit, disabled: () -> Unit, wsClient: WSClient) {\n    wsClient.url("http://localhost:9000/api/features/you:can:write:script:with:kotlin/check")\n      .addHeader("Izanami-Client-Id", "xxxx")\n      .addHeader("Izanami-Client-Secret", "xxxx")\n      .post(context)\n      .whenComplete { wsResponse, e ->\n    \t  if (e != null) {\n            disabled()\n        } else {\n            when (wsResponse.getStatus()) {\n              200 -> {\n                val jsonBody = wsResponse.asJson()\n                if(jsonBody.get("active")?.asBoolean() ?: false) {\n                  enabled()\n                } else {\n                  println("oups: ${jsonBody}")\n                  disabled()\n                }\n              }\n              else -> {\n                println("oups: ${wsResponse.getStatus()} ${wsResponse.getBody()}")\n                disabled()\n              }\n            }\n        }\n      }\n}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},2450:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/script-e7f9003f48f16928f8078b1ad05b130a.png"},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>l});var i=t(7294);const s={},a=i.createContext(s);function l(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);