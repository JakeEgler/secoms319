import axios from 'axios';
src="https://unpkg.com/axios/dist/axios.min.js";

const weather='http://localhost:3000/weather';
const history='http://localhost:3000/history'

axios.get(weather)
  .then(data=>console.log(data))
  .catch(err=>console.log(err))