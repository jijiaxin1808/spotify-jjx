import Vue from 'vue'
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance;
    }
}

declare global {
    interface Window {
        jjxTest: string,
        onSpotifyWebPlaybackSDKReady: any,
        Spotify: any
    }
    interface res {
        deviceId: string
    }
}


