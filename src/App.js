import './App.css';
import Header from './components/estructura/Header';
import Footer from './components/estructura/Footer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

//importo componentes que se veran en las distintas rutas
import Home from './components/paginas/Home';

function App() {
  return (
    <div className="App">
      {/*======= importa el header =======*/}
      <Header />

      {/*======= Crea las rutas que se van a ver dependiendo la url =======*/}
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Home}/>
          </Routes>
        </BrowserRouter>

      {/*======= importa el footer =======*/}
      <Footer />
    </div>
  );
}

export default App;
