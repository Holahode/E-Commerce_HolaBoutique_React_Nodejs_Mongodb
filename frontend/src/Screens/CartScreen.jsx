import { useContext } from 'react';
import { Store } from '../Context';
import Raw from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: myDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCart = async (item, quantity) => {

    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStack < quantity) {
      window.alert('Out of stock!');
      return;
    }
    myDispatch({
      type: "ADD_CART", payload: { ...item, quantity },
    });
  }

  const removeItem = async (item) => {
    myDispatch({
      type: "REMOVE_ITEM", payload: item
    });
  }

  const checkOut = () => {
    navigate('/signin?redirect=/shipping');
  }

  return (
    <div>

      <h1>Shopping Cart</h1>
      <Raw>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div className="cart-empty-message">
              Cart is empty <Link to="/">Go Shopping</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map(item => (
                <ListGroup.Item key={item._id}>
                  <Raw className='align-items-center'>
                    <Col md={4}>
                      <img src={item.image} alt={item.name} className='img-fluid rounded img-cart'>
                      </img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 1}
                        onClick={() => updateCart(item, item.quantity - 1)}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button> {' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStack}
                        onClick={() => updateCart(item, item.quantity + 1)}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        variant="light"
                        disabled={item.quantity === 0}
                        onClick={() => removeItem(item)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Raw>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
          }
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>

              </ListGroup>
              <ListGroup.Item>
                <div className='d-grid'>
                  <Button
                    variant="primary"
                    disabled={cartItems.length === 0}
                    type='button'
                    onClick={() => checkOut()}
                  >Proceed to checkout</Button>
                </div>
              </ListGroup.Item>

            </Card.Body>
          </Card>
        </Col>
      </Raw>
    </div >
  );
}

export default CartScreen;
