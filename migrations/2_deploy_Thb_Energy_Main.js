const Thb = artifacts.require("Thb");
// const Energy = artifacts.require("Energy")
// Energy.numberFormat = "String";

const Main = artifacts.require("Main")
// const Test = artifacts.require("Test")

// module.exports = function(deployer) {
//   deployer.deploy(Thb);
// };

// module.exports = function(deployer) {
//   deployer.deploy(Energy);
// };		

// module.exports = function(deployer) {
//   deployer.deploy(Main);
// };

module.exports = function(deployer) {
  deployer.deploy(Thb, 'THB', 'THB', 1000);

  // deployer.deploy(Test);
// };

// module.exports = function(deployer) {
  // deployer.deploy(Energy, 'Energy', 'ENE', 10);
// };

// module.exports = function(deployer) {
  // deployer.deploy(Main);
};
