import { API_TOKEN, API_URL } from "./urls";

export const fetchDataFromApi =async (endpoint)=>{
    const option ={
        method:'GET',
        headers:{
            Authorization:"Bearer " + API_TOKEN
        }
    };
    const res = await fetch(`${API_URL}${endpoint}`, option);
    const data = await res.json();
    return data;
};

export const makePaymentRequest = async (endpoint,payload)=>{
    const res = await fetch(`${API_URL}${endpoint}`,{
        method:'POST',
        headers:{
            Authorization:"Bearer " + API_TOKEN,
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(payload)
    });
    const data =await res.json()
    return data;
}