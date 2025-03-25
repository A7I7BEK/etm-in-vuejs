// @ts-nocheck
import $router from '../router';
import $store from "../store";



export function clearProfile() {
    $store.state.userProfile = {};
    $store.state.permissionList = [];

    $router.push({ name: 'authLogin' });
}