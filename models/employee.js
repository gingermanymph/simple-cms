const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'employees.json'
);

const getEmployeeFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
};

module.exports = class Employee {
    constructor(id, firstName, lastName, email, tin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tin = tin;
    }

    save() {
        getEmployeeFromFile(employees => {
            if (this.id) {
                const existingEmployee = employees.findIndex(empl => empl.id === this.id);
                const updatedEmployees = [...employees];
                updatedEmployees[existingEmployee] = this;
                fs.writeFile(p, JSON.stringify(updatedEmployees), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                employees.push(this);
                fs.writeFile(p, JSON.stringify(employees), err => {
                    console.log(err)
                });
            }
        });
    }

    static deleteById(id) {
        getEmployeeFromFile(employees => {
            // const employee = employees.find(e => e.id === id);
            const updatedEmployees = employees.filter(empl => empl.id !== id);
            fs.writeFile(p, JSON.stringify(updatedEmployees), err => {
                console.log(err)
            });
        });
    }

    static fetchAll(cb) {
        getEmployeeFromFile(cb);
    }

    static findById(id, cb) {
        getEmployeeFromFile(employees => {
            const employee = employees.find(e => e.id === id);
            cb(employee);
        });
    }
}