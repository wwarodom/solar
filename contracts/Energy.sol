pragma solidity 0.5.1;

contract Energy {

    address owner;
    string name = "Energy";
    string symbol = "ENE";
    uint256 totalCoin;
    bool mintingFinished = false;
    
    mapping (address => uint ) private balance;
    mapping(address => mapping (address => uint256)) allowed;
    
    // indexed in event useful for searching in logs
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value); 

    event Mint(address indexed to, uint value);
    event MintFinished();
    
    event Burn(address indexed from, uint256 value);
     
    constructor(string memory _name, string memory _symbol, uint256 _totalCoin) public {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        totalCoin = _totalCoin;
        balance[owner] = totalCoin;
    }
    

    function getEnergyName() public pure returns (string memory) {
        return "Energy ha ha";  
    }

    function totalSupply() public view returns (uint256 ) {
        return totalCoin;
    }
    
    function balanceOf(address _owner) public view returns (uint256 ) {
        return balance[_owner];
    }
    
    function transfer(address _to, uint256 _value) public returns (bool ) {
        require( balance[msg.sender] > _value );
        address _from = msg.sender;
        emit Transfer(_from, _to, _value);
        balance[_from] -= _value;
        balance[_to] += _value;
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool ){
        // [Send _value amount of tokens from address _from to address _to] 
        require(balance[_from] > _value );
        require(allowed[_from][msg.sender] > _value);
        balance[_from] -= _value; 
        allowed[_from][msg.sender] -= _value;
        balance[_to]  += _value;
        return true;
    } 
    
    function approve(address _spender, uint256 _value) public returns (bool ) {
        // [Allow _spender to withdraw from your account, multiple times, up to the _value amount. 
        // If this function is called again it overwrites the current allowance with _value]
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function allowance(address _owner, address _spender) public view returns (uint256 ) {
        // [Returns the amount which _spender is still allowed to withdraw from _owner]
        return allowed[_owner][_spender];
    }
 
    /**   
       * @dev Function to mint tokens
       * @param _to The  address that will recieve the minted tokens.
       * @param _amount The amount of tokens to mint.
       * @return A boolean that indicates if the operation was successful.
       */
    function mint(address _to, uint _amount) public returns (bool) {
        totalCoin += _amount;
        balance[_to] +=_amount;
        emit Mint(_to, _amount);
        return true;
    }

    /**
       * @dev Function to stop minting new tokens.
       * @return True if the operation was successful.
       */
    function finishMinting() public returns (bool) {
        mintingFinished = true;
        emit MintFinished();
        return true;
     }
  
    function burn(uint256 _value) public returns (bool success) {
        require(balance[msg.sender] >= _value);   // Check if the sender has enough
        balance[msg.sender] -= _value;            // Subtract from the sender
        totalCoin -= _value;                      // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }    
}