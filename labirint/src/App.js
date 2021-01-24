import './components/js/canvas'
import './App.css';
import './components/sass/page.scss';
import './components/sass/menu.scss';
import './components/sass/footer.scss';
import './components/sass/header.scss';
import Header from './components/jsx/Header';
import Menu from './components/jsx/Menu';
import Footer from './components/jsx/Footer';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}
// глобальная переменная апп, контейнер пикси
console.log(window.app);
// console.log(document.body)
export default App;
