import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {OrderRequest}
  function OrderRequest(items){
    return axios.post(baseUrl + '/store/makeVisitorOrder',{
      items: items
    }
  )
  }
