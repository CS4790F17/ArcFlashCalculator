using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Security.Cryptography;

namespace ArcFlashCalculator.Security
{
    public class Encrypter
    {
        public static string ComputeHash(string password, byte[] saltBytes)
        {
            //Generate saltBytes
            if (saltBytes == null)
            {
                //Define min and max salt size
                int minSaltSize = 4;
                int maxSaltSize = 8;

                //Generate a random number for the size of salt
                Random random = new Random();
                int saltSize = random.Next(minSaltSize, maxSaltSize);

                //Allocate a byte array, which will hold the salt
                saltBytes = new byte[saltSize];

                //Initialize a random number generator
                RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();

                //Fill the salt with cryptographically strong byte values
                rng.GetNonZeroBytes(saltBytes);
            }          

            //Convert password int a byte array
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            //Allocate array, which will hold password and salt
            byte[] passwordWithSaltBytes = new byte[passwordBytes.Length + saltBytes.Length];

            //Copy password bytes int resulting array
            for (int i = 0; i < passwordBytes.Length; i++)
            {
                passwordWithSaltBytes[i] = passwordBytes[i];
            }

            //Append salt bytes to the resulting array
            for (int i = 0; i < saltBytes.Length; i++)
            {
                passwordWithSaltBytes[passwordBytes.Length + i] = saltBytes[i];
            }

            //Initialize hash algorithm class
            HashAlgorithm hash = new SHA1Managed();

            //Compute hash value of our password with appended salt
            byte[] hashBytes = hash.ComputeHash(passwordWithSaltBytes);

            //Create array which will hold hash and original salt bytes
            byte[] hashWithSaltBytes = new byte[hashBytes.Length + saltBytes.Length];

            //Copy hash bytes into resulting array
            for (int i = 0; i < hashBytes.Length; i++)
            {
                hashWithSaltBytes[i] = hashBytes[i];
            }

            //Append salt bytes to the result
            for (int i = 0; i < saltBytes.Length; i++)
            {
                hashWithSaltBytes[hashBytes.Length + i] = saltBytes[i];
            }

            string hashValue = Convert.ToBase64String(hashWithSaltBytes);

            return hashValue;
        }

        public static bool VerifyHash(string password, string hashValue)
        {
            //Covnert base64-encoded hash value into a byte array
            byte[] hashWithSaltBytes = Convert.FromBase64String(hashValue);

            //We must know the size of hash (without salt). Using SHA1
            int hashSizeInBits = 160;
            int hashSizeInBytes = hashSizeInBits / 8;

            //Make sure that the specified hash value is long enough
            if (hashWithSaltBytes.Length < hashSizeInBytes)
            {
                return false;
            }

            //Allocate array to hold original salt bytes retrieved from hash
            byte[] saltBytes = new byte[hashWithSaltBytes.Length - hashSizeInBytes];

            //Copy salt from the end of the hash to the new array
            for (int i = 0; i < saltBytes.Length; i++)
            {
                saltBytes[i] = hashWithSaltBytes[hashSizeInBytes + i];
            }

            //Compute a new hash string
            string expectedHashString = ComputeHash(password, saltBytes);

            //If the computed hash matches the specified hash, the plain text value must be correct
            return (hashValue == expectedHashString);
        }
    }
}