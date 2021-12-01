using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using AgendaEventos.Interfaces.Security;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace AgendaEventos.Services.Security
{
    public class PasswordService : IPassword
    {

        // public string Encrypt(string password)
        // {
        //     // generate a 128-bit salt using a cryptographically strong random sequence of nonzero values
        //     byte[] salt = new byte[128 / 8];
        //     using (var rngCsp = new RNGCryptoServiceProvider())
        //     {
        //         rngCsp.GetNonZeroBytes(salt);
        //     }
        //     // Console.WriteLine($"Salt: {Convert.ToBase64String(salt)}");

        //     // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
        //     string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
        //         password: password,
        //         salt: salt,
        //         prf: KeyDerivationPrf.HMACSHA256,
        //         iterationCount: 100000,
        //         numBytesRequested: 256 / 8));

        //     return hashed;
        //     // Console.WriteLine($"Hashed: {hashed}");
        // }
        public string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}