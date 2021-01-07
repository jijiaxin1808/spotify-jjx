import Vue from 'vue'
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance;
    }
}

declare module '*.vue' {
    export default Vue
}