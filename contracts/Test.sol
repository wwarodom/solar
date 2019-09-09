pragma solidity 0.5.1;
contract Test {
	string str;
	function getString() public pure returns (string memory) {
		return "Foo";
	}
}