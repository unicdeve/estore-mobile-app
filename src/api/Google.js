import Constants from 'expo-constants';
import * as Google from 'expo-google-app-auth';

const scopes = ['profile', 'email'];

const loginAsync = async () => {
    try {
        const result = await Google.logInAsync({
            androidClientId: "735641558661-0on7r295s7qi8k89fras7enjklosfaor.apps.googleusercontent.com",
            iosClientId: "735641558661-ke6v5a4fnveigtoeth7q9ur5djr1spai.apps.googleusercontent.com",
            scopes
        });

        if(result.type === 'success') return Promise.resolve(result.accessToken);

        return Promise.reject("No success");
    } catch (e) {
        return Promise.reject(e);
    }
};

export const GoogleApi = {
    loginAsync
}