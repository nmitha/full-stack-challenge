import React from 'react';
import Modal from 'react-modal';
import FRC from 'formsy-react-components';

class EmployeesGrid extends React.Component {

    get initialEmployees() {
        return [
            {
                "email": "nadeem.mitha@gmail.com",
                "firstName": "Nadeem",
                "lastName": "Mitha"
            },
            {
                "email": "joe.developer@gmail.com",
                "firstName": "Joe",
                "lastName": "Developer"
            }
        ];
    }

    getEmployees() {
        let storedEmployees = localStorage.getItem('employees');
        if (!storedEmployees) {
            localStorage.setItem('employees', JSON.stringify(this.initialEmployees));
            return this.initialEmployees;
        }
        return JSON.parse(storedEmployees);
    }

    saveEmployees(employees) {
        localStorage.setItem('employees', JSON.stringify(employees));
    }

    constructor(props) {
        super(props);

        // Set 'this' to the class instance in event handlers that require it:
        this.addEmpl = this.addEmpl.bind(this);

        this.state = {
            employees: this.getEmployees(),
            addEmplOpen: false
        };
    }

    addEmpl(model) {
        let employees = this.state.employees;
        // Can't have 2 employees with the same email:
        if (employees && employees.find((empl) => empl.email.toLowerCase() === model.email.toLowerCase())) {
            alert(`Employee with the email ${model.email} already exists in the system.`);
            return false;
        }
        else {
            let newEmployees = employees.concat([model]); // we only want to do immutable operations, no mutating this.state.employees directly
            this.setState({employees: newEmployees});
            this.saveEmployees(newEmployees);
            this.setState({ addEmplOpen: false });
        }
    }

    deleteEmpl(idx) {
        let employees = this.state.employees;
        let newEmployees = employees.slice(); // copy
        newEmployees.splice(idx, 1);
        this.setState({employees: newEmployees});
        this.saveEmployees(newEmployees);
    }

    render() {
        return (
            <div>
                <h2>Manage Employees</h2>
                
                {/* Form for adding new employee */}
                <button onClick={() => this.setState({ addEmplOpen: true })} className="btn btn-primary">+ New Employee</button>
                <Modal
                    isOpen={this.state.addEmplOpen}
                    contentLabel="Add new employee"
                    className="Modal__Bootstrap modal-dialog"
                    >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={() => this.setState({ addEmplOpen: false })}>&times;</button>
                            <h4 className="modal-title">Add new employee</h4>
                        </div>
                        <div className="modal-body">
                            <FRC.Form onSubmit={this.addEmpl} validateOnSubmit={false} validatePristine={false} ref="addUserForm">
                                <FRC.Input name="email" type="email" required autoComplete="off" label="Email (used as userid)" placeholder="email@address.com" validations="isEmail" validationErrors={{ isEmail: 'Not a valid email' }} />
                                <FRC.Input name="firstName" type="text" required label="First name" placeholder="John" />
                                <FRC.Input name="lastName" type="text" required label="Last name" placeholder="Smith" />
                                <input type="submit" className="btn btn-primary" defaultValue="Add employee" />
                            </FRC.Form>
                        </div>
                    </div>
                </Modal>

                <h3>Employees in the system:</h3>
                    <div className="itemCollection">
                        {this.state.employees.map((empl, idx) => {
                            return <span className="item" key={idx}>{empl.firstName} {empl.lastName} ({empl.email}) <a className="itemDelete" onClick={() => this.deleteEmpl(idx)}>&times;</a></span>;
                        })}
                    </div>
            </div>
                );
    }

}

export default EmployeesGrid;