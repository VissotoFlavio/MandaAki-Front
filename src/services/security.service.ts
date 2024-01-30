import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa';

const ENCRYPTION_KEY = '$Y@p28DlXvGRmVJT';
const ENCRYPTION_KEY_CLIENT_SIDE = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCg4I4c1XLLC3KNdYFQIm68xlwY
pzp5RZZDgKC2c88CcUR586a6k5VB79GoM6H3+bLew4/6DPGTBnNzoF0cvLCA5tDL
ypD2EDcqb1YAy3xKYYhGM4S75nahPQ/rENtvahL+GKnUax2YI5m7lgVds8KBNGkC
5JvKNElUpGID7/2RFQIDAQAB
-----END PUBLIC KEY-----`;

export const encrypt = <T>(value: T): string => {
  const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), ENCRYPTION_KEY).toString();
  return encryptedValue;
};

export const decrypt = <T>(encryptedValue: string): T => {
  const bytes = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_KEY);
  const decryptedValue = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) as T;
  return decryptedValue;
};

export const encryptClientSide = (value: string) => {
  const key = new NodeRSA(ENCRYPTION_KEY_CLIENT_SIDE);
  const cipherText = key.encrypt(value, 'base64');
  return cipherText;

  // const iv = CryptoJS.lib.WordArray.random(16);
  // const cipherText = CryptoJS.AES.encrypt(value, 'HR$2pIjHR$2pIj12', { iv }).toString();
  // return iv.concat(CryptoJS.enc.Utf8.parse(cipherText)).toString(CryptoJS.enc.Base64);
};
