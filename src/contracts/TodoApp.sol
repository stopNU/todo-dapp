// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TodoApp {
    //enum Priorities{ LOW, MEDIUM, HIGH }
    string public name = "Todo App";

    // Structure for task
    struct Task {
        uint256 id;
        string title;
        string description;
        string status;
        uint256 priority;
        string date;
        address user;
    }

    mapping(address => Task[]) private Users;
    uint256 idCounter;

    //event addedTask(address indexed user, string title, uint256 taskId);

    // Add a task
    function addTask(
        string memory _title,
        string memory _desc,
        uint256 _priority,
        string memory _date
    ) external {
        idCounter++;
        Users[msg.sender].push(
            Task({
                id: idCounter,
                title: _title,
                description: _desc,
                date: _date,
                status: "todo",
                priority: _priority,
                user: msg.sender
            })
        );
        //emit addedTask(msg.sender, _title, idCounter);
    }

    // Get one task
    function getTask(uint256 _id) external view returns (Task memory) {
        //Task storage task = Users[msg.sender][_id];
        Task memory task;
        for (uint256 i = 0; i < Users[msg.sender].length; i++) {
            if (Users[msg.sender][i].id == _id) {
                return task = Users[msg.sender][i];
            }
        }
        return task;
    }

    // Update a task
    function updateTask(
        uint256 _id,
        string memory _title,
        string memory _desc,
        string memory _status,
        uint256 _priority,
        string memory _date
    ) external {
        for (uint256 i = 0; i < Users[msg.sender].length; i++) {
            // Compare ID's to find task to delete
            if (Users[msg.sender][i].id == _id) {
                Users[msg.sender][i].title = _title;
                Users[msg.sender][i].description = _desc;
                Users[msg.sender][i].status = _status;
                Users[msg.sender][i].priority = _priority;
                Users[msg.sender][i].date = _date;
                return;
            }
        }
    }

    // Delete a task
    function deleteTask(uint256 _id) external {
        //delete Users[msg.sender][_taskIndex];

        for (uint256 i = 0; i < Users[msg.sender].length; i++) {
            // Compare ID's to find task to delete
            // And move it to end of array to use pop()
            if (Users[msg.sender][i].id == _id) {
                Task storage removeMe = Users[msg.sender][i];
                Users[msg.sender][i] = Users[msg.sender][
                    Users[msg.sender].length - 1
                ];
                Users[msg.sender][Users[msg.sender].length - 1] = removeMe;
            }
        }

        Users[msg.sender].pop(); // remove the last task in array/struct
    }

    // Get all tasks
    function getAllTasks() external view returns (Task[] memory) {
        return Users[msg.sender];
    }

    // Get task count
    //function getTaskCount() external view returns (uint256) {
    //    return Users[msg.sender].length;
    //}
}
