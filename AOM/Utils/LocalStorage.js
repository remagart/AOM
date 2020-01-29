import AsyncStorage from "@react-native-community/async-storage";

export default class LocalStorage {
    static getKey(){
        return AsyncStorage.getItem(key);
    }

    static saveKey(key,value){
        return AsyncStorage.setItem(key,value);
    } 

    static resetKey(key){
        return AsyncStorage.removeItem(key);
    }
}