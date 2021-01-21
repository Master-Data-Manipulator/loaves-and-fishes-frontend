import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import "./Stylesheets/Register.css";

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:'',
      lastName:'',
      username:'',
      password:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var apiBaseUrl = "http://localhost:8080/api/user/register";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.firstName.length>0 && this.state.lastName.length>0 && this.state.username.length>0 && this.state.password.length>0){
      var payload={
      "firstName": this.state.firstName,
      "lastName":this.state.lastName,
      "username":this.state.username,
      "password":this.state.password,
      }
      axios.post(apiBaseUrl, payload)
     .then(function (response) {
       console.log(response);
       if(response.data === "good"){
        //  console.log("registration successfull");
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
   
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar showMenuIconButton={false}
             title="Register"
            />
            <div className="formInput">
            <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter Email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
            </div>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
