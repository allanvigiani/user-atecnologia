import * as SecureStore from 'expo-secure-store';

export const storeUserId = async (userId) => {
    await SecureStore.setItemAsync('userId', ''+userId+'');
};

export const storeUserName = async (userName) => {
    await SecureStore.setItemAsync('userName', userName);
};