import React from 'react'
import { useNavigate } from 'react-router-dom';

// MUI
import { styled } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// 리덕스
import { useThunkDispatch } from '../../thunk';
import { loginUser } from '../../_actions/user_action';

// 기타
import axios from 'axios';


const LoginTextField = styled(TextField)({
    '&&': {
        'display': 'block',
        'width': '100%',
    }
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

    const dispatch = useThunkDispatch<any>();
    const navigate = useNavigate();

    const [ values, setValues ] = React.useState<SignupValue>({
        lastname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
    });

    const isFormEmpty = ({ lastname, name, email, password, passwordConfirmation }: SignupValue) => {
        return (
            !lastname.length ||
            !name.length ||
            !email.length ||
            !password.length ||
            !passwordConfirmation.length
        );
    };

    const isPasswordValid = ({ password, passwordConfirmation }: SignupValue) => {
        if (
            password.length < 6 ||
            passwordConfirmation.length < 6
        ) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    const isFormValid = (values: SignupValue) => {
        let errors: any[] = [];
        
        if (isFormEmpty(values)) {
            errors = [
                ...errors,
                {
                    message: '모든 내용을 채워 주세요!'
                }
            ]
        } else if (!isPasswordValid(values)) {
            errors = [
                ...errors,
                {
                    message: '비밀번호가 잘못되었네요!'
                }
            ]
        } else {
            return true;
        }
    }

    const submitHandler = async (event:React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const dataSubmit = {
            lastname: values.lastname,
            name: values.name,
            email: values.email,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation
        };

        if (isFormValid(values)) {
            setValues({
                ...values,
                errors: []
            });

            const { data } = await axios.post('/api/users/register', {
                lastname: values.lastname,
                name: values.name,
                email: values.email,
                password: values.password
            })

            if (data.success) {
                dispatch(loginUser({
                    email: values.email,
                    password: values.password,
                }))
                .then(res => {
                    if (res.loginSuccess) {
                        navigate('/');
                    } 
                })
            }
        }
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
                        id="passwordConfirmation"
                        label="Password Confirm"
                        name='passwordConfirmation'
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