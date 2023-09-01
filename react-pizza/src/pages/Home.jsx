import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import { useState, useEffect } from 'react';
import PizzaSceleton from '../components/PizzaBlock/PizzaSceleton';
import Pagination from '../components/Pagination';

function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности (asc)',
    sortProperty: '-rating',
  });
  const [categoryId, setCategoryId] = useState(0);
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

  const sceletons = [...new Array(6)].map((el, i) => {
    return <PizzaSceleton key={i} />;
  });

  const pizzaItems = items.map((el, index) => {
    return (
      <PizzaBlock
        key={el.id}
        {...el}
      />
    );
  });
  const pizzaSearchItems = searchValue
    ? items
        .filter((obj) =>
          obj.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((el, index) => {
          return (
            <PizzaBlock
              key={el.id}
              {...el}
            />
          );
        })
    : pizzaItems;
  const search = searchValue ? searchValue : '';
  useEffect(() => {
    fetch(
      `https://64e8873499cf45b15fdfb707.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty.replace(
        '-',
        ''
      )}&order=${order}&search=${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
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
          {isLoading ? sceletons : pizzaItems}
        </div>
        <Pagination onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </>
  );
}

export { Home };
