import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Raw from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from "../Components/Rating";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Store } from "../Context";



const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false }; //data comming from action
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function ProductScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const { slug } = params;

    const [{ loading, error, product }, dispatch] = useReducer(reducer,
        { loading: true, product: [], error: '' });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const rst = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: rst.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message });
            }
        }
        fetchData();
    }, [slug])

    const { state, dispatch: myDispatch } = useContext(Store);
    const { cart } = state;

    const addToCart = async () => {
        const existItem = cart.cartItems.find(x => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const data = await axios.get(`/api/products/${product._id}`);
        if (data.countInStack < quantity) {
            window.alert('Out of stock!');
            return;
        }
        myDispatch({
            type: "ADD_CART", payload: { ...product, quantity },
        });

        navigate('/cart');
    }
    function aveRate(rtg) {
        if (rtg) {
            let sum = 0;
            for (let each of rtg) {
                sum += each
            }
            return Math.round(sum / (rtg.length));
        }
    }

    function reviews(numRev) {
        if (numRev) {
            return numRev.length
        }
    }



    return (
        loading ? <div>Loading...</div>
            : error ? < div > {error}</div >
                : (
                    <div>
                        <Raw>
                            <Col md={6}>
                                <img src={product.image} alt={product.name} className="img-large" />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h1>{product.name}</h1>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            rating={aveRate(product.rating)}
                                            numReviews={reviews(product.rating)}
                                        ></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                                    <ListGroup.Item>Description : <p>{product.description}</p></ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Raw>
                                                    <Col>Price:</Col>
                                                    <Col>${product.price}</Col>
                                                </Raw>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Raw>
                                                    <Col>Status:</Col>
                                                    <Col>
                                                        {product.countInStack > 0 ?
                                                            <Badge bg="success">In stock</Badge>
                                                            :
                                                            <Badge bg="danger">Out of Stock</Badge>
                                                        }
                                                    </Col>
                                                </Raw>
                                            </ListGroup.Item>
                                            {product.countInStack > 0 && (
                                                <ListGroup.Item>
                                                    <div className="d-grid">
                                                        <Button onClick={addToCart} variant="primary"> Add to cart</Button>

                                                    </div>
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Raw>

                    </div >
                )
    );
}

export default ProductScreen;