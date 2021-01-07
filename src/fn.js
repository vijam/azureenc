const crypto = require("crypto");


const keyapair = async () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });
  return { privateKey, publicKey };
};

const encrypt = async (data) => {
  const pbkey = process.env.publicKey
  const buffer = Buffer.from(data.formvalue, "utf8");
  const encrypted = crypto.publicEncrypt(pbkey, buffer);
  return encrypted.toString("base64");
};

const decrypt = async (data) => {
  let prkey = process.env.privateKey;
  const buffer = Buffer.from(data.formvalue, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: prkey.toString(),
      passphrase: "",
    },
    buffer
  );
  return decrypted.toString("utf8");
};

const final = async (PublicKey, PrivateKey) => {
  const enc = await encrypt("hello", PublicKey);
  console.log("encryption:", enc);
  const dec = await decrypt(enc, PrivateKey);
  console.log("decryption:", dec);
};

module.exports = {
    keyapair,
    encrypt,
    decrypt,
    final
}
