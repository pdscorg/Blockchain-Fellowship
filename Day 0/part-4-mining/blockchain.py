from block import Block
from genesis_block import GenesisBlock
from transaction import Transaction

class Blockchain:     
    def __init__(self) -> None:
        self.genesis_block = GenesisBlock()
        self.blocks = {self.genesis_block.hash: self.genesis_block}
        self.last_block = self.genesis_block
        self.difficulty = 3 # TODO: modify this 

    def add_block(self, new_block: Block) -> None:        
        # connect the previous block to the new block to create a chain by their hashes
        new_block.previous_hash = self.last_block.hash
        new_block.mine_block(self.difficulty)
        self.last_block = new_block
        self.blocks[new_block.hash] = new_block

    def print_chain(self) -> None:
        iterator = self.last_block
        while iterator.previous_hash != None:
            print(iterator.to_dict())
            print()
            iterator = self.blocks[iterator.previous_hash]
        print(iterator.to_dict())

tx1 = Transaction(doer='Supriya', copier='Ranju', words=300)
tx2 = Transaction(doer='Newton', copier='Sanskar', words=500)
tx3 = Transaction(doer='Prajwal', copier='Saurav', words=1000)

pending_txs = [tx1, tx2]

blk1 = Block(pending_txs)
blk2 = Block([tx3])

b1 = Blockchain()
b1.add_block(blk1)
b1.add_block(blk2)
b1.print_chain()            
    