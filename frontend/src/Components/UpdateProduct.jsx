import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from "react-router-dom";


export default function UpdateProduct() {
    const navigate = useNavigate();
    const [slug, setSlug] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [countInStack, setCountInStack] = useState('');
    const [description, setDescription] = useState('');
    const myData = useLocation()


    async function submithandler(e) {
        e.preventDefault();
        const productObj = { slug, name, image, price, countInStack, description }

        let auth = JSON.parse(localStorage.getItem('userInfo'));
        let authToken;
        if (auth) {
            authToken = auth.token;
        }
        const response = await axios.put(`api/products/update/${myData.state._id}`, productObj, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log(response);
        cleanForm();
        navigate('/');

    }

    useEffect(() => {
        const edited = myData.state;
        setSlug(edited.slug);
        setName(edited.name);
        setImage(edited.image);
        setPrice(edited.price);
        setCountInStack(edited.countInStack);
        setDescription(edited.description);
        const auth = JSON.parse(localStorage.getItem('userInfo'));
        if (auth && !auth.isAdmin) {
            navigate('/')
        }
    }, [navigate, myData.state])



    function cleanForm() {
        setSlug('');
        setName('');
        setImage('');
        setPrice(0);
        setCountInStack(0);
        setDescription('');
    }

    return (
        <div className="product-form">
            <h1 className="liyu">Edit Products</h1>
            <div className="container">
                <Form onSubmit={submithandler} className="product-form">
                    <Form.Group className="mb-3" controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control value={slug} required onChange={(e) => setSlug(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control value={image} required onChange={(e) => setImage(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="countInStack">
                        <Form.Label>Count-In-Stack</Form.Label>
                        <Form.Control value={countInStack} required onChange={(e) => setCountInStack(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={description} required onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit" className="btn btn-primary btn-action">Update</Button>

                    </div>
                </Form>
            </div >
        </div >

    )
} 