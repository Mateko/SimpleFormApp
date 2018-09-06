import React, { Component } from 'react';

import moment from 'moment';

import { Button, Form, FormGroup, Label, Input, FormText, Container, Col } from 'reactstrap';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import 'whatwg-fetch';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: moment(),
      formFirstName: '',
      formLastName: '',
      formEmail: '',
      checkEmail: '',
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleChange(e){
    if(e.target.name === 'formEmail') {

      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (re.test(e.target.value)) {
        this.setState({
          checkEmail: 'Valid Email',
          formEmail: e.target.value
        })
      }else {
        this.setState({
          checkEmail: 'Invalid Email'
        })
      }
    }

    this.setState({
      [e.target.name] : e.target.value
    });
  }

  fetchData() {
    const {
      formFirstName,
      formLastName,
      formEmail,
      formDate,
      startDate,
      checkEmail
    } = this.state

    fetch('/saveform', {
      method: 'POST',
      body: JSON.stringify({
        firstName: formFirstName,
        lastName: formLastName,
        email: formEmail,
        date: startDate
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(json => {
        if(json.success)
          {
            this.setState({
              formFirstName: '',
              formLastName: '',
              formEmail: '',
              checkEmail: ''
            })
            alert(json.message);
          }else {
            alert(json.message);
          }
			});
	}

  render() {
    return (
      <Container className="mainContener">
        <h1 className="heading">SimpleFormApp</h1>
        <Form className="form">
        <FormGroup>
          <Label>First Name</Label>
          <Input placeholder="place there your first name"
          value= {this.state.formFirstName}
          onChange= {this.handleChange}
          name="formFirstName"/>
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input placeholder="place there your last name"
          value= {this.state.formLastName}
          onChange= {this.handleChange}
          name="formLastName"/>
        </FormGroup>
        <FormGroup>
          <Label>E-mail</Label><br />
          <Label>{this.state.checkEmail}</Label>
          <Input placeholder="place there your email"
          value= {this.state.formEmail}
          onChange= {this.handleChange}
          name="formEmail"
          type="email"
          pattern="[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*" />
        </FormGroup>
        </Form>
        <Col>
          <Label>Pick Date!</Label>
          <DatePicker
          className="datePicker"
          selected= {this.state.startDate}
          onChange= {this.handleDateChange}
          />
        </Col>
        <Col className="completeButton">
          <Button color="primary" onClick= {this.fetchData}>Send</Button>
        </Col>
      </Container>
    );
  }
}

export default Home;
