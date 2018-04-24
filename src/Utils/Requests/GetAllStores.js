import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {GetAllStores}
  function GetAllStores(){
    return axios.get(baseUrl + '/store/getAllStore')
  }
