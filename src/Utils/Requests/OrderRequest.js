import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {OrderRequest}
  function OrderRequest(name,items,destination,phone_number){
    return axios.post(baseUrl + '/store/makeVisitorOrder',{
      name: name,
      items: items,
      destination: destination,
      phone_number: phone_number
    }
  )
  }

  export {customerOrder}
    function customerOrder(name,items,destination,phone_number){
      return axios.post(baseUrl + '/customer/makeOrder',{
        store_name: name,
        items: items,
        destination: destination,
        phone_number: phone_number
      }
    )
    }
