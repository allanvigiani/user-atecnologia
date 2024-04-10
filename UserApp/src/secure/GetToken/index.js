import * as SecureStore from 'expo-secure-store';

export const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
};