import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {GetMenu}
  function GetMenu(e){
    return axios.get(baseUrl + '/store/'+e+'/getAllMenu')
  }
