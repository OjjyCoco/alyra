// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract People {
    struct Person {
        string name;
        uint age;
    }

    Person[] public people;

    Person public moi;

    function modifyPerson (string memory _name, uint _age) public {
        moi.name = _name;
        moi.age = _age;
    }

    function getMoi () external view returns(string memory, uint) {
        return (moi.name, moi.age);
    }

    function addPeople (string memory _name, uint _age) public {
        Person memory person = Person(_name, _age);
        people.push(person);
        // ou
        // people.push(Person(_name, _age));       
    }

    function removePeople () public {
        people.pop();
    }

 }