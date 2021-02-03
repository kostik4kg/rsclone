import './components/js/canvas'
import './App.css';
import './components/sass/page.scss';
// import './components/sass/menu.scss';
// import './components/sass/footer.scss';
// import './components/sass/header.scss';

import Game from './components/_Game/Game'


// import './components/sass/cover.scss';
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
    // <Router>
    <div className="wrapper">
      <Header />
      <Menu />
      {/* <Route path='/' component={Cover} /> */}
      <Footer />
      {/* <Cover /> */}

      <Game />
    </div>

    // {/* </Router> */}
  );
}
// глобальная переменная апп, контейнер пикси
console.log(window.app);
// console.log(document.body)
export default App;
