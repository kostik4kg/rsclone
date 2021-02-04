import './components/js/canvas'
import './App.css';
import './components/sass/page.scss';
import Game from './components/_Game/Game'
import Header from './components/_Header/Header';
import Menu from './components/_Menu/Menu';
import Footer from './components/_Footer/Footer';
import Cover from './components/_Cover/Cover';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import go from './components/js/go';
import Settings from './components/_Settings/Settings';
import About from './components/_About/About';

function App() {
  window.addEventListener('load', go);
  return (
    <Router>
      <div className="wrapper">

        <Header />

        <Switch>
          <Route exact path='/'>
            <Cover />
            <Menu />
          </Route>

          <Route path='/Start'>
            <Game />
          </Route>

          <Route path='/Menu'>
            <Cover />
            <Menu />
          </Route>

          <Route path='/About'>
            <About />
            <Cover />
          </Route>

          <Route path='/Settings'>
            <Settings />
            <Cover />
          </Route>

        </Switch>

        <Footer />

      </div>

    </Router>
  );
}

export default App;
