import { useState } from "react";

type CategoriesProps = {
  value: number;
  onClickCategoryValue: any;
};
export const Categories: React.FC<CategoriesProps> = ({
  value,
  onClickCategoryValue,
}) => {
  const categoryArray = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <nav className="categories">
      <ul>
        {categoryArray.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategoryValue(index)}
              className={value === index ? "active" : ""}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
