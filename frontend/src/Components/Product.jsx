import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Context';


function Product(props) {
    const { product } = props;
    const { state, dispatch: myDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;
    const navigate = useNavigate();
    const [auth, setAuth] = useState(true);
    const { search } = useLocation();
    const redirect = new URLSearchParams(search).get('redirect') ?? "/";

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


    const addToCart = async (item) => {
        const existItem = cartItems.find(x => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStack < quantity) {
            window.alert('Out of stock!');
            return;
        }
        myDispatch({
            type: "ADD_CART", payload: { ...item, quantity },
        });
    }

    const editProduct = (item) => {

        navigate('/update', { state: item })
    }

    const deleteProduct = async (item) => {
        let auth = JSON.parse(localStorage.getItem('userInfo'));
        let authToken;
        if (auth) {
            authToken = auth.token;
        }
        const response = await axios.delete(`/api/products/delete/${item._id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        window.location.reload();
        console.log(response);
    }

    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('userInfo'));
        if (isAdmin && isAdmin.isAdmin) {
            setAuth(false)
        }
    }, [])

    return (
        <div className="bbb">
            <Card >
                <Link to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Rating rating={aveRate(product.rating)} numReviews={reviews(product.rating)} slug={product.slug} />
                    <Card.Text>${product.price}</Card.Text>
                    <div>
                        <div hidden={!auth}>
                            {product.countInStack === 0 ?
                                <Button variant="light" disabled className='localFont'>OutofStock</Button>
                                :
                                <Button onClick={() => addToCart(product)} className="btn btn-info btn-action">Add to cart</Button>
                            }
                        </div>
                        <div hidden={auth}>
                            <Button onClick={() => editProduct(product)} className="btn btn-primary btn-action">Edit</Button>
                            <Button onClick={() => deleteProduct(product)} className="btn btn-danger btn-action">Delete</Button>
                        </div></div>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Product;