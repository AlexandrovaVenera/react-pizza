import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useState, useEffect } from 'react';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({
    name: 'популярности (asc)',
    sortProperty: '-rating',
  });
  const [categoryId, setCategoryId] = useState(0);
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  useEffect(() => {
    fetch(
      `https://64e8873499cf45b15fdfb707.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategoryValue={(i) => setCategoryId(i)}
          />
          <Sort
            value={sortType}
            onClickSortType={(i) => setSortType(i)}
          />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((el, i) => {
                return <PizzaSceleton key={i} />;
              })
            : items.map((el, index) => {
                return (
                  <PizzaBlock
                    key={el.id}
                    {...el}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export { Home };
