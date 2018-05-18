import React, { Component } from 'react';
import { FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'


export default class NewCat extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        age: '',
        enjoys: ''
      }
    }
  }


handleChange(event){
  let {form } = this.state
  form[event.target.name] = event.target.value
  this.setState({form: form})
}

handleSubmit(event){
  event.preventDefault()
  this.props.onSubmit(this.state.form)

}


render(){
  // console.log(this.props.handleSubmit);
  return(
    <div>
      <form>
        <FormControl
          type="text"
          name="name"
          placeholder = "name"
          onChange={this.handleChange.bind(this)}
          value={this.state.form.name}
        />
        <FormControl
          type="number"
          name="age"
          placeholder = "age"
          onChange={this.handleChange.bind(this)}
          value={this.state.form.age}
        />
        <FormControl
          type="text"
          name="enjoys"
          placeholder = "enjoys"
          onChange={this.handleChange.bind(this)}
          value={this.state.form.enjoys}
        />
        <FormControl
          type="submit"
          name="create cat"
          onClick={this.handleSubmit.bind(this)}
        />
      </form>
      {this.props.success &&
             <Redirect to="/cats"/>
         }

  </div>

  )

}




}
