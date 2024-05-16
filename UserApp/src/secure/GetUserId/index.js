import * as SecureStore from 'expo-secure-store';

export const getUserId = async () => {
    return await SecureStore.getItemAsync('userId');
};

export const getUserName = async () => {
    return await SecureStore.getItemAsync('userName');
};

export const getUserAddress = async () => {
    return await SecureStore.getItemAsync('userAddress');
}

export const getUserEmail = async () => {
    return await SecureStore.getItemAsync('userEmail');
}

export const getUserContactPhone = async () => {
    return await SecureStore.getItemAsync('userContactPhone');
}