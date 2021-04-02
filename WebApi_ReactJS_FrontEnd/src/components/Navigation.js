import React, { Component } from 'react'
import {Navbar, Nav} from 'react-bootstrap'

export class Navigation extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav>
						<Nav.Link activeClassName="active" exact className="d-inline p-2" href="/">Home</Nav.Link>
						<Nav.Link activeClassName="active" exact className="d-inline p-2" href="/departments">Departments</Nav.Link>
						<Nav.Link activeClassName="active" exact className="d-inline p-2" href="/employees">Employees</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Navbar
