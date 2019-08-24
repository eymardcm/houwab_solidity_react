pragma solidity ^0.5.0;

import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address campaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(campaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}