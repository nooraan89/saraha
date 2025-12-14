import CryptoJS from"crypto-js";
export const decrypt =({data,signuture})=>{CryptoJS.AES.decrypt(data,signuture).toString(CryptoJS.enc.Utf8);}
export const encrypt=({data,signuture})=>{CryptoJS.AES.encrypt(data, signuture).toString();}