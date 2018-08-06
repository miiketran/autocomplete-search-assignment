import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  SearchContainer,
  SearchInput,
  TypeText,
  Ul,
} from './styled-components-file';
import { mapObject, flatten } from 'underscore';
import { SearchResultList } from './components/SearchResultList';
class CustomSearchbox extends Component {
  state = {
    // displayData used to help categorize type
    displayData: [],
    // controlled input value
    inputValue: '',
    // searchedTerm used in search results
    searchedTerm: '',
    // navigationData used to scroll through with keyboard
    navigationData: [],
    highlightedIndex: '',
    disableRenderSearch: false,
    navHighlight: false,
    navIndex: 0,
  };
  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value,
      disableRenderSearch: false,
      navHighlight: false,
    });
  };
  handleKeyNavigation = (e, displayData, navHighlight, navIndex) => {
    // handle downclick
    if (e.keyCode === 40) {
      // current target + 1. If > max, go back to 0.
      this.setState(previousState => {
        const newNavIndex = previousState.navIndex + 1;
        // reset target if pass navigationData size
        if (newNavIndex > previousState.navigationData.length - 1) {
          return {
            navIndex: 0,
            inputValue: previousState.navigationData[0].name,
            disableRenderSearch: true,
            navHighlight: true,
          };
        }
        return {
          navIndex: newNavIndex,
          inputValue: previousState.navigationData[newNavIndex].name,
          disableRenderSearch: true,
          navHighlight: true,
        };
      });
    }

    // handle upclick
    else if (e.keyCode === 38) {
      this.setState(previousState => {
        const newNavIndex = previousState.navIndex - 1;
        const navigationDataLength = previousState.navigationData.length;
        // reset target if < 0
        if (newNavIndex < 0) {
          return {
            navIndex: navigationDataLength - 1,
            inputValue:
              previousState.navigationData[navigationDataLength - 1].name,
            disableRenderSearch: true,
          };
        }
        return {
          navIndex: newNavIndex,
          inputValue: previousState.navigationData[newNavIndex].name,
          disableRenderSearch: true,
        };
      });
    }
    // handle enter key if item highlighted
    else if (e.keyCode === 13) {
      if (navHighlight && displayData[navIndex].url) {
        window.open(displayData[navIndex].url);
      }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    // run search if user typed versus keyboard navigating down the list
    if (
      this.state.inputValue !== prevState.inputValue &&
      !this.state.disableRenderSearch
    ) {
      // filter data, then limit to 8, then categorize data
      const mappedFilteredData = this.mapDataToTypes(
        this.limitDisplayData(this.filterData(this.state.inputValue), 8),
      );
      const navigationData = flatten(Object.values(mappedFilteredData));
      // first item should be what is actually typed, others are suggestions
      navigationData.unshift({
        name: this.state.inputValue,
      });
      this.setState({
        searchedTerm: this.state.inputValue,
        displayData: mappedFilteredData,
        navigationData: navigationData,
      });
    }
  }

  // Filter data to display items that include input value
  filterData = inputValue => {
    const newDisplayData = this.props.data.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase()),
    );
    return newDisplayData;
  };
  mapDataToTypes = data => {
    const mappedDisplayData = {};
    mapObject(data, function(val, key) {
      if (mappedDisplayData.hasOwnProperty(val.type)) {
        mappedDisplayData[val.type].push(val);
      } else {
        mappedDisplayData[val.type] = [val];
      }
    });
    // sort keys alphabetically
    return this.sortObjectByKeys(mappedDisplayData);
  };
  sortObjectByKeys = obj => {
    return Object.keys(obj)
      .sort()
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: obj[key],
        }),
        {},
      );
  };
  limitDisplayData = (displayData, numberOfItems) => {
    return displayData.slice(0, numberOfItems);
  };

  render() {
    return (
      <SearchContainer>
        <SearchInput
          fluid
          onChange={e => this.handleInputChange(e)}
          onKeyDown={e =>
            this.handleKeyNavigation(
              e,
              this.state.navigationData,
              this.state.navHighlight,
              this.state.navIndex,
            )
          }
          value={this.state.inputValue}
          placeholder="Search financial institution..."
        />
        {/* Only show results if non-empty input value*/}
        {this.state.inputValue !== '' ? (
          <SearchResultByTypeOrder
            // After result displayed, make hash map for unique type order then sort and display
            displayData={this.state.displayData}
            inputValue={this.state.inputValue}
            searchedTerm={this.state.searchedTerm}
            navIndex={this.state.navIndex}
            navHighlight={this.state.navHighlight}
          />
        ) : (
          ''
        )}
      </SearchContainer>
    );
  }
}

CustomSearchbox.propTypes = {
  data: PropTypes.array,
};

const SearchResultByTypeOrder = props => {
  const searchResultsByType = Object.entries(props.displayData)
    .sort()
    .map(function(arr, index, val) {
      const type = arr[0],
        dataInType = arr[1];
      return (
        <Fragment key={index}>
          <TypeText>{formatTypeText(type)}</TypeText>
          <SearchResultList
            data={dataInType}
            searchedTerm={props.searchedTerm}
            inputValue={props.inputValue}
            navIndex={props.navIndex}
            navHighlight={props.navHighlight}
          />
        </Fragment>
      );
    });
  return (
    <Ul>
      {/* Map out result by filtering through order provided */}
      {searchResultsByType}
    </Ul>
  );
};

SearchResultByTypeOrder.propTypes = {
  searchedTerm: PropTypes.string,
  inputValue: PropTypes.string,
  navIndex: PropTypes.number,
  navHighlight: PropTypes.bool,
};

const formatTypeText = type => {
  // Split multiple words into an array
  const typeWords = type.split('_');
  // format each word in the array
  for (let i = 0; i < typeWords.length; i++) {
    typeWords[i] = typeWords[i].charAt(0) + typeWords[i].slice(1).toLowerCase();
  }
  // join together words
  return typeWords.join(' ');
};

export default CustomSearchbox;
