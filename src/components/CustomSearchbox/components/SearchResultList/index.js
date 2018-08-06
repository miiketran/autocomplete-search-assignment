import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const Li = styled('li')`
  line-height: 3;
  padding: 0 15px;
  &:.highlight {
    background-color: #85b7d9;
  }
  &:hover {
    cursor: pointer;
    background-color: #85b7d9;
  }
`;
// conditional style for keyboard navigation
const liStyle = {
  backgroundColor: '#85b7d9',
};
export const SearchResultList = props => {
  return (
    <Fragment>
      {props.data.length > 0
        ? props.data.map((item, index) => (
            <SearchResultItem
              key={index}
              name={item.name}
              url={item.url}
              type={item.type}
              searchedTerm={props.searchedTerm}
              navHighlight={
                props.navHighlight && props.inputValue === item.name
              }
            />
          ))
        : ''}
    </Fragment>
  );
};

SearchResultList.propTypes = {
  data: PropTypes.array,
  searchedTerm: PropTypes.string,
  inputValue: PropTypes.string,
  navIndex: PropTypes.number,
  navHighlight: PropTypes.bool,
};
const SearchResultItem = props => {
  const searchedTermStartIndex = props.name
      .toLowerCase()
      .indexOf(props.searchedTerm.toLowerCase()),
    searchedTermEndIndex = searchedTermStartIndex + props.searchedTerm.length,
    textBeforeInputValue = props.name.slice(0, searchedTermStartIndex),
    searchedTerm = props.name.slice(
      searchedTermStartIndex,
      searchedTermEndIndex,
    ),
    textAfterInputValue = props.name.slice(
      searchedTermEndIndex,
      props.name.length,
    ),
    handleItemClick = url => {
      window.open(url);
    };
  return (
    <Li
      style={props.navHighlight ? liStyle : null}
      onClick={() => handleItemClick(props.url)}
    >
      <strong>{textBeforeInputValue}</strong>
      <span>{searchedTerm}</span>
      <strong>{textAfterInputValue}</strong>
    </Li>
  );
};

SearchResultItem.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  searchedTerm: PropTypes.string,
  navHighlight: PropTypes.bool,
};
