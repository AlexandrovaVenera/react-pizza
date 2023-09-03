import { Categories } from "../components/Categories";
import { Sort, listSort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { useState, useEffect, useContext, useRef } from "react";
import PizzaSceleton from "../components/PizzaBlock/PizzaSceleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { SearchContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/Slice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";

function Home() {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
    fetch(
      `https://64e8873499cf45b15fdfb707.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty.replace(
        "-",
        ""
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
          {isLoading ? sceletons : pizzaItems}
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
