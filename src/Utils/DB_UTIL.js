
const API_URL = "http://localhost:3001/";


exports.sign_up = ()=>
{
	e.preventDefault();
	fetch(API_URL+"signup",{
		method: 'POST',
		body: JSON.stringify({
		firstParam: 'yourValue',
		secondParam: 'yourOtherValue',
		})
	})
	
}