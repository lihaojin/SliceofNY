import axios from 'axios';
import jwt from 'jsonwebtoken';

const baseUrl = "http://localhost:3001";

axios.interceptors.request.use((config)=>{  
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


export {addRecipe}
async function addRecipe(name,price,description)
{
  const token = localStorage.getItem('token');
  const decoded = await jwt.decode(token);
  console.log(decoded)
  
  return axios.post(baseUrl+'/chef/addRecipe',{
    "email": decoded.email,
    "recipe":
    {
        "name":name,
        "price":price,
        "description":description
    }
  })

}
  