import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext, useEffect } from 'react';
import { Store } from './Context';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingScreen from './Screens/ShippingScreen';
import SignupScreen from './Screens/SignupScreen';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
import PaymentScreen from './Screens/PaymentScreen';
import ErrorComponent from './Components/ErrorComponent';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import backgroundImage from './Images/k7.jpeg';
import SearchComponent from './Components/SearchComponent';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageComponent from './Components/LanguageComponent';

function App() {
  const { t } = useTranslation();

  const { state, dispatch: myDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {

    myDispatch({ type: 'USER-SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/';
  }

  return (
    <BrowserRouter>
      < div className='d-flex flex-column list-container' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '240vh' }}>
        <ToastContainer position='bottom-center' limit={1} />
        <header className='myHeader'>
          <Nav>
            <Navbar bg="dark" variant="dark" fixed="top" >
              <Navbar.Brand>
                <LanguageComponent /><div>{t('greeting')} {t('welcome')}</div>
              </Navbar.Brand>
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand className=''>Home</Navbar.Brand>
                </LinkContainer><SearchComponent />
                <Nav>

                  <Link to="/cart" className='nav-link'>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='basic-nav-dropdown'>
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order history</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link to="#signout" className='dropdown-item' onClick={signoutHandler}>Sign out</Link>
                    </NavDropdown>

                  ) : (
                    <Link to="/signin" className='nav-link'>Sign in</Link>
                  )}
                </Nav>

              </Container>
            </Navbar>
          </Nav>
        </header><br />
        <main className='mt-4' style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '15px' }}>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update" element={<UpdateProduct />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </Container>
        </main >
        <footer>
          <Row className="scrolling-text-container">
            <Col>
              <h6>Email: abaynehmichael@myyahoo.com</h6>
            </Col>
            <Col>
              <h6>Address: kebele direjitu bishaoftu, Ethiopia</h6>
            </Col>
            <Col>
              <h6>Mob:+251 911412186</h6>
            </Col>
          </Row>
        </footer>
      </div >
    </BrowserRouter >
  );
}

export default App;
