import Container from "react-bootstrap/esm/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { Store } from '../Context';
import { toast } from "react-toastify";
import bcrypt from 'bcryptjs';

function SigninScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : "/";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch: myDispatch } = useContext(Store);
    const { userInfo } = state;


    const submithandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            if (!data) {
                toast.error('Invalid email or password! Please check your credentials.');
                return;
            }

            const isEmailCorrect = data.email === email;
            const isPasswordCorrect = bcrypt.compareSync(password, data.password);

            if (!isEmailCorrect || !isPasswordCorrect) {
                toast.error('Invalid email or password! Please check your credentials.');
                return;
            }

            myDispatch({ type: "USER-SIGNIN", payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (error) {
            toast.error('An error occurred during sign-in. Please try again later.');
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]
    )

    return (
        <Container className="signin-container">
            <div className="signin-box">
                <h1 className="liyu">Sign In</h1>
                <Form onSubmit={submithandler}>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <div className="liyu">
                            <Button type="submit" className="btn btn-primary btn-action" >Sign In</Button>
                        </div>
                    </div>
                    <div className="mb-3">
                        New Customer? {' '}
                        <Link to={`/signup?redirect=${redirect}`}>create new account</Link>
                    </div>
                </Form>

            </div >
        </Container >
    )
}

export default SigninScreen;