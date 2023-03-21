import './App.css';
import Header from './components/estructura/Header';
import Footer from './components/estructura/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//importo componentes que se veran en las distintas rutas
import Home from './components/paginas/Home';
import Tienda from './components/paginas/Tienda';
import Page404 from './components/paginas/Page404';
import Login from './components/paginas/Login';

function App() {
  
  return (
    <div className="App">
      {/*======= Crea las rutas que se van a ver dependiendo la url =======*/}
      <BrowserRouter>
        {/*======= importa el header =======*/}
        <Header />

        {/*======= creamos las rutas =======*/}
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route exact path='/tienda' Component={Tienda} />
          <Route exact path='/login' Component={Login} />
          <Route path='*' Component={Page404} />
        </Routes>
      </BrowserRouter>

      {/*======= importa el footer =======*/}
      <Footer />
    </div>
  );
}

export default App;
