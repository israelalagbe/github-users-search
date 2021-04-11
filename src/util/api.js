import Axios from "axios";
import { showLoadingBar, hideLoadingBar } from "./loadingBar";


const token = process.env.REACT_APP_GITHUB_API_KEY;


const api = Axios.create({
    withCredentials: false,
    headers: {
        Authorization: `Bearer ${token}`
    }
});

//Middleware for request
api.interceptors.request.use(function (config) {
    showLoadingBar()
    return config;
}, function (error) {
    hideLoadingBar()
    // Do something with request error
    return Promise.reject(error);
});

//Middleware for response
api.interceptors.response.use(function (response) {
    hideLoadingBar();
    return response.data;
}, function (err) {
    hideLoadingBar();

    if (!err.response) {
        return Promise.reject(new Error('Error occured while sending the request, please check your internet settings'));
    }
    
    if (err.response.status === 404) {
        return Promise.reject(new Error('No search results found!'));
    }

    return Promise.reject(new Error(err.response.data.message));
});


export default api;