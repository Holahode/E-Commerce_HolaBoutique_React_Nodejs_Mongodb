import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Context';
import CheckOut from '../Components/CheckOut';

function ShippingScreen() {
    const navigate = useNavigate();
    const { state, dispatch: myDispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress }, } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [zip, setZip] = useState(shippingAddress.zip || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const submithandler = async (e) => {
        e.preventDefault();
        try {
            myDispatch({
                type: "SAVE-SHIPPING", payload: { fullName, address, city, zip, country }
            });
            localStorage.setItem('shippingAddress', JSON.stringify({ fullName, address, city, zip, country }));
            navigate('/payment')
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin?redirect=/shipping");
        }
    }, [navigate, userInfo]
    )

    return (
        <div ><CheckOut step1 step2></CheckOut>
            <h1>Shipping Address</h1>

            <div className="">
                <Form onSubmit={submithandler}>
                    <Form.Group className="mb-3" controlId="fullName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control value={fullName} required onChange={(e) => setFullName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control value={address} required onChange={(e) => setAddress(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} required onChange={(e) => setCity(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="zip">
                        <Form.Label>Zip Code</Form.Label>
                        <Form.Control value={zip} required onChange={(e) => setZip(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control value={country} required onChange={(e) => setCountry(e.target.value)} />
                    </Form.Group>
                    <div className="mb-3">
                        <Button type="submit" className='btn btn-primary btn-action'>Next</Button>
                    </div>
                </Form>
            </div >
        </div>
    )
}


export default ShippingScreen;