import axios from "axios";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
    const navigate = useNavigate();
    const [slug, setSlug] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [countInStack, setCountInStack] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const [description, setDescription] = useState('');

    async function submithandler(e) {
        e.preventDefault();
        const productObj = { slug, name, image, price, countInStack, numReviews, description }
        let auth = JSON.parse(localStorage.getItem('userInfo'));
        let authToken;
        if (auth) {
            authToken = auth.token;
        }
        const response = await axios.post('/api/products/add', productObj, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        if (response.data.success) {
            cleanForm();
            navigate('/');
        }
        else {
            toast.error('This product is already exist');
        }
    }

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('userInfo'));
        if (auth && auth.isAdmin);
    });

    function cleanForm() {
        setSlug('');
        setName('');
        setImage('');
        setPrice(0);
        setCountInStack(0);
        setNumReviews(0);
        setDescription('');
    }

    return (
        <div className="product-form">
            <h1 className="liyu">Add Products</h1>
            <div className="container">
                <Form onSubmit={submithandler} className="product-form">
                    <Form.Group className="mb-3" controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" value={slug} required onChange={(e) => setSlug(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} required onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" value={image} required onChange={(e) => setImage(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={price} required onChange={(e) => setPrice(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="countInStack">
                        <Form.Label>Count-In-Stack</Form.Label>
                        <Form.Control type="number" value={countInStack} required onChange={(e) => setCountInStack(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="numReviews">
                        <Form.Label>NumReviews</Form.Label>
                        <Form.Control type="number" value={numReviews} required onChange={(e) => setNumReviews(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} required onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit" className="btn btn-primary btn-action">Add</Button>
                    </div>
                </Form>
            </div>
        </div >
    );
}
