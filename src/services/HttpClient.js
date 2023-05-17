import axios from 'axios';

class HttpClient {
    base_url = ''

    constructor() {
        this.base_url = 'http://localhost/react-demo/todo-app/public/api/'
    }

    generateHeader() {
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data;",
            "Accept" : "application/json",
            "Authorization": "Bearer 2|AAcAk2PDiSOF3AgM7fhTAAdj0YNhsbRfiGS92ybV"
          }
        };
        return headers;
    }

    async tasks() {
        return await axios.get(this.base_url + `tasks`, this.generateHeader());
    }

    async addTask(body) {
        return await axios.post(this.base_url + `post`, body, this.generateHeader())
    }
}

export default new HttpClient();