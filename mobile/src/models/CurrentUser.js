import { AsyncStorage } from 'react-native';
import { types, flow } from 'mobx-state-tree';
import { customersApi } from '../api/Api';
import { NavigationService } from '../api/NavigationServices';


const TOKEN_KEY = '@estore/token'

const UserInfo = types.model('UserInfo', {
    _id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    avatarUrl: types.maybe(types.string)
})

export const CurrentUser = types.model('CurrentUser', {
    authToken: types.maybe(types.string),
    info: types.maybe(UserInfo),
}).actions(self => ({
    setupAuth: flow(function*() {
        yield self.getAuthToken();
        yield self.getUserInfo();
    }),

    saveToken: flow(function*(token) {
        try {
            yield AsyncStorage.setItem(TOKEN_KEY, token)
        } catch(err) {
            console.log('error saveToken', err)
        }
    }),

    getAuthToken: flow(function*() {
        try {
            const token = yield AsyncStorage.getItem(TOKEN_KEY);

            console.log('getAuthToken', token);

            if(token) {
                self.authToken = token;
            } else {
                NavigationService.navigate('Auth');
            }

        } catch (error) {
            console.log('error getAuthToken', error);
        }
    }),

    login: flow(function*(providerToken, provider) {
        console.log("providerToken ", providerToken);
        try {
            const res = yield customersApi
                .post({
                    token: providerToken,
                    provider
                })
                .json()

            if(res.token) {
                self.authToken = res.token;
                yield self.saveToken(res.token);
                yield self.getUserInfo()
            }
        } catch (error) {
            console.log("error login", error);
        }
    }),

    getUserInfo: flow(function*() {
        try {
            if(self.authToken) {
                const res = yield customersApi.url('/me')
                    .headers({ Authorization: `Bearer ${self.authToken}`})
                    .get()
                    .json()

                console.log("Result from getUserInfo", res)    ;
                self.info = res
                
                NavigationService.navigate('Main');
            }
        } catch (error) {
            console.log('error getUserInfo', error)
        }
    })

}))