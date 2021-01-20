import './components/js/canvas'
import './App.css';
import './components/css/page.scss';
import './components/css/menu.scss';
import './components/css/footer.scss';
import Menu from './components/js/Menu';
import Footer from './components/js/Footer';

function App() {
  return (
    <div className="wrapper">
      <Menu />
      <Footer />
    </div>
  );
}
// глобальная переменная апп, контейнер пикси
console.log(window.app);
// console.log(document.body)
export default App;
