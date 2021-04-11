import Axios from "axios";
import {
    showLoading,
    hideLoading
} from "react-redux-loading-bar";

function showLoadingBar() {
    import('../store/index').then((store) => {
        store.default.dispatch(showLoading());
    });
}

function hideLoadingBar() {
    import('../store/index').then((store) => {
        store.default.dispatch(hideLoading());
    });
}

const api = Axios.create({
    withCredentials: false,
});
api.interceptors.request.use(function (config) {
    showLoadingBar()
    return config;
}, function (error) {
    hideLoadingBar()
    // Do something with request error
    return Promise.reject(error);
});

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