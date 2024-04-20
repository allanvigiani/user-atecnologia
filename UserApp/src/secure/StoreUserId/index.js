import * as SecureStore from 'expo-secure-store';

export const storeUserId = async (userId) => {
    await SecureStore.setItemAsync('userId', ''+userId+'');
};