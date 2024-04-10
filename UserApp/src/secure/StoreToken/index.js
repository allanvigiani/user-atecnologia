import * as SecureStore from 'expo-secure-store';

export const storeToken = async (token) => {
    await SecureStore.setItemAsync('userToken', token);
};