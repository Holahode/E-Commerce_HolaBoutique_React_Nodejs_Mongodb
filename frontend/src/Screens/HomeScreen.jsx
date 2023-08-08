import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Product from '../Components/Product';
import { useNavigate } from 'react-router-dom';


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }; //data comming from action
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function HomeScreen() {
    const [{ loading, error, products }, dispatch] = useReducer(reducer, { loading: true, products: [], error: '' });
    const navigate = useNavigate();
    let [auth, setAuth] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const rst = await axios.get("/api/products");
                dispatch({ type: 'FETCH_SUCCESS', payload: rst.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
            }
        }
        fetchData();
    }, [])

    useEffect(() => {

        const rst = JSON.parse(localStorage.getItem('userInfo'));
        if (rst && rst.isAdmin) {
            setAuth(false);
        }

    }, [])
    const addpro = () => {
        navigate('/add');

    }
    return (
        <div>
            <h1 className='text-center'>Top Picks</h1>
            <Row><Button onClick={addpro} hidden={auth}>Add Products</Button></Row>
            <div className='listItems'>
                {
                    loading ? <div>Loading...</div>
                        : error ? <div>{error}</div>
                            : (
                                <Row>
                                    {products.map(product => (
                                        <Col key={product.slug} className="mb-3" sm={6} md={3} lg={3}>
                                            <div className='proList'><Product product={product}></Product></div>
                                        </Col>
                                    ))}
                                </Row>
                            )}
            </div>

        </div>
    )
}

export default HomeScreen;