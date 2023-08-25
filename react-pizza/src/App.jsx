import './App.css';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import './scss/app.scss';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';
import items from './assets/db.json';

function App() {
  console.log(items);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((el, index) => {
              return (
                <PizzaBlock
                  key={el.id}
                  {...el}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;