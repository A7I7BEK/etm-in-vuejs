// @ts-nocheck
import $router from '../router';
import $store from "../store";



export function clearProfile() {
    $store.state.userProfile = null;
    $store.state.systemAdmin = false;
    $store.state.permissionList = [];

    $router
        .push({ name: 'authLogin' })
        .catch(err => {
            console.log(err.name);
        });
}