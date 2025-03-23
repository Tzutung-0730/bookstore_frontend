// src/services/ApiService.js

const getAuthToken = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  };
  
export const ApiService = {
  async request(url, method = 'GET', data = null, auth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (auth) {
      const token = getAuthToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      method,
      headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('Content-Type');

      let result;
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      if (!response.ok) {
        throw {
          status: response.status,
          message: result?.message || 'API Error',
          data: result,
        };
      }

      return result;
    } catch (error) {
      console.error('APIService Error:', error);
      throw error;
    }
  },

  get(url, auth = false) {
    return this.request(url, 'GET', null, auth);
  },

  post(url, data, auth = false) {
    return this.request(url, 'POST', data, auth);
  },

  put(url, data, auth = false) {
    return this.request(url, 'PUT', data, auth);
  },

  delete(url, auth = false) {
    return this.request(url, 'DELETE', null, auth);
  },
};

export default ApiService;