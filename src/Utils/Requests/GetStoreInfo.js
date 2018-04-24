import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {GetMenu}
  function GetMenu(){
    return axios.get(baseUrl + '/store/Batman/getAllMenu')
  }
