import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

import BookItem from './BookItem';

const API_KEY = '73b19491b83909c7e07016f4bb4644f9:2:60667290';
const QUERY_TYPE = 'hardcover-fiction';
const API_STEM = 'http://api.nytimes.com/svc/books/v3/lists'
const ENDPOINT = `${API_STEM}/${QUERY_TYPE}?response-format=json&api-key=${API_KEY}`;

class BookList extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount() {
    this._refreshData();
  }

  _renderRow(rowData) {
    return <BookItem coverURL={rowData.book_image} title={rowData.title} author={rowData.author}/>;
  }

  _refreshData() {
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rjson.results.books)
        });
      });
  }

  render() {
    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingTop: 0
  },
  list: {
    flex: 1,
    flexDirection: 'row'
  },
  listContent: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#000000'
  }
});

export default BookList;
