const Thb = artifacts.require("Thb");
const Energy = artifacts.require("Energy")
const Main = artifacts.require("Main")

module.exports = function(deployer) {
  deployer.deploy(Thb);
};

module.exports = function(deployer) {
  deployer.deploy(Energy);
};

module.exports = function(deployer) {
  deployer.deploy(Main);
};
