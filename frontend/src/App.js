import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProductManagement from './Components/ProductManagement';
import ProductDetails from './Components/ProductDetails';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="product" />} />
          <Route path='/product' element={<ProductManagement />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
