import axios from "axios";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const APIKEY = "4c46532eff9c445bb8d27d0474daf841";

export default {
  // Gets all saved Articles from MongoDB
  getArticles: function() {
    return axios.get("/api/articles");
  },
   // Saves an Article to the database
   saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Gets the Article from the database with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the Article from the database with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  //Searches the NYT API for articles
  search: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  }
};

//`*` (get) - will load your single HTML page (with ReactJS)
// in `client/build/index.html`. Make sure you put this after all other GET routes