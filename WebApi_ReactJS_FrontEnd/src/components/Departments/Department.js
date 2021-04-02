import React, { Component } from 'react'
import {Table, Button, ButtonToolbar} from 'react-bootstrap'
import AddDepartmentModal from './AddDepartmentModal'
import EditDepartmentModal from './EditDepartmentModal'

export class Department extends Component {
	constructor(props){
		super(props);
		this.state = {
			deps: [],
			addModalShow: false,
			editModalShow: false,
		}
	};

	refreshList() {
		fetch(process.env.REACT_APP_API+'department')
		.then(response => response.json())
		.then(data => {
			this.setState({deps:data})
		})
	};

	componentDidMount() {
		this.refreshList();
	};

	componentDidUpdate() {
		this.refreshList();
	};

	deleteDep(depid) {
		if(window.confirm('Are you sure?')){
			fetch(process.env.REACT_APP_API + 'department/' + depid, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
		}
	};

	render() {
		const {deps, depid, depname} = this.state
		let addModalClose = () => this.setState( {addModalShow: false} )
		let editModalClose = () => this.setState({ editModalShow: false })

		return (
			<div>
				<Table striped bordered hover responsive>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Options</th>
						</tr>
					</thead>
					<tbody>
						{deps.map( dep =>
							<tr key={dep.DepartmentId}>
								<td>{dep.DepartmentId}</td>
								<td>{dep.DepartmentName}</td>
								<td>
									<ButtonToolbar>
										<Button variant="outline-success" onClick={() => this.setState({editModalShow: true, depid: dep.DepartmentId, depname: dep.DepartmentName})}>
											Edit
										</Button>

										<Button variant="outline-danger" className="ml-2" onClick={() => this.deleteDep(dep.DepartmentId)}>
											Delete
										</Button>

										<EditDepartmentModal show={this.state.editModalShow} depid={depid} depname={depname} onHide={editModalClose}/>
									</ButtonToolbar>
								</td>
							</tr>
						)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button variant="outline-dark" onClick={() => this.setState({addModalShow:true})}>Add Department</Button>
					
					<AddDepartmentModal show={this.state.addModalShow} onHide={addModalClose}/>
				</ButtonToolbar>
			</div>
		)
	}
}

export default Department
