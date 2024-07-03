import * as SecureStore from 'expo-secure-store';

export const storeUserId = async (userId) => {
    await SecureStore.setItemAsync('userId', '' + userId + '');
};

export const storeUserName = async (userName) => {
    await SecureStore.setItemAsync('userName', userName);
};

export const storeUserAdress = async (userAddress) => {
    await SecureStore.setItemAsync('userAddress', userAddress)
}

export const storeUserEmail = async (userEmail) => {
    await SecureStore.setItemAsync('userEmail', userEmail)
}

export const storeUserContactPhone = async (userContactPhone) => {
    await SecureStore.setItemAsync('userContactPhone', userContactPhone)
}

export const storeUserCpf = async (userCpf) => {
    await SecureStore.setItemAsync('userCpf', userCpf)
}