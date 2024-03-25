"use strict";(self.webpackChunkizanami_documentation=self.webpackChunkizanami_documentation||[]).push([[5903],{3807:(e,i,t)=>{t.r(i),t.d(i,{assets:()=>h,contentTitle:()=>s,default:()=>a,frontMatter:()=>d,metadata:()=>c,toc:()=>l});var n=t(5893),r=t(1151);const d={title:"Identity providers"},s=void 0,c={id:"authprovider",title:"Identity providers",description:"Built in user management",source:"@site/v1/16-authprovider.mdx",sourceDirName:".",slug:"/authprovider",permalink:"/izanami/v1/authprovider",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:16,frontMatter:{title:"Identity providers"},sidebar:"defaultSidebar",previous:{title:"Metrics",permalink:"/izanami/v1/metrics"},next:{title:"Clients",permalink:"/izanami/v1/clients/"}},h={},l=[{value:"Built in user management",id:"built-in-user-management",level:2},{value:"Otoroshi",id:"otoroshi",level:2},{value:"Oauth 2 identity provider",id:"oauth-2-identity-provider",level:2},{value:"HS Algorithm",id:"hs-algorithm",level:3},{value:"ES Algorithm",id:"es-algorithm",level:3},{value:"RSA Algorithm",id:"rsa-algorithm",level:3},{value:"JWKS Algorithm",id:"jwks-algorithm",level:3}];function o(e){const i={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.h2,{id:"built-in-user-management",children:"Built in user management"}),"\n",(0,n.jsx)(i.p,{children:"Without any configuration, Izanami uses his built in user management. You can create and manage users with the ui or with the APIs."}),"\n",(0,n.jsx)(i.p,{children:"The documentation is available here [User management](./ui#Manage users)"}),"\n",(0,n.jsx)(i.h2,{id:"otoroshi",children:"Otoroshi"}),"\n",(0,n.jsx)(i.p,{children:"You can use Otoroshi in front of izanami and delegate authentication to it.\nOtoroshi use a custom protocol to ensure secured exchange between the targeted application and Otoroshi."}),"\n",(0,n.jsxs)(i.p,{children:["The default config is the following. You have at least to set the ",(0,n.jsx)(i.code,{children:"sharedKey"}),"\n(eg env variable ",(0,n.jsx)(i.code,{children:"CLAIM_SHAREDKEY"})," or java system property ",(0,n.jsx)(i.code,{children:"izanami.filter.otoroshi.sharedKey"}),")."]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'izanami {\n  filter {\n    type = "Otoroshi"\n    otoroshi  {\n      allowedPaths = [${?OTOROSHI_FILTER_EXCLUSION}, ${?OTOROSHI_FILTER_EXCLUSION_1}, ${?OTOROSHI_FILTER_EXCLUSION_2}, ${?OTOROSHI_FILTER_EXCLUSION_3}]\n      issuer = "Otoroshi"\n      issuer = ${?OTOROSHI_ISSUER}\n      sharedKey = "none"\n      sharedKey = ${?CLAIM_SHAREDKEY}\n      headerClaim = "Otoroshi-Claim"\n      headerClaim = ${?FILTER_CLAIM_HEADER_NAME}\n      headerRequestId = "Otoroshi-Request-Id"\n      headerRequestId = ${?FILTER_REQUEST_ID_HEADER_NAME}\n      headerGatewayState = "Otoroshi-State"\n      headerGatewayState = ${?FILTER_GATEWAY_STATE_HEADER_NAME}\n      headerGatewayStateResp = "Otoroshi-State-Resp"\n      headerGatewayStateResp = ${?FILTER_GATEWAY_STATE_RESP_HEADER_NAME}\n    }\n  }\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["You can find more information about Otoroshi ",(0,n.jsx)(i.a,{href:"https://maif.github.io/otoroshi/manual/",children:"here"})]}),"\n",(0,n.jsx)(i.h2,{id:"oauth-2-identity-provider",children:"Oauth 2 identity provider"}),"\n",(0,n.jsx)(i.p,{children:"To use an oauth2 identity provider we need to set the oauth2 endpoint,\noption and a way to get the user information from the oauth2 identity."}),"\n",(0,n.jsxs)(i.table,{children:[(0,n.jsx)(i.thead,{children:(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.th,{children:"Config property"}),(0,n.jsx)(i.th,{children:"Env variable"}),(0,n.jsx)(i.th,{children:"Description"})]})}),(0,n.jsxs)(i.tbody,{children:[(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.enabled"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_ENABLED"})}),(0,n.jsx)(i.td,{children:"Enable this config"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.authorizeUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_AUTHORIZE_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 authorization url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.tokenUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_TOKEN_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 token url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.userInfoUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_USER_INFO_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 user info url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.introspectionUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_INTROSPECTION_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 introspection url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.loginUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_LOGIN_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 login url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.logoutUrl"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_LOGOUT_URL"})}),(0,n.jsx)(i.td,{children:"Oauth2 logout url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.clientId"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_CLIENT_ID"})}),(0,n.jsx)(i.td,{children:"Oauth2 client id"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.clientSecret"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_CLIENT_SECRET"})}),(0,n.jsx)(i.td,{children:"Oauth2 secret if provided"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.scope"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_SCOPE"})}),(0,n.jsx)(i.td,{children:"Oauth2 scope of the requested user info"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.readProfileFromToken"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_READ_FROM_TOKEN"})}),(0,n.jsx)(i.td,{children:"Should the user be read from token"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.useCookie"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_USE_COOKIE"})}),(0,n.jsx)(i.td,{children:"Pass desc as query param"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.useJson"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_USE_JSON"})}),(0,n.jsx)(i.td,{children:"Use json or form to post data to the server"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.idField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_ID_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the user id field (required field)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.accessTokenField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_ACCESS_TOKEN_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the access token field (required field)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.nameField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_NAME_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the user name field (required field)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.emailField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_EMAIL_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the user email field (optional field)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.adminField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_ADMIN_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the user admin field (a boolean, false if empty)"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.authorizedPatternField"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_AUTHORIZED_PATTERN_FIELD"})}),(0,n.jsx)(i.td,{children:"the path in the token to access the user authorizedPatternField field"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.defaultPatterns"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_DEFAULT_PATTERN"})}),(0,n.jsx)(i.td,{children:"the default patterns if authorizedPatternField is missing"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.enabled"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_ENABLED"})}),(0,n.jsx)(i.td,{children:"Enable jwt verification"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.type"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_TYPE"})}),(0,n.jsxs)(i.td,{children:["One of ",(0,n.jsx)(i.code,{children:"hs"}),", ",(0,n.jsx)(i.code,{children:"es"}),", ",(0,n.jsx)(i.code,{children:"rsa"}),", ",(0,n.jsx)(i.code,{children:"jwks"})]})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.size"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_RSA_SIZE"})}),(0,n.jsxs)(i.td,{children:["Size of rsa ",(0,n.jsx)(i.code,{children:"256"}),", ",(0,n.jsx)(i.code,{children:"384"}),", ",(0,n.jsx)(i.code,{children:"512"}),"s"]})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.size"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_HS_SIZE"})}),(0,n.jsxs)(i.td,{children:["Size of hs ",(0,n.jsx)(i.code,{children:"256"}),", ",(0,n.jsx)(i.code,{children:"384"}),", ",(0,n.jsx)(i.code,{children:"512"})]})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.size"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_ES_SIZE"})}),(0,n.jsxs)(i.td,{children:["Size of es ",(0,n.jsx)(i.code,{children:"256"}),", ",(0,n.jsx)(i.code,{children:"384"}),", ",(0,n.jsx)(i.code,{children:"512"})]})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.secret"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_HS_SECRET"})}),(0,n.jsx)(i.td,{children:"Hs secret"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.publicKey"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_RSA_PUBLIC_KEY"})}),(0,n.jsx)(i.td,{children:"Rsa public key"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.publicKey"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_ES_PUBLIC_KEY"})}),(0,n.jsx)(i.td,{children:"ES public key"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.privateKey"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_RSA_PRIVATE_KEY"})}),(0,n.jsx)(i.td,{children:"RSA private key"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.privateKey"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_ES_PRIVATE_KEY"})}),(0,n.jsx)(i.td,{children:"ES private key"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.url"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_JWKS_URL"})}),(0,n.jsx)(i.td,{children:"JWKS url"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.headers"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_JWKS_HEADERS"})}),(0,n.jsx)(i.td,{children:"JWKS headers"})]}),(0,n.jsxs)(i.tr,{children:[(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"izanami.oauth2.jwtVerifier.timeout"})}),(0,n.jsx)(i.td,{children:(0,n.jsx)(i.code,{children:"OAUTH2_JWT_VERIFIER_JWKS_TIMEOUT"})}),(0,n.jsx)(i.td,{children:"JWKS timeout call"})]})]})]}),"\n",(0,n.jsx)(i.p,{children:"The jwt modifier should be :"}),"\n",(0,n.jsx)(i.h3,{id:"hs-algorithm",children:"HS Algorithm"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'jwtVerifier = {\n  type = "hs"\n  size = 256\n  secret = "your secret"\n}\n'})}),"\n",(0,n.jsx)(i.h3,{id:"es-algorithm",children:"ES Algorithm"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'jwtVerifier = {\n  type = "es"\n  size = 256\n  publicKey = "your key"\n  privateKey = "an optional private key"\n}\n'})}),"\n",(0,n.jsx)(i.h3,{id:"rsa-algorithm",children:"RSA Algorithm"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'jwtVerifier = {\n  type = "rsa"\n  size = 256\n  publicKey = "your key"\n  privateKey = "an optional private key"\n}\n'})}),"\n",(0,n.jsx)(i.h3,{id:"jwks-algorithm",children:"JWKS Algorithm"}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'jwtVerifier = {\n  type = "jwks"\n  url = "http://localhost:8980/auth/realms/master/protocol/openid-connect/certs"\n  // Optional headers\n  headers = {\n    key = value\n  }\n  // An optional timeout for the api call\n  timeout = 1 second\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["Here is a sample to use key cloak running on ",(0,n.jsx)(i.code,{children:"http://localhost:8980"})," :"]}),"\n",(0,n.jsx)(i.pre,{children:(0,n.jsx)(i.code,{children:'izanami {\n  oauth2 {\n    enabled = true\n    authorizeUrl = "http://localhost:8980/auth/realms/master/protocol/openid-connect/auth"\n    tokenUrl = \t"http://localhost:8980/auth/realms/master/protocol/openid-connect/token"\n    userInfoUrl = "http://localhost:8980/auth/realms/master/protocol/openid-connect/userinfo"\n    introspectionUrl = \t"http://localhost:8980/auth/realms/master/protocol/openid-connect/token/introspect"\n    loginUrl = "http://localhost:8980/auth/realms/master/protocol/openid-connect/auth"\n    logoutUrl = "http://localhost:8980/auth/realms/master/protocol/openid-connect/logout"\n    clientId = "izanami"\n    clientSecret = "secret"\n    scope = "openid profile email name izanamiAdmin authorizedPatterns"\n    jwtVerifier = {\n      type = "hs"\n      size = 256\n      secret = "your secret"\n    }\n    readProfileFromToken = true\n    useCookie = false\n    useJson = false\n    idField = "sub"\n    accessTokenField = "access_token"\n    nameField = "preferred_username"\n    emailField = "email"\n    adminField = "izanamiAdmin"\n    authorizedPatternField = "authorizedPatterns"\n    defaultPatterns = "*"\n  }\n}\n'})}),"\n",(0,n.jsxs)(i.p,{children:["You can find a keycloak tutorial ",(0,n.jsx)(i.a,{href:"./tutorials/oauth2",children:"Here"}),"."]})]})}function a(e={}){const{wrapper:i}={...(0,r.a)(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},1151:(e,i,t)=>{t.d(i,{Z:()=>c,a:()=>s});var n=t(7294);const r={},d=n.createContext(r);function s(e){const i=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function c(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(d.Provider,{value:i},e.children)}}}]);