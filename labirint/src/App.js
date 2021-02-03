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
  Link
} from "react-router-dom";

function App() {
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

          {/* <Route path='/' component={Cover} />
          <Route path='/' component={Menu} />

          <Route path='/Start' component={Game} />

          <Route path='/Menu' component={Cover} />
          <Route path='/Menu' component={Menu} /> */}

        </Switch>

        <Footer />

      </div>

    </Router>
  );
}
// глобальная переменная апп, контейнер пикси
console.log(window.app);
// console.log(document.body)
export default App;
