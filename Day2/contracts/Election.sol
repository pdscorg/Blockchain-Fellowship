// SPDX-License-Identifier: Unlicensed

pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Election {
	address public owner; 
	string public electionName;
	uint public candidateCount = 0;
	uint voteCount;
	uint startTime;
	uint endTime;
    uint256 startReg;
    uint256 endReg;

	constructor(string memory _name) {
		owner = msg.sender;
		electionName = _name;
        startTime = 8640000000000000;
        endTime = 8640000000000000;
        startReg = 8640000000000000;
        endReg = 8640000000000000;
	}

    struct Candidate {
		uint candidateId;
		string candidateName;
		uint partyId;
		uint candidateVoteCount;
		string uri;
	}


    struct Voter {
		address voterId;
        uint256 citizenshipNumber;
		bool registered;
        uint256 vote;
		bool voted;	
	}


	mapping (uint => Candidate) candidates;
	mapping (address => Voter) voters;


//events
	event NewCandidateAdded (
		uint candidateId,
		string candidateName,
		uint partyId,
		uint candidateVoteCount,
		string uri
	);

//modifiers to check the conditions before calling function
	modifier onlyOwner () {
		require(msg.sender == owner, "Only owner can access this");
		_;
	}

	modifier onlyBefore(uint _time) {
		require(block.timestamp  < _time, "Time for this action has exceeded");
		_;
	}

	modifier onlyAfter(uint _time) {
		require(block.timestamp > _time, "Wait for start");
		_;
	}

	function changeOwner(address _newOwner) public onlyOwner {
		owner = _newOwner;
    }


    function startElection() public onlyOwner onlyAfter(endReg){
        startTime = block.timestamp;
    }

    function endElection() public onlyOwner{
        endTime = block.timestamp;
    }

    function startRegistration() public onlyOwner{
        startReg = block.timestamp;
    }

    function endRegistration() public onlyOwner{
        endReg = block.timestamp;
    }

    function registerAsVoter(
        uint256 citizenshipNumber
        ) public onlyAfter(startReg)
        onlyBefore(endReg){
            voters[msg.sender] = Voter(msg.sender,citizenshipNumber,false,0,false);
    }

	function getElectionName() public view returns(string memory) {
		return electionName;
	}

    function addCandidates(
		string memory _candidateName, 
		uint _partyId, 
		string memory _uri
		) public 
		onlyBefore(startTime) 
		onlyOwner  {

		require(_partyId > 0, "The partyId shouldn't be zero");
		candidateCount++;
		candidates[candidateCount] = Candidate(candidateCount, _candidateName, _partyId, 0, _uri);
		emit NewCandidateAdded(candidateCount, _candidateName, _partyId, 0, _uri);
	}

	function getCandidates() external view returns (Candidate[] memory)
		{
		Candidate[] memory list = new Candidate[](candidateCount);
		for (uint256 i = 1; i <= candidateCount; i++) {
			list[i-1] = candidates[i];	
			list[i-1].candidateVoteCount = 0;
		}
		return list;
	}


	function approveVoters(address _voter) 
		public 
		onlyBefore(startTime) 
		onlyAfter(startReg) 
		onlyOwner {	
		require(!voters[_voter].registered);
		voters[_voter].registered = true;
	}

    function vote(uint _candidateId) public {
		require(startTime <= block.timestamp, "Election has not started yet.");
		require(endTime > block.timestamp, "Election is over.");

		Voter storage _voter = voters[msg.sender];

		require(!_voter.voted, "You have already voted");
		require(_voter.registered, "You are not registered/approved as a voter");

		_voter.vote = _candidateId;
		candidates[_candidateId].candidateVoteCount++;
		voteCount++;
		_voter.voted = true;
	}

	function checkResults() external view 
	onlyAfter(endTime) 
	returns (Candidate memory winningCandidateId) {
		
		uint highestVoteCount = 0;
		for(uint i = 1; i <= candidateCount; i++) {
			if (candidates[i].candidateVoteCount > highestVoteCount) {
				highestVoteCount = candidates[i].candidateVoteCount;
				winningCandidateId = candidates[i];	
			}
		}
	}

	function getFinalStats() external view returns (Candidate[] memory)
		{
		Candidate[] memory list = new Candidate[](candidateCount);
		for (uint256 i = 1; i <= candidateCount; i++) {
			list[i-1] = candidates[i];	
		}
		return list;
	}

}


