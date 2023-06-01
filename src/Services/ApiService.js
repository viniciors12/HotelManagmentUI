export default class ApiService {
    async makeRequest(baseUrl, endpoint, options, idToken) {
      const url = `${baseUrl}/${endpoint}`;
      const headers = {
        'Authorization' : `Bearer ${idToken}`
      };
      options.headers = headers;
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
  
    async Get(baseUrl, endpoint, idToken) {
      const options = {
        method: 'GET',
        'Content-Type': 'application/json',
      };
      return this.makeRequest(baseUrl, endpoint, options, idToken);
    }
  
    async Post(baseUrl, endpoint, body) {
      // var data = new FormData();
      const options = {
        method: 'POST',
        'Content-Type': 'multipart/form-data',
        body: this.getFormData(body)
      };
      return this.makeRequest(baseUrl ,endpoint, options, body.idToken);
    }

    getFormData(obj)
    {
      const formData = new FormData();  
      Object.keys(obj).forEach((key)=> obj[key] && formData.append(key, obj[key]))
      return formData;
    }
  }