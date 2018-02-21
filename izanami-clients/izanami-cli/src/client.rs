use reqwest;
use reqwest::header::{Headers};
use serde_json::{from_str, Value};

pub struct IzanamiSettings {
    pub client_id: String, 
    pub client_id_header: String, 
    pub client_secret: String, 
    pub client_secret_header: String, 
    pub url: String
}

pub struct IzanamiClient {
    settings: IzanamiSettings, 
}

header! { (ContentType, "Content-Type") => [String] }
header! { (Accept, "Accept") => [String] }

fn construct_headers(settings: &IzanamiSettings) -> Headers {
    let client_id = &settings.client_id;
    let client_id_header = &settings.client_id_header;
    let client_secret = &settings.client_secret;
    let client_secret_header = &settings.client_secret_header;
    
    let mut headers = Headers::new();    
    headers.set(Accept("application/json".to_string()));
    headers.set(ContentType("application/json".to_string()));
    headers.set_raw(client_id_header.to_string(), client_id.to_string());
    headers.set_raw(client_secret_header.to_string(), client_secret.to_string());
    headers
}

fn post(settings: &IzanamiSettings, path: String, body: String) -> String {    
    let response_body: String = 
        reqwest::Client::new().post(path.as_str()).body(body)
        .headers(construct_headers(settings))        
        .send()
        .and_then(|mut resp| resp.text())    
        .unwrap();
    
    format!("{}", response_body)               
} 

fn put(settings: &IzanamiSettings, path: String, body: String) -> String {    
    let response_body: String = 
        reqwest::Client::new().put(path.as_str()).body(body)
        .headers(construct_headers(settings))        
        .send()
        .and_then(|mut resp| resp.text())    
        .unwrap();
    
    format!("{}", response_body)               
} 


fn patch(settings: &IzanamiSettings, path: String, body: String) -> String {    
    let response_body: String = 
        reqwest::Client::new().patch(path.as_str()).body(body)
        .headers(construct_headers(settings))        
        .send()
        .and_then(|mut resp| resp.text())    
        .unwrap();
    
    format!("{}", response_body)               
} 

fn get(settings: &IzanamiSettings, path: String) -> String {        
    let response_body: String = 
        reqwest::Client::new().get(path.as_str())
        .headers(construct_headers(settings))
        .send()
        .and_then(|mut resp| resp.text())    
        .unwrap();
    
    format!("{}", response_body)               
} 

impl IzanamiClient {

    pub fn create(settings: IzanamiSettings) -> IzanamiClient {
        IzanamiClient { settings }
    }

    pub fn check_feature_with_context(&self, name: &str, context: Option<String>) -> Value {                
        let path = format!("{}/api/features/{}/check", &self.settings.url.clone(), name);
        match context {
            Some(c) => from_str(&post(&self.settings, path, c)).unwrap(),
            None =>  from_str(&post(&self.settings, path, String::from("{}"))).unwrap()
        }
    }

    pub fn feature_tree(&self, pattern: &str, context: Option<String>) -> Value {                
        let path = format!("{}/api/tree/features?pattern={}", &self.settings.url.clone(), pattern);
        match context {
            Some(c) => from_str(&post(&self.settings, path, c)).unwrap(),
            None =>  from_str(&post(&self.settings, path, String::from("{}"))).unwrap()
        }
    }

    pub fn toggle_feature(&self, name: &str, value: &bool)-> Value {                
        let path = format!("{}/api/features/{}", &self.settings.url.clone(), name);
        let json_patch = json!([{ "op": "replace", "path": "/enabled", "value": value }]);
        from_str(&patch(&self.settings, path, json_patch.to_string())).unwrap()
    }

    pub fn get_config_tree(&self, pattern: &str) -> Value {                
        let path = format!("{}/api/tree/configs?pattern={}", &self.settings.url.clone(), pattern);    
        from_str(&get(&self.settings, path)).unwrap()            
    }

    pub fn get_config(&self, name: &str) -> Value {                
        let path = format!("{}/api/configs/{}", &self.settings.url.clone(), name);    
        from_str(&get(&self.settings, path)).unwrap()            
    }

    pub fn create_config(&self, config: Value) -> Value {                
        let path = format!("{}/api/configs", &self.settings.url.clone());        
        from_str(&post(&self.settings, path, config.to_string())).unwrap()            
    }

    pub fn update_config(&self, name: &str, config: Value) -> Value {                
        let path = format!("{}/api/configs/{}", &self.settings.url.clone(), name);        
        from_str(&put(&self.settings, path, config.to_string())).unwrap()            
    }

}
