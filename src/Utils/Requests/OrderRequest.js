import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {OrderRequest}
  function OrderRequest(name,items,destination){
    return axios.post(baseUrl + '/store/makeVisitorOrder',{
      name: name,
      items: items,
      destination: destination
    }
  )
  }
