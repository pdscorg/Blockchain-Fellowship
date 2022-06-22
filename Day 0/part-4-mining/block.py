import time
import hashlib
from typing import List

from transaction import Transaction

# block holds transactions i.e. list of assignment details
class Block:
    def __init__(self, pending_transactions: List[Transaction]) -> None:
        self.timestamp = time.time() 
        self.transactions = pending_transactions # transactions that have yet to be added to a block
        self.hash = None 
        self.previous_hash = None
        self.nonce = -1

    def mine_block(self, difficulty: int) -> None:
        nonce = 0 # change block hash by incrementing nonce
        while True:
            self.calculate_hash(nonce)
            # print(f"nonce: {nonce}, hash: {self.hash}") # printed current hash for aesthetic, not required
            hash_substring = self.hash[0:difficulty] # gets first n hex digits of hash equal to difficulty
            leading_zeros = '0' * difficulty
            if hash_substring == leading_zeros:
                self.nonce = nonce
                break
            nonce += 1
        
    def calculate_hash(self, nonce: int) -> str:
        block_string = str(self.timestamp) + str(self.previous_hash) + str(nonce)

        # linearly combine transaction hashes into one common string
        for transaction in self.transactions:
            block_string += str(transaction)

        self.hash = hashlib.sha256(block_string.encode('utf-8')).hexdigest()
        return self.hash
    
    def to_dict(self):
        return {
            "hash": self.hash,
            "nonce": self.nonce,
            "timestamp": self.timestamp,
            "transactions": [transaction.to_dict() for transaction in self.transactions],
            "hash": self.hash
        }
