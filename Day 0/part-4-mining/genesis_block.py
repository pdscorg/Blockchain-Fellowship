import hashlib
import datetime
from datetime import timezone, datetime
from transaction import Transaction

genesis_date = datetime(year=2022, month=6, day=21)
genesis_timestamp = genesis_date.replace(tzinfo=timezone.utc).timestamp()
genesis_string = 'Genesis Block For Our Class Representative'
genesis_transaction = Transaction(doer='Sagar', copier='Sagar', words=500)

class GenesisBlock:
    def __init__(self) -> None:
        self.timestamp = genesis_date
        self.hash = hashlib.sha256(genesis_string.encode('utf-8')).hexdigest()
        self.previous_hash = None
        self.transactions = genesis_transaction
    
    def to_dict(self):
        return {
            "timestamp": self.timestamp,
            "transactions": genesis_transaction.to_dict(),
            "hash": self.hash
        }
        pass