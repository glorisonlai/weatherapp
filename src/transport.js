const { post } = require("../server/app");

const Transport = {
  async post(path, data) {
    const url = this.prepareUrl(path);

    const response = await window.fetch(url, {
      method: 'POST', 
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify
    })
  }
}