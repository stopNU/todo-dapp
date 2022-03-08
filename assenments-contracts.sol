//SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Bank {
    mapping(address => uint256) userBalance;

    function getBalance(address user) public view returns (uint256 balance) {
        return userBalance[user];
    }

    function addToBalance(uint amount) public payable {
        userBalance[msg.sender] += amount;
    }

    function withdrawBalance() public {
        (bool success,) = msg.sender.call{value: userBalance[msg.sender]}(
            "Withdraw started"
        );
        require(success, "Transfer failed.");
        userBalance[msg.sender] = 0;
        
    }

    function withdraw() public payable{
        uint amount = userBalance[msg.sender];
        // Remember to zero the pending refund before sending to prevent re-entrancy attacks
        userBalance[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}

contract Likable {
    mapping(address => bool) userLikes;
    uint256 public likesCount;
    //uint256 public likes;
    
    function remove() external {
        require(userLikes[msg.sender] == true, "We get it, you hate it...");
        userLikes[msg.sender] = false;
        likesCount--;
    }

    function add() external {
        require(userLikes[msg.sender] == false, "You already liked it");
        userLikes[msg.sender] = true;
        likesCount++;
    }

    function userLiked() public view returns(bool){
        return userLikes[msg.sender];
    }
}