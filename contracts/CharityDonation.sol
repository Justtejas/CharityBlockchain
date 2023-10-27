pragma solidity ^0.5.0;

contract CharityDonation{
    struct Donation{
        address donor;
        uint256 amount;
        string organization;
        string reason;
    }

    mapping(string => uint256) totalDonations;

    
    event DonationMade(address indexed donor, uint256 amount, string organization, string reason);
    
    function donate(uint256 amount, string memory organization, string memory reason) public payable{
        require(amount > 0, "Donation amount must be greater than 0");
        require(bytes(organization).length > 0, "Organization must be provided");
        require(bytes(reason).length > 0, "Reason must be provided");

        totalDonations[organization] += amount;

        emit DonationMade(msg.sender, amount, organization, reason);
    }

    function getTotalDonation(string memory organization) public view returns (uint256){
        return totalDonations[organization];
    }
}