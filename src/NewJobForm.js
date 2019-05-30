import React, { Component } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 2px;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid lightgrey;
`;

const StyledTextArea = styled.textarea`
  height: 100px;
  border-width: 2px;
  border-style: inset;
  border: 1px solid lightgrey;
`;

class NewJobForm extends Component{
  constructor(props){
    super(props);
    this.state={
      company: '',
      position: '',
      description: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt){
    this.setState({[evt.target.name]: evt.target.value});
  }

  handleSubmit(evt){
    evt.preventDefault();
    this.props.triggerAddJob('', this.state);
  }

  render(){
    return(
      <StyledForm onSubmit={this.handleSubmit}>
        <label htmlFor="company">Company:</label><br/>
        <StyledInput onChange={this.handleChange} value={this.state.company} name="company" /><br/>
        <label htmlFor="position">Position:</label><br/>
        <StyledInput onChange={this.handleChange} value={this.state.position} name="position" /><br/>
        <label htmlFor="description">Description:</label><br/>
        <StyledTextArea onChange={this.handleChange} value={this.state.description} name="description" /><br/>
        <button>Add</button>
      </StyledForm>
    )}
}

export default NewJobForm;