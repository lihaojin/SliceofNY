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


