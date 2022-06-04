import crypto from 'crypto'
import { queryVault } from './apivault'
import fs from 'fs'

const AES_VAULT_URI = process.env.AES_VAULT_URI || ""
console.log("AES_VAULT_URI: ", AES_VAULT_URI);
const ALGORITHM = 'aes-256-cbc'

export const encryptAndSaveFile = async (file: Buffer, path: string) => {
    console.log("File to encrypt: ", file);
    const  keys: any  = await queryVault(AES_VAULT_URI)
    
    let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(keys.key,"base64"), Buffer.from(keys.iv, "base64"));
    let encrypted = cipher.update(file);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    fs.writeFileSync(path, encrypted)
    return encrypted

}

export const decryptFile = async (path: string) => {
    const  keys: any  = await queryVault(AES_VAULT_URI)
    
    const fileEncrypted = fs.readFileSync(path)
    console.log("File to decrypt: ", fileEncrypted);
    
    let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(keys.key,"base64"), Buffer.from(keys.iv, "base64"));
    let decrypted = decipher.update(fileEncrypted);

    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted
}
