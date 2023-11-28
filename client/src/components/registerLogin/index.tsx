import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// MUI
import { styled } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// 리덕스
import { useThunkDispatch } from '../../thunk';
import { loginUser } from '../../actions/user_action';
import { LoginData } from '../../actions/types';
import { LoginState } from '../../reducers/user_reducer';


const LoginTextField = styled(TextField)({
    'display': 'block',
    'width': '100%',
})

interface LoginValue extends LoginData {
    errors: string[];
}

const RegisterLogin = () => {

    const dispatch = useThunkDispatch<LoginState>();
    const navigate = useNavigate();

    const [ values, setValues ] = React.useState<LoginValue>({
        email: '',
        password: '',
        errors: []
    });

    const isFormValid = ({ email, password }: LoginData) => {
        return email && password;
    }

    const submitHandler = (event:React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault();

        const dataSubmit = {
            email: values.email,
            password: values.password,
        };

        if (isFormValid(values)) {
            setValues({
                ...values,
                errors: []
            });

            dispatch(loginUser(dataSubmit))
            .then(res => {
                if (res.loginSuccess) {
                    navigate('/');

                } else {
                    setValues({
                        ...values,
                        errors: [
                            ...values.errors,
                            '로그인에 실패했어요! 이메일이나 비밀번호를 확인해 보세요!'
                        ]
                    })
                }
            })

        } else {
            setValues({
                ...values,
                errors: [
                    ...values.errors,
                    '유효한 값이 아닙니다!'
                ]
            })
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
            <h1>Login</h1>
            <div>
                <Box
                    component="form" 
                    onSubmit={ submitHandler }
                    noValidate
                    autoComplete="off"
                >
                    <div className='input-field'>
                        <LoginTextField 
                            id="email"
                            label="Email"
                            name='email'
                            type="email"
                            value={ values.email }
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
                            Login
                        </Button>
                        <Link to="/register">
                            <Button
                                type='button'
                                name='action'
                                variant="contained"
                            >
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </Box>
            </div>
        </Container>
    )
}

export default RegisterLogin;