import React, { Component } from 'react'
import { Modal, Button, Row, Col, Form, ButtonGroup } from 'react-bootstrap'

export class EditDepartmentModal extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = e => {
		e.preventDefault();
		fetch(process.env.REACT_APP_API + 'department', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				DepartmentId: e.target.DepartmentId.value,
				DepartmentName: e.target.DepartmentName.value
			})
		}).then(res => res.json())
	}

	render() {
		return (
			<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter">
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Edit Department
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={this.handleSubmit}>
								<Form.Group>
									<Form.Label>Department Id</Form.Label>
									<Form.Control type="text" name="DepartmentId" id="DepartmentId" placeholder="Department id..." defaultValue={this.props.depid} required />
								</Form.Group>

								<Form.Group>
									<Form.Label>Department Name</Form.Label>
									<Form.Control type="text" name="DepartmentName" id="DepartmentName" placeholder="Department name..." defaultValue={this.props.depname} required />
								</Form.Group>

								<Form.Group>
									<ButtonGroup aria-label="modal-buttons">
										<Button variant="outline-danger" onClick={this.props.onHide}>Cancel</Button>
										<Button variant="dark" type="submit">Update Department</Button>
									</ButtonGroup>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		)
	}
}

export default EditDepartmentModal
