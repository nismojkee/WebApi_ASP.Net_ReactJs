import React, { Component } from 'react'
import { Table, Button, ButtonToolbar } from 'react-bootstrap'
import AddEmployeeModal from './AddEmployeeModal'
import EditEmployeeModal from './EditEmployeeModal'

export class Employee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emps: [],
			addModalShow: false,
			editModalShow: false,
		}
	};

	refreshList() {
		fetch(process.env.REACT_APP_API + 'employee')
			.then(response => response.json())
			.then(data => {
				this.setState({ emps: data })
			})
	};

	componentDidMount() {
		this.refreshList();
	};

	componentDidUpdate() {
		this.refreshList();
	};

	deleteEmp(empid) {
		if (window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API + 'employee/' + empid, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
		}
	};

	render() {
		const { emps, empid, empname, empdoj, photofilename, empdep } = this.state
		let addModalClose = () => this.setState({ addModalShow: false })
		let editModalClose = () => this.setState({ editModalShow: false })

		return (
			<div>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Department</th>
							<th>Date of Joining</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{emps.map(emp =>
							<tr key={emp.EmployeeId}>
								<td>{emp.EmployeeId}</td>
								<td>{emp.EmployeeName}</td>
								<td>{emp.Department}</td>
								<td>{emp.DateOfJoining}</td>
								<td>
									<ButtonToolbar>
										<Button variant="outline-success" onClick={() => this.setState({ editModalShow: true, empid: emp.EmployeeId, empname: emp.EmployeeName, empdep: emp.Department, empdoj: emp.DateOfJoining, photofilename: emp.PhotoFileName })}>
											Edit
										</Button>

										<Button variant="outline-danger" className="ml-2" onClick={() => this.deleteEmp(emp.EmployeeId)}>
											Delete
										</Button>

										<EditEmployeeModal
											show={this.state.editModalShow}
											empid={empid}
											empdep={empdep}
											photofilename={photofilename}
											empdoj={empdoj}
											empname={empname}
											onHide={editModalClose} />
									</ButtonToolbar>
								</td>
							</tr>
						)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button variant="outline-dark" onClick={() => this.setState({ addModalShow: true })}>Add Employee</Button>

					<AddEmployeeModal show={this.state.addModalShow} onHide={addModalClose} />
				</ButtonToolbar>
			</div>
		)
	}
}

export default Employee
