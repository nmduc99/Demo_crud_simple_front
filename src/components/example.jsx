import React from 'react';
import { Button, Form, FormGroup, Label, Input,Col } from 'reactstrap';

function  Example() {
        
    

    return (

    <Form inline>
        <Col md={2}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleUser" className="mr-sm-2">User</Label>
        <Input type="user" name="user" id="exampleUser"/>
      </FormGroup>
        </Col>
        <Col md={2}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" id="examplePassword" />
      </FormGroup>
      </Col>
      <p></p>
      <Col md={2}>
      <Button  
      >Login</Button>
      </Col>
    </Form>
  );
}

export default Example;