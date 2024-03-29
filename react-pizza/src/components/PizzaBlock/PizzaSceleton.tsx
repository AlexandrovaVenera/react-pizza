import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSceleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="138" cy="120" r="120" />
    <rect x="0" y="260" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="310" rx="6" ry="6" width="280" height="88" />
    <rect x="0" y="412" rx="10" ry="10" width="95" height="32" />
    <rect x="128" y="412" rx="10" ry="10" width="152" height="42" />
  </ContentLoader>
);

export default PizzaSceleton;
