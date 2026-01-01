import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="app-container">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/restaurant/:id" element={<RestaurantMenu />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
