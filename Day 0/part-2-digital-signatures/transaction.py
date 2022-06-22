import time
import hashlib # library used to hash the transaction

# to be understood as assignment
# the copier owes the doer 'x' number of words
class Transaction:
    def __init__(self, doer:str, copier:str, words:int) -> None:
        self.timestamp = time.time() 
        self.doer = doer
        self.copier = copier
        self.words = words 
        self.hash = self.calculate_hash() # store a unique hash for each transaction to identify it

    def calculate_hash(self) -> str:
        transaction_string = str(self.timestamp) + str(self.doer) + str(self.copier) + str(self.words)
        return hashlib.sha256(transaction_string.encode('utf-8')).hexdigest() # use the sha256 hashing algorithm

    def sign(self) -> str:
        pass

    def __str__(self) -> str:
        return f'Assignment Doer: {self.doer}\nAssignment Copier: {self.copier}\nWords: {self.words}\nTimestamp: {self.timestamp}\nHash: {self.hash}'

    def to_dict(self) -> dict:
        return {
            "timestamp": self.timestamp,
            "doer": self.doer,
            "copier": self.copier,
            "words": self.words,
            "hash": self.hash
        }