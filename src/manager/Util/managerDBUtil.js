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
<<<<<<< HEAD
async function changePriceManager(id,new_price)
=======
function changePriceManager(id,new_price)
>>>>>>> 53288fd3388695612baa8f4bc078ebeb950d9fd9
{
  return axios.post(baseUrl+'/manager/changePrice',
    {
        "id":id,
        "new_price":new_price
    }
  )

}
<<<<<<< HEAD
=======

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
>>>>>>> 53288fd3388695612baa8f4bc078ebeb950d9fd9
