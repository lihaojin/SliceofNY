import axios from 'axios';
import jwt from 'jsonwebtoken';

const baseUrl = "http://localhost:3001";

axios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})



export {getMenuStore}
async function getMenuStore()
{
  const token = localStorage.getItem('token');
  const decoded = jwt.decode(token);

  const storeName = await axios.get(baseUrl+'/manager/getStoreName');
  
  return axios.get(baseUrl+'/store/'+storeName.data+'/getAllMenu');

}


export {changePriceManager}
function changePriceManager(id,new_price)
{
  return axios.post(baseUrl+'/manager/changePrice',
    {
        "id":id,
        "new_price":new_price
    }
  )

}

export {getAllRegisteredCustomers}
function  getAllRegisteredCustomers()
{
  return axios.get(baseUrl+'/manager/getAllRegisteredCustomers');
}

export {getAllPendingCustomers}
function  getAllPendingCustomers()
{
  return axios.get(baseUrl+'/manager/getAllPendingCustomers');
}


export {getAllBlacklistedCustomers}
function  getAllBlacklistedCustomers()
{
  return axios.get(baseUrl+'/manager/getAllBlacklistedCustomers');
}



export{approveCustomer}
function approveCustomer(email)
{
  return axios.post(baseUrl+'/manager/approveCustomer',{
    "email":email
  })

}


export{blacklistCustomer}
function blacklistCustomer(email)
{
    return axios.post(baseUrl+'/manager/blacklistCustomer',{
    "email":email
  })
}

export{getDelivery}
function getDelivery()
{
  return axios.get(baseUrl+'/delivery/getAll');
}

export{sendDeliveryOrder}
function sendDeliveryOrder(email)
{
  return axios.get(baseUrl+'/manager/makeDelivery/'+email);
}

export{getStore}
function getStore()
{
  return axios.get(baseUrl+'/store/getAllStore');
}

export{getMyInfo}
function getMyInfo()
{
  return axios.get(baseUrl+'/manager/getMyInfo');
}

export{handleComplaint}
function handleComplaint(id)
{
  return axios.post(baseUrl+'/manager/handleComplaint',{
    "id":id
  })
}


// This is for customer. I didn't wanted to create new file so I placed it here.
export {sendComplaint}
function sendComplaint(name,complaint)
{
  return axios.post(baseUrl+'/customer/sendComplaint',{
    "name":name,
    "complaint":complaint
  });
}


export{getMyStoreInfo}
function getMyStoreInfo()
{
  return axios.get(baseUrl+'/manager/getMyStoreInfo');
}


export{payDelivery}
function payDelivery(email,amount)
{
  return axios.post(baseUrl+'/manager/payDelivery',{  
    "email":email,
    "amount":amount
  })
}

export{getChef}
function getChef()
{
  return axios.get(baseUrl+'/manager/getMyChefs')
}


export{payChef}
function payChef(email,amount)
{
  return axios.post(baseUrl+'/manager/payChef',{  
    "email":email,
    "amount":amount
  })
}