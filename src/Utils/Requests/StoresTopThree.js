import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {TopThree}
  function TopThree(){
    return axios.get(baseUrl + 'getTop')
  }
