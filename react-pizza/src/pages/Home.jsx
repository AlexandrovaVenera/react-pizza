import { Categories } from "../components/Categories";
import { Sort, listSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { useState, useEffect, useContext, useRef } from "react";
import PizzaSceleton from "../components/PizzaBlock/PizzaSceleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { SearchContext } from "../App";
import { fetchPizzas, setItems } from "../redux/Slice/pizzaSlice";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home() {
  const { searchValue } = useContext(SearchContext);
  const { items, status } = useSelector((state) => state.pizza);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { sort, categoryId } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const onChangeCurrentPage = (id) => {
    dispatch(setCurrentPage(id));
  };
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };
  const isSearch = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSearch.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isSearch.current = false;
  }, [sort.sortProperty, categoryId, currentPage]);

  const sceletons = [...new Array(6)].map((el, i) => {
    return <PizzaSceleton key={i} />;
  });

  const pizzaItems = items.map((el, index) => {
    return <PizzaBlock key={el.id} {...el} />;
  });
  const pizzaSearchItems = searchValue
    ? items
        .filter((obj) =>
          obj.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((el) => {
          return <PizzaBlock key={el.id} {...el} />;
        })
    : pizzaItems;
  const search = searchValue ? searchValue : "";

  const getPizzas = () => {
    dispatch(fetchPizzas({ categoryId, sort, search, order, currentPage }));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort, searchValue, currentPage]);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategoryValue={onChangeCategoryId}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {status == "loading" ? sceletons : pizzaItems}
        </div>
        <Pagination
          currentPage={currentPage}
          onChangePage={onChangeCurrentPage}
        />
      </div>
    </>
  );
}

export { Home };
