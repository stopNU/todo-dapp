const { assert } = require("chai");

const TodoApp = artifacts.require("TodoApp");

require("chai").use(require("chai-as-promised")).should();

contract("TodoApp", (accounts) => {
  const [owner, user] = accounts;
  let todoApp;
  console.log(owner, user);

  before(async () => {
    // load contract
    todoApp = await TodoApp.new();
  });

  describe("Mock Todo App deployment", async () => {
    it("matches name succesfully", async () => {
      const name = todoApp.name();
      assert.eventually.equal(name, "Todo App");
    });
  });

  describe("CRUD functionality of one task", async () => {
    it("add one item to array succesfully", async () => {

      // Check task is added to user array of tasks
      await todoApp.addTask(
        "Test item",
        "Test item description",
        0,
        "12/12/1212",
        { from: user }
      );
      const array = await todoApp.getAllTasks({ from: user });
      assert.equal(array.length, 1, "user task lists length");

      // Check task id is 1
      const id = array[0].id;
      assert.equal(id, 1, "user task added has correct id");

      // Check correct task title was added
      const item = await todoApp.getTask(id, { from: user });
      assert.equal(item.title, "Test item", "user task added has correct title");

      // Check task added can be updated
      await todoApp.updateTask(id, "Changed task title", "Test item description", "todo", 0, "12/12/1212", { from: user });
      const updatedItem = await todoApp.getTask(id, { from: user });
      assert.equal(updatedItem.title, "Changed task title", "updated task added has changed title");

      // Check task added can be deleted
      await todoApp.deleteTask(id, { from: user });
      const updatedArray = await todoApp.getAllTasks({ from: user });
      assert.equal(updatedArray.length, 0, "task deleted and array at 0 items");
    });
  });
});
