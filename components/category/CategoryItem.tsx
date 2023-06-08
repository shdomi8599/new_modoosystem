import { useState } from "react";
import styled from "styled-components";

const CategoryItem = ({ categori }: { categori: string[] }) => {
  const [category, setCategory] = useState(false);
  const categoryOver = () => {
    setCategory(true);
  };
  const categoryOut = () => {
    setCategory(false);
  };
  return (
    <Box onMouseOver={categoryOver} onMouseOut={categoryOut}>
      {category ? (
        <ul>
          {categori.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      ) : (
        <span>설치제품</span>
      )}
    </Box>
  );
};

export default CategoryItem;

const Box = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 4px;
`;
