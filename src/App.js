import './App.css';
import { Route, Switch } from 'react-router-dom';
import SideNavBar from './components/SideNavBar';
import Home from './components/Home';
import Products from './components/Products';
import ProductForm from './components/ProductForm';
import Suppliers from './components/Suppliers';

function App() {
  return (
    <div>
      <div>
        <SideNavBar />
      </div>
      <main className="container" style={{ maxWidth: '92%' }}>
        <Switch>
          {/* <Route path="/suppliers/:id" component={ProductForm} /> */}
          <Route path="/suppliers" component={Suppliers} />
          <Route path="/products/:id" component={ProductForm} />
          <Route path="/products/new" component={ProductForm} />
          <Route path="/products" component={Products} />
          <Route path="/" exact component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
