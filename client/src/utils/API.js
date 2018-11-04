import axios from "axios";

const BASEURL = "https://www.omdbapi.com/?t=";
const APIKEY = "&apikey=trilogy";

export default {
  // Gets all Articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the Article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};
