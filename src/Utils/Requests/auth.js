import axios from 'axios';

const baseUrl = "http://localhost:3001";

export {signUp}
  function signUp(email,password,typeOfUser, name, store_affiliated_with){
    return axios.post(baseUrl + '/signup',{
      email: email,
      password : password,
      typeOfUser : typeOfUser,
      name: name,
      store_affiliated_with: store_affiliated_with
    })
  }
