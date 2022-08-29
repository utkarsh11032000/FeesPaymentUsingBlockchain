pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public studentCount = 0;
    mapping(uint => Student) public students;

    struct Student {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool paid;
    }

    event StudentCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool paid
    );

    event FeesPaid(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool paid
    );

    constructor() public {
        name = "Vandans Project";
    }

    function createStudent(string memory _name, uint _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment student count
        studentCount ++;
        // Create the student
        students[studentCount] = Student(studentCount, _name, _price, msg.sender, false);
        // Trigger an event
        emit StudentCreated(studentCount, _name, _price, msg.sender, false);
    }

    function PayFees(uint _id) public payable {
        // Fetch the student
        Student memory _student = students[_id];
        // Fetch the owner
        address payable _university = _student.owner;
        // Make sure the student has a valid id
        require(_student.id > 0 && _student.id <= studentCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _student.price);
        // Require that the student has not paid fees already
        require(!_student.paid);
        // Require that the buyer is not the seller
        require(_university != msg.sender);
        // Transfer ownership to the buyer
        _student.owner = msg.sender;
        // Mark as fees paid
        _student.paid = true;
        // Update the product
        students[_id] = _student;
        // Pay the seller by sending them Ether
        address(_university).transfer(msg.value);
        // Trigger an event
        emit FeesPaid(studentCount, _student.name, _student.price, msg.sender, true);
    }
}
