const fetch = require('node-fetch');
const Headers = fetch.Headers;

class RestRepository {
  /**
   * @param {string} apiUrl URL base da API
   * @param {string} resourcePath caminho do resource iniciando com '/'
   */
  constructor(apiUrl, resourcePath) {
    this.apiUrl = apiUrl;
    this.resourcePath = resourcePath;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    this.defaultOptions = { headers };
  }

  get apiEndpoint() {
    return `${this.apiUrl}${this.resourcePath}`;
  }

  async list() {
    const res = await fetch(this.apiEndpoint, { ...this.defaultOptions });
    return res.json();
  }

  async getById(id) {
    const url = `${this.apiEndpoint}/${id}`;
    const res = await fetch(url, { ...this.defaultOptions });
    return res.json();
  }

  async insert(obj) {
    const res = await fetch(this.apiEndpoint, {
      ...this.defaultOptions,
      method: 'POST',
      body: JSON.stringify(obj)
    });
    return res.json();
  }

  async update(id, obj) {
    const url = `${this.apiEndpoint}/${id}`;

    const res = await fetch(url, {
      ...this.defaultOptions,
      method: 'PATCH',
      body: JSON.stringify(obj)
    });
    return res.json();
  }

  async delete(id) {
    const url = `${this.apiEndpoint}/${id}`;
    const res = await fetch(url, {
      ...this.defaultOptions,
      method: 'DELETE'
    });
    return res.json();
  }
}

module.exports = RestRepository;