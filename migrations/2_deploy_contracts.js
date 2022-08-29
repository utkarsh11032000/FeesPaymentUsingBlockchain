const Marketplace = artifacts.require("Marketplace");
const University = artifacts.require("University");

module.exports = function(deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(University);
};
