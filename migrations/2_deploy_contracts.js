const TodoApp = artifacts.require("TodoApp");

module.exports = async function (deployer, network, accounts) {
  // deploy TodoApp contract
  await deployer.deploy(TodoApp);
  const todoApp = await TodoApp.deployed();
};
