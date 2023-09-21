import { Categories } from "../components/Categories";
import { Sort, listSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import React, { useEffect, useRef } from "react";
import PizzaSceleton from "../components/PizzaBlock/PizzaSceleton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { fetchPizzas, setItems } from "../redux/Slice/pizzaSlice";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { RootState } from "../@types/type";

const Home: React.FC = () => {
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const { sort, categoryId, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const dispatch = useAppDispatch();
  const onChangeCurrentPage = (id: number) => {
    dispatch(setCurrentPage(id));
  };

  const onChangeCategoryId = (id: number) => {
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

  const pizzaItems = items.map((el, index: number) => {
    return <PizzaBlock key={el.id} {...el} />;
  });

  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? String(categoryId) : "";
    const search = searchValue ? searchValue : "";
    dispatch(
      fetchPizzas({
        category,
        sortBy,
        search,
        order,
        currentPage: String(currentPage),
      })
    );
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
};

export { Home };
