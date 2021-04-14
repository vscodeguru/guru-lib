import * as CryptoJS from 'crypto-js';
export class CrazyKey {
  private static get asciiGuru(): ({ key: string, val: number })[] {
    return [
      {
        key: 'A',
        val: 13
      },
      {
        key: 'B',
        val: 12
      },
      {
        key: 'C',
        val: 2
      },
      {
        key: 'D',
        val: 15
      },
      {
        key: 'E',
        val: 11
      },
      {
        key: 'F',
        val: 3
      },
      {
        key: 'G',
        val: 9
      },
      {
        key: 'H',
        val: 18
      },
      {
        key: 'I',
        val: 14
      },
      {
        key: 'J',
        val: 26
      },
      {
        key: 'K',
        val: 16
      },
      {
        key: 'L',
        val: 17
      },
      {
        key: 'M',
        val: 19
      },
      {
        key: 'N',
        val: 1
      },
      {
        key: 'O',
        val: 4
      },
      {
        key: 'P',
        val: 25
      },
      {
        key: 'Q',
        val: 6
      },
      {
        key: 'R',
        val: 20
      },
      {
        key: 'S',
        val: 8
      },
      {
        key: 'T',
        val: 22
      },
      {
        key: 'U',
        val: 7
      },
      {
        key: 'V',
        val: 24
      },
      {
        key: 'W',
        val: 10
      },
      {
        key: 'X',
        val: 21
      },
      {
        key: 'Y',
        val: 23
      },
      {
        key: 'Z',
        val: 5
      }
    ];
  }
  private static readonly cryptonOption = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse('podaparathesino1')
  };
  private static genCrazyKey(isSuffix: boolean): string {
    const alpha = this.genRandomChar(1);
    const random = this.asciiGuru.find(i => i.key === alpha.toUpperCase())?.val || 0;
    const key = (isSuffix ? '' : alpha) + this.genRandomChar(random) + (isSuffix ? alpha : '');
    return key;
  }

  private static genRandomChar(length: number): string {
    let result = '';
    const characters = 'LZwIepmPBoknUSNOQDqfRigjlEvKbxAsFtMHrVuCcdWhYGyTJaXz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public static encode(key: string): string {
    try {
      return CrazyKey.genCrazyKey(false) + key + CrazyKey.genCrazyKey(true);
    } catch (error) {
      return '';
    }
  }

  public static decode(key: string): string {
    try {
      const preAlpha = key.charAt(0);
      const preNum = (this.asciiGuru.find(i => i.key === preAlpha.toUpperCase())?.val || 0) + 1;

      const sufAlpha = key.charAt(key.length - 1);
      const sufNum = (this.asciiGuru.find(i => i.key === sufAlpha.toUpperCase())?.val || 0) + 1;

      const startIdx = preNum;
      const endIdx = ((key.length - preNum) - sufNum);

      const orgKey = key.substr(startIdx, endIdx);
      return orgKey;
    } catch (error) {
      return '';
    }
  }
  public static aes_encryption(value: string, privatekey: string): string {
    try {
      const plainText = CryptoJS.enc.Utf8.parse(value.trim());
      const key = CryptoJS.enc.Utf8.parse(privatekey.trim());
      const encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.MD5(key), this.cryptonOption).toString();
      return encrypted.replace(/\+/g, '__').replace(/\//g, '@@');
    } catch (error) {
      return '';
    }
  }
  public static aes_decryption(value: string, privatekey: string): string {
    try {
      value = value.replace(/__/g, '+').replace(/@@/g, '/');
      const encryptedText = value.trim();
      const key = privatekey.trim();
      const md5Key = CryptoJS.MD5(key);
      const decrypted = CryptoJS.AES.decrypt(encryptedText, md5Key, this.cryptonOption).toString(CryptoJS.enc.Utf8);
      return decrypted;
    } catch (error) {
      return '';
    }
  }
  public static hash(value: string, privatekey: string): string {
    return CryptoJS.HmacSHA1(value, privatekey).toString(CryptoJS.enc.Hex);
  }
}
