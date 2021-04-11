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
    return Promise.reject(err);
});

export default api;