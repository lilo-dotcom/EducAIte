import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUser, findUserByEmail } from '../../../../services/UserService';
import { omit } from 'lodash';
import { REGISTER_DISABILITIES_URL } from '../../../../constants/urlConstants';
import { useNavigate } from 'react-router-dom';

export default function CreateUser(props) {

  const { register, handleSubmit } = useForm();
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const navigate = useNavigate();

  const onSubmit = (data, e) => {
    // try
    if(e) e.preventDefault();

    if(Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
      createUser(data).then(response => {
        e.target.reset();
      });
      console.log("Navigating to disabilities.");
      navigate(REGISTER_DISABILITIES_URL);
    } else {
      alert("Please provide valid input for all fields.");
    }
    
  };

  const validate = async (e, inputName, val) => {
    let res = {};
    setErrors({});
    switch(inputName) {
      case 'name':
        if (val.length < 2) {
          setErrors({
            ...errors,
            name:'Name must have at least two characters.'
          })
          return
        }
        break;

      case 'email':
        res = await findUserByEmail(val);
        console.log(res);

        if (
          !new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(val)
        ){
          setErrors({
            ...errors,
            email: 'Please enter a valid email address.'
          })
          return
        }

        if (
          res > 0
        ) {
          setErrors({
            ...errors,
            email: 'This email is already associated with an account.'
          })
          return
        }
        break;

      case 'password':
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(val)
        ){
          setErrors({
            ...errors,
            password: 'Password should contain at-least 8 characters and consist of uppercase, lowercase, and numeric characters.'
          })
          return
        }
        break;

      default:
        break;
    }

    const newObj = omit(errors, inputName);
    setErrors({...newObj})
  }

  const handleChange = (e) => {
    e.persist();

    let inputName = e.target.name;
    let val = e.target.value;
    let password;

    validate(e, inputName, val);

    if (inputName === 'password') {
      setValues({
        ...values,
        password: password,
      });
    } else {
      setValues({
        ...values,
        [inputName]:val,
      })
    }
    
  }

  return(
    <div className="App">
    <div className="index">
      <div className="colmask">
      <div className="container">
      <div className="row">
        <div className="col-md-12 mrgnbtm">
          <h2>Register User</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input {...register('name')} placeholder="Name" className="form-control" name="name" id="name" required onChange={handleChange}/>
            {
              errors.name && <h3 className="error">{errors.name}</h3>
            }

            <label>Email</label>
            <input {...register('email')} placeholder="Email" className="form-control" name="email" id="email" required onChange={handleChange}/>
            {
              errors.email && <h3 className="error">{errors.email}</h3>
            }

            <label>Password</label>
            <input {...register('password')} type="password" placeholder="Password" className="form-control" name="password" id="password" required onChange={handleChange}/>
            {
              errors.password && <h3 className="error">{errors.password}</h3>
            }

            <input type="submit" className="btn btn-danger mrgntm"/>
          </form>
        </div>
      </div>
    </div>
      </div>"
    </div>
    </div>
    
  )
}