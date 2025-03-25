// @ts-nocheck
import $i18n from "../plugins/vue-i18n-config";
import { langSet } from '../services/LanguageService';
import $store from "../store";



export function setProfile(data) {
    $store.state.userProfile = data;
    $store.state.permissionList = [
        ...new Set(
            data.roles
                .flatMap(role => role.permissions)
                .map(perm => perm.codeName)
        )
    ];

    $i18n.locale = data.language.code;
    langSet(data.language.code);
}