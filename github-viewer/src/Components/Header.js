import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Header extends Component {

    onLogin() {
        this.props.onLogin();
    }

    render() {
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Github Searcher
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem onClick={this.onLogin.bind(this)} href="#">
                        Login
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}