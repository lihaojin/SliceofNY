import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {StoresTopThree}
  function StoresTopThree(){
    return axios.get(baseUrl + '/store/getTop')
  }
