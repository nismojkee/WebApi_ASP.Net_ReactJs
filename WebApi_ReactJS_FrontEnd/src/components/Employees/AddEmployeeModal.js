import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, ButtonGroup, Image } from 'react-bootstrap'

export class AddEmployeeModal extends Component {
	constructor(props) {
		super(props);
		this.state={deps:[]};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileSelected = this.handleFileSelected.bind(this);
	}

	photofilename = "anonymous.png"
	imagesrc = process.env.REACT_APP_PHOTOPATH + this.photofilename

	componentDidMount(){
		fetch(process.env.REACT_APP_API + 'department')
		.then(response => response.json())
		.then(data => {
			this.setState({deps:data})
		})
	}

	handleSubmit = e => {
		e.preventDefault();
		fetch(process.env.REACT_APP_API + 'employee', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				EmployeeName: e.target.EmployeeName.value,
				Department: e.target.Department.value,
				DateOfJoining: e.target.DateOfJoining.value,
				PhotoFileName: this.photofilename
			})
		})
			.then(res => res.json())
	}

	handleFileSelected = e => {
		e.preventDefault()
		this.photofilename = e.target.files[0].name
		const formData = new FormData()
		formData.append(
			"myFile",
			e.target.files[0],
			e.target.files[0].name
		)

		fetch(process.env.REACT_APP_API + 'employee/SaveFile', {
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then((result) => {
			this.imagesrc = process.env.REACT_APP_PHOTOPATH + result
		})
	}

	render() {
		return (
			<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Add Employee
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group>
									<Form.Label>Employee Name</Form.Label>
									<Form.Control type="text" name="EmployeeName" id="EmployeeName" placeholder="Employee name..." required />
								</Form.Group>

								<Form.Group controlId="Department">
									<Form.Label>Department</Form.Label>
									<Form.Control as="select">
										{this.state.deps.map(dep =>
											<option key={dep.DepartmentId}>{dep.DepartmentName}</option>
										)}
									</Form.Control>
								</Form.Group>

								<Form.Group>
									<Form.Label>Date Of Joining</Form.Label>
									<Form.Control type="date" name="DateOfJoining" id="DateOfJoining" required />
								</Form.Group>

								<Form.Group>
									<ButtonGroup aria-label="modal-buttons">
										<Button variant="outline-danger" onClick={this.props.onHide}>Cancel</Button>
										<Button variant="dark" type="submit">Add Employee</Button>
									</ButtonGroup>
								</Form.Group>
							</Form>
						</Col>
						<Col sm={6}>
							<Image width="200px" height="200px" src={this.imagesrc} />
							<input onChange={this.handleFileSelected} type="File" />
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		)
	}
}

export default AddEmployeeModal
