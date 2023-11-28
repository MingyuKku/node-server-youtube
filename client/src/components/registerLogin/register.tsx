import React from 'react'

// MUI
import { styled } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginTextField = styled(TextField)({
  'display': 'block',
  'width': '100%',
})

interface SignupValue {
  lastname: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  errors: string[];
}

const Register = () => {

  const [ values, setValues ] = React.useState<SignupValue>({
    lastname: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
  });

  const submitHandler = (event:React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const dataSubmit = {
      lastname: values.lastname,
      name: values.name,
      email: values.email,
      password: values.password,
    };

  }

  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    })
  }

  const displayErrors = (errors: string[]) => {
    return errors.map((err, i) => (
        <p key={ i }>{ err }</p>
    ))
  }

  return (
    <Container maxWidth="sm">
      <h1>Sign up</h1>
      <div>
          <Box
              component="form" 
              onSubmit={ submitHandler }
              noValidate
              autoComplete="off"
          >
              <div className='input-field'>
                  <LoginTextField 
                      id="lastname"
                      label="Lastname"
                      name='lastname'
                      type="text"
                      value={ values.lastname }
                      onChange={ changeHandler }
                      variant="standard"
                  />
                  <span
                      className='helper-text'
                      data-error="Type a right type email"
                      data-success="right"
                  ></span>
              </div>

              <br />
              <div className='input-field'>
                  <LoginTextField 
                      id="name"
                      label="Name"
                      name='name'
                      type="text"
                      value={ values.name }
                      onChange={ changeHandler }
                      variant="standard"
                      className='validate'
                  />
                  <span
                      className='helper-text'
                      data-error="wrong"
                      data-success="right"
                  ></span>
              </div>

              <br />
              <div className='input-field'>
                  <LoginTextField 
                      id="email"
                      label="Email"
                      name='email'
                      type="email"
                      value={ values.email }
                      onChange={ changeHandler }
                      variant="standard"
                      className='validate'
                  />
                  <span
                      className='helper-text'
                      data-error="wrong"
                      data-success="right"
                  ></span>
              </div>

              <br />
              <div className='input-field'>
                  <LoginTextField 
                      id="password"
                      label="Password"
                      name='password'
                      type="password"
                      value={ values.password }
                      onChange={ changeHandler }
                      variant="standard"
                      className='validate'
                  />
                  <span
                      className='helper-text'
                      data-error="wrong"
                      data-success="right"
                  ></span>
              </div>

              <br />
              <div className='input-field'>
                  <LoginTextField 
                      id="passwordConfirm"
                      label="Password Confirm"
                      name='password'
                      type="password"
                      value={ values.passwordConfirmation }
                      onChange={ changeHandler }
                      variant="standard"
                      className='validate'
                  />
                  <span
                      className='helper-text'
                      data-error="wrong"
                      data-success="right"
                  ></span>
              </div>

              <br />
              {
                  values.errors && values.errors.length > 0 && (
                      <div>
                          { displayErrors(values.errors) }
                      </div>
                  )
              }

              <br /><br />
              <div>
                  <Button
                      type='submit'
                      name='action'
                      variant="contained"
                      style={{
                          'marginRight': '20px'
                      }}
                  >
                      계정 생성하기
                  </Button>
              </div>
          </Box>
      </div>
  </Container>
  )
}

export default Register;