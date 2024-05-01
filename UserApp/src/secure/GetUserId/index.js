import * as SecureStore from 'expo-secure-store';

export const getUserId = async () => {
    return await SecureStore.getItemAsync('userId');
};

export const getUserName = async () => {
    return await SecureStore.getItemAsync('userName');
};