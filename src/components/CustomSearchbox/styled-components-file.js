import styled from 'styled-components';

export const SearchContainer = styled('div')`
  max-width: 500px;
  @media (max-width: 650px) {
    max-width: 80%;
  }
`;

export const SearchInput = styled('input')`
  margin: 0;
  width: 100%;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.21428571em;
  padding: 0.67857143em 1em;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  -webkit-transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
  -o-transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease;
  transition: box-shadow 0.1s ease, border-color 0.1s ease,
    -webkit-box-shadow 0.1s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
  &:focus {
    border-color: #85b7d9;
  }
`;

export const Ul = styled('ul')`
  list-style-type: none;
  margin-top: 5px;
  padding-left: 24px;
  width: 100%;
  // max-width: 100%;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-align: left;
  line-height: 1.21428571em;
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 0.28571429rem;
  box-shadow: none;
`;
export const Li = styled('li')`
  line-height: 3;
  padding: 0 15px;
  &:hover {
    cursor: pointer;
    background-color: #85b7d9;
  }
`;
export const TypeText = styled('li')`
  font-style: italic;
  margin-top: 4px;
`;
