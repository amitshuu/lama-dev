import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import CategoryItem from './CategoryItem';
import { categories } from './data';

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  ${mobile({ flexDirection: 'column', padding: '0px' })}
`;

export default Categories;
