import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuth from './contexts/auth';
import Login from './routes/Login';
import NotAuthorized from './routes/Generic/NotAuthorized';
import PageNotFound from './routes/Generic/PageNotFound';
import { Message } from './components/Message';
import { CategoryProvider } from './contexts/category';
import { LoadingScreen } from './components/Loading';
import Home from './routes/Home';
import Product from './routes/Product';
import CreateProduct from './routes/Product/CreateProduct';
import ProductDetails from './routes/Product/Details';
import Category from './routes/Category';
import CreateCategory from './routes/Category/CreateCategory';
import CategoryDetails from './routes/Category/Details';
import User from './routes/User';
import CreateUser from './routes/User/CreateUser';
import UserDetails from './routes/User/Details';
import UpdateSelf from './routes/User/UpdateSelf';
import StockMovement from './routes/StockMovement';
import CreateStockMovement from './routes/StockMovement/CreateStockMovement';
import StockMovementDetails from './routes/StockMovement/Details';
import ProductAlert from './routes/Product/Alert';
import Checkout from './routes/Checkout';
import Sale from './routes/Sale';
import SaleDetails from './routes/Sale/Details';
import SaleByDay from './routes/Sale/ByDay';
import SaleByMonth from './routes/Sale/ByMonth';
import UpdateUserPassword from './routes/User/UpdateUserPassword';
import UpdateSelfPassword from './routes/User/UpdateSelfPassword';

function App() {
  const { signed, loading, user } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  let path = '/';

  if (user) {
    const { role_name } = user;
    if (role_name === 'company') path = '/home';
    if (role_name === 'adm') path = '/home';
    if (role_name === 'user') path = '/checkout';
  }

  return (
    <CategoryProvider>
      <Message />
      <Router>
        {signed && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={signed ? <Navigate to={path} /> : <Login />}
          />

          <Route
            path="/home"
            element={
              user && user.role_name !== 'user' ? <Home /> : <NotAuthorized />
            }
          />

          <Route
            path="/product"
            element={
              user && user.role_name !== 'user' ? (
                <Product />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/product/create"
            element={
              user && user.role_name !== 'user' ? (
                <CreateProduct />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/product/:product_id"
            element={
              user && user.role_name !== 'user' ? (
                <ProductDetails />
              ) : (
                <NotAuthorized />
              )
            }
          />

          <Route
            path="/category"
            element={
              user && user.role_name !== 'user' ? (
                <Category />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/category/create"
            element={
              user && user.role_name !== 'user' ? (
                <CreateCategory />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/category/:category_id"
            element={
              user && user.role_name !== 'user' ? (
                <CategoryDetails />
              ) : (
                <NotAuthorized />
              )
            }
          />

          <Route
            path="/user"
            element={
              user && user.role_name !== 'user' ? <User /> : <NotAuthorized />
            }
          />
          <Route
            path="/user/create"
            element={
              user && user.role_name !== 'user' ? (
                <CreateUser />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/user/self"
            element={user ? <UpdateSelf /> : <NotAuthorized />}
          />
          <Route
            path="/user/self/password"
            element={user ? <UpdateSelfPassword /> : <NotAuthorized />}
          />
          <Route
            path="/user/password"
            element={user ? <UpdateUserPassword /> : <NotAuthorized />}
          />
          <Route
            path="/user/:user_id"
            element={
              user && user.role_name !== 'user' ? (
                <UserDetails />
              ) : (
                <NotAuthorized />
              )
            }
          />

          <Route
            path="/stock_movement"
            element={
              user && user.role_name !== 'user' ? (
                <StockMovement />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/stock_movement/create"
            element={
              user && user.role_name !== 'user' ? (
                <CreateStockMovement />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/stock_alert"
            element={
              user && user.role_name !== 'user' ? (
                <ProductAlert />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/stock_movement/:stock_movement_id"
            element={
              user && user.role_name !== 'user' ? (
                <StockMovementDetails />
              ) : (
                <NotAuthorized />
              )
            }
          />

          <Route
            path="/sale"
            element={
              user && user.role_name !== 'user' ? <Sale /> : <NotAuthorized />
            }
          />
          <Route
            path="/sale/day"
            element={
              user && user.role_name !== 'user' ? (
                <SaleByDay />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/sale/month"
            element={
              user && user.role_name !== 'user' ? (
                <SaleByMonth />
              ) : (
                <NotAuthorized />
              )
            }
          />
          <Route
            path="/sale/:sale_id"
            element={
              user && user.role_name !== 'user' ? (
                <SaleDetails />
              ) : (
                <NotAuthorized />
              )
            }
          />

          <Route
            path="/checkout"
            element={signed ? <Checkout /> : <NotAuthorized />}
          />

          {/* <Route
            path="/settings"
            element={signed ? <Settings /> : <NotAuthorized />}
          /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CategoryProvider>
  );
}

export default App;
