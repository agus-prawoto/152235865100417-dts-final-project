import axios from 'axios';

const API_KEY = '22ebcc31f7c645b4ab8baa53f7edd22a';
// const baseUrl = 'https://newsapi.org/v2/';
const baseUrl = 'https://codeliro.com/newsapi.php?url=https://newsapi.org/v2/';

const newsapi = axios.create({
  baseURL: baseUrl,
  params: {
    api_key: API_KEY,
  },
});

export default newsapi;
