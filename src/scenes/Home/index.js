import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { contains } from 'underscore';

import CustomSearchbox from '../../components/CustomSearchbox';
import data from '../../data/products_1.json';
const MainContainer = styled('div')`
  background: rgb(255, 255, 255);
  box-shadow: rgb(204, 204, 204) 0px 1px 2px;
  padding: 10px;
  height: 800px;
  max-width: 1200px;
  width: 80%;
  margin-left: auto !important;
  margin-right: auto !important;
  .search {
    padding: 10px 0;
    width: 500px;
  }
`;

const Home = () => {
  const removeDuplicates = (arr, prop) => {
    let obj = {};
    return Object.keys(
      arr.reduce((prev, next) => {
        if (!obj[next[prop]]) obj[next[prop]] = next;
        return obj;
      }, obj),
    ).map(i => obj[i]);
  };

  const cleansedData = removeDuplicates(data.products, 'url');
  return (
    <MainContainer>
      <CustomSearchbox data={cleansedData} />
    </MainContainer>
  );
};

Home.propTypes = {
  data: PropTypes.array,
};
export default Home;
