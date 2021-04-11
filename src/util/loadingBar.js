import {
    showLoading,
    hideLoading
} from "react-redux-loading-bar";

export function showLoadingBar() {
    import('../store/index').then((store) => {
        store.default.dispatch(showLoading());
    });
}

export function hideLoadingBar() {
    import('../store/index').then((store) => {
        store.default.dispatch(hideLoading());
    });
}
