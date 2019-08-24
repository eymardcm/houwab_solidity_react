pragma solidity ^0.5.0;

import "./SafeMath.sol";

contract Campaign {
    using SafeMath for uint;

    address public owner;
    uint public minimumContribution;

    mapping(address => bool) public approvers;
    uint public countOfApprovers;

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool isApproved;
        bool complete;
        uint voteCount;
        uint consensusTarget;
        mapping(address => bool) approvers;
    }
    Request[] public requests;

    constructor(uint minimum, address _owner) public {
        minimumContribution = minimum;
        owner = _owner;

    }


    modifier requireSenderIsOwner() {
        require(msg.sender==owner, 'Only the contract owner can access this function');
        _;
    }

    modifier requireSenderIsNotOwner() {
        require(msg.sender!=owner, 'Only the contract owner can access this function');
        _;

    }
    modifier requireSenderIsAnApprover() {
        require(approvers[msg.sender], 'Sender is not an authorized approver');
        _;
    }
    modifier requireMinimumContributionAmount() {
        require(msg.value>=minimumContribution, 'Minimum contribution not met');
        _;
    }

    modifier requireSenderHasNotVoted(uint index) {
        require(!requests[index].approvers[msg.sender],'This voter has already cast a vote');
        _;
    }

    modifier requireRequestNotAlreadyApproved(uint index) {
        require(!requests[index].isApproved, 'This request has already been approved');
        _;
    }

    function contribute() public requireMinimumContributionAmount payable {
        if (msg.sender != owner && approvers[msg.sender] != true) {
            addApprover();

        }
    }

    function addApprover() private {
        approvers[msg.sender] = true;
        uint value = 1;
        countOfApprovers = countOfApprovers.add(value);

    }

    function createRequest(string memory description, uint value, address payable recipient) public requireSenderIsOwner {
        uint consensusValue = 1;

        if (countOfApprovers > 2) {
            uint result = countOfApprovers.div(2);
            // uint result = countOfApprovers / 2;

            consensusValue = result.add(1);
            // consensusValue = result++;

        }

        Request memory request = Request({
            description: description,
            value: value,
            recipient: recipient,
            isApproved: false,
            complete: false,
            voteCount: 0,
            consensusTarget: consensusValue
        });

        requests.push(request);

    }

    function approveRequest(uint index) public
        requireSenderIsNotOwner requireSenderIsAnApprover
        requireSenderHasNotVoted(index) requireRequestNotAlreadyApproved(index)
        {
        Request storage request = requests[index];

        request.approvers[msg.sender] = true;
        request.voteCount = request.voteCount.add(1);
        // request.voteCount = request.voteCount++;


        bool approvalStatus = checkIfFinalApproval(request);

        if (approvalStatus) {
            request.isApproved = true;
        }
    }
    function checkIfFinalApproval(Request storage request) private view returns (bool) {
        if (request.voteCount >= request.consensusTarget) {
            return true;
        }

        return false;
    }

    function finalizeRequest(uint index) public requireSenderIsOwner {
        Request storage request = requests[index];
        require(request.isApproved, 'The request cannot be finalized because it has not been approved');
        require(!request.complete, 'The request is already complete');

        request.complete = true;

        request.recipient.transfer(request.value);

    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            countOfApprovers,
            owner
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}