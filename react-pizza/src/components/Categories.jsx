import { useState } from 'react';
export function Categories() {
  const categoryArray = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const [indexActive, setIndexActive] = useState(0);

  const changeActive = (index) => {
    return setIndexActive(index);
  };

  return (
    <nav className="categories">
      <ul>
        {categoryArray.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => changeActive(index)}
              className={indexActive === index ? 'active' : ''}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
