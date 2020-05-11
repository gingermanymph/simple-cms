const Employee = require('../models/employee');

exports.getIndex = (req, res, next) => {
    res.render('uploads', {
        pageTitle: 'Uploads',
        path: '/'
    })
};

exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        path: '/login'
    })
};

exports.postLogin = (req, res, next) => {
    res.redirect('/')
};

exports.getUploads = (req, res, next) => {
    res.render('uploads', {
        pageTitle: 'Uploads',
        path: '/uploads'
    })
};

exports.postUploads = (req, res, next) => {
    res.redirect('/uploads')
};

exports.getEmployees = (req, res, next) => {
    Employee.fetchAll(employees => {
        res.render('employees', {
            pageTitle: 'Employees',
            path: '/employees',
            employees: employees,
            editing: false,
        });
    });
};

exports.postEmployees = (req, res, next) => {
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const tin = req.body.tin;
    const employee = new Employee(null, firstName, lastName, email, tin);
    employee.save();
    res.redirect('/employees');
};

exports.getEditEmployee = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }

    const empId = req.params.employeeId;
    
    Employee.fetchAll(employees => {
        Employee.findById(empId, employee => {
            if(!employee){
                return res.redirect('/');
            }
            res.render('employees',{
                pageTitle: 'Edit Employee',
                path: '/edit-employee',
                employees: employees,
                editing: editMode,
                employee: employee
            });
        });
    })
};

exports.postEditEmployee = (req, res, next) => {
    const emplId = req.body.employeeId;
    const updatedFirstName = req.body.firstName;
    const updatedLastName = req.body.lastName;
    const updatedEmail = req.body.email;
    const updatedTin = req.body.tin;
    const updatedEmployee = new Employee(emplId, 
        updatedFirstName, 
        updatedLastName, 
        updatedEmail, 
        updatedTin);
    updatedEmployee.save();
    debugger;
    res.redirect('/employees');
}

exports.postDeleteEmployee = (req, res, next) => {
    const emplId = req.body.employeeId;
    Employee.deleteById(emplId);
    res.redirect('/employees');
}