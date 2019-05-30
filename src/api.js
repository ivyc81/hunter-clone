import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/*
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class apiHelper {

  static async getResource(resource) {
    const result = await axios.get(`${BASE_API_URL}/${resource}`);
    return result.data;
  }

  static async addResource(resource, data) {
    const result = await axios.post(`${BASE_API_URL}/${resource}`, data);
    return result.data;
  }

  static async deleteResource(resource, index) {
    const result = await axios.delete(`${BASE_API_URL}/${resource}/${index}`);
    return result.data;
  }
}

export default apiHelper;
