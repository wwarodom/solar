pragma solidity >=0.4.21 <0.6.0;

import "./Energy.sol";
import "./Thb.sol";

contract Main {

    Energy  energy;
    Thb thb;

    function getEnergy(address addr) public returns (uint) {
        energy = Energy(addr);
    }

    function getThb(address addr) public returns (uint) {
        thb = Thb(addr);
    }

    function test(address to) public  {
        energy.mint(to, 200);

    }

    function getMain() public  pure returns (string memory) {
        return "Main function";
    }

}

// Main contract address: 0x4a302676A59696e9A2d593f8BA2b887294A36195
