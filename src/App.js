import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import CataloguePage from './pages/CataloguePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import OrderPage from './pages/OrderPage'
import {ToastContainer} from 'react-toastify';
import ProductDisplayPage from './pages/ProductDisplayPage';
import RequireAuth from './components/RequireAuth';
import AdminPage from './pages/AdminPage';
import AddProductPage from './pages/AddProductPage';
import AdminViewUserPage from './pages/AdminViewUserPage';
import AdminViewProductPage from './pages/AdminViewProductPage';
import RequireAdmin from './components/RequireAdmin';
import SearchResultPage from './pages/SearchResultPage';
import NotFoundPage from './pages/NotFoundPage';
import InternalServerErrorPage from './pages/InternalServerErrorPage';

function App() {
  return ( <> <Routes>
    <Route exact path='/' element={< HomePage />}/>
    <Route path='/products/:category' element={< CataloguePage />}/>
    <Route path='/login' element={< LoginPage />}/>
    <Route path='/signup' element={< SignupPage />}/>
    <Route path='/product/:productId' element={< ProductDisplayPage />}/>
    <Route path='/search/:searchQuery' element={<SearchResultPage/>}/>
    <Route path='/error' element={<InternalServerErrorPage/>}/>

    <Route element={<RequireAdmin/>}>
      <Route exact path='/admin' element={<AdminPage/>}/>
      <Route exact path='/admin/addProduct' element={<AddProductPage/>}/>
      <Route exact path='/admin/users/:id' element={<AdminViewUserPage/>}/>
      <Route exact path='/admin/products/:id' element={<AdminViewProductPage/>}/>
    </Route>

    <Route element={< RequireAuth />}>
      <Route path='/account' element={< AccountPage />}/>
      <Route path='/cart' element={< CartPage />}/>
      <Route path='/order' element={< OrderPage />}/>
    </Route>

    <Route path='*' element={<NotFoundPage/>}/>


  </Routes> 
  < ToastContainer 
    autoClose={1500}
    closeOnClick
    pauseOnHover
  /> </>);
}

export default App;
