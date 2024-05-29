import * as SecureStore from 'expo-secure-store';

export const deleteToken = async () => {
    await SecureStore.deleteItemAsync('userToken');
};