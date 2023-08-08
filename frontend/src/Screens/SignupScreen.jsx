import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// import { Store } from '../Context';
import { toast } from "react-toastify";

function SignupScreen() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : "/";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // const { state, dispatch: myDispatch } = useContext(Store);
    // const { userInfo } = state;

    const submithandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Password mismatch');
            return;
        }
        try {
            const { data } = await axios.post('/api/users/signup', {
                name,
                email,
                password,
            });
            if (!data.success) {
                toast.error(data.data);

            }
            else {
                navigate('/signin');
            }
        } catch (error) {
            toast.error('Invalid email or password! Try again');
        }
    };

    return (
        <Container className="signin-container">
            <div className="signup-box">
                <h1 className="liyu">Sign Up</h1>
                <Form onSubmit={submithandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" required onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <div className="liyu">
                            <Button type="submit" className="btn btn-primary btn-action">Sign Up</Button>
                        </div>
                    </div>
                    <div className="mb-3">
                        Already have an account?{' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default SignupScreen;
