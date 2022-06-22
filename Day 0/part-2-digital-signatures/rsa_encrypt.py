from inspect import signature
import rsa
from transaction import Transaction

public_key_bob, private_key_bob = rsa.newkeys(512)
public_key_alice, private_key_alice = rsa.newkeys(512)

tx = Transaction(doer='Supriya', copier='Ranju', words=300)

# signature method
tx_hash = tx.hash.encode('utf-8')
signature = rsa.sign(tx_hash, private_key_bob, 'SHA-1')
print(rsa.verify(tx_hash, signature, public_key_alice) == 'SHA-1')

# good old encryption-decryption
# encrypt tx hash with private_key_1
cipher_text = rsa.encrypt(tx.hash.encode('utf-8'), private_key_bob)

# decrypt encrypted key
decrypted_tx_hash = rsa.decrypt(cipher_text, public_key_bob)

print("Original Transaction Hash:", tx.hash)
print("Encrypted Text", cipher_text)
print("Decrypted Text", decrypted_tx_hash)