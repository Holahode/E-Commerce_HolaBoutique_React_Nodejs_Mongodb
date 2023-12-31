import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

function SearchComponent() {
    const navigate = useNavigate();
    const [target, setTarget] = useState('');


    const submitHandler = (e) => {
        e.preventDefault();
        navigate(`/product/${target}`);
    };
    return (
        <div>
            <Form className="d-flex me-auto" onSubmit={submitHandler}>
                <InputGroup>
                    <FormControl
                        type="text"
                        name="q"
                        id="q"
                        onChange={(e) => setTarget(e.target.value)}
                        placeholder="search products..."
                        aria-label="Search Products"
                        aria-describedby="button-search"
                    ></FormControl>
                    <Button variant="outline-primary" type="submit" id="button-search">
                        <i className="fas fa-search"></i>
                    </Button>
                </InputGroup>
            </Form>
        </div>
    )
}
export default SearchComponent;

