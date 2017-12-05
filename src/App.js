  import React, { Component } from 'react';
  import { View, Text } from 'react-native';
  import { Provider } from 'react-redux';
  import { createStore, compose, composeEnhancers, applyMiddleware } from 'redux';
  import ReduxThunk from 'redux-thunk';
  import reducers from './reducers';
  import HomeScreen from './screens/HomeScreen'
  import FlatListDemo from './screens/FlatListDemo'

  export default class App extends Component<{}> {
    componentWillMount() {
    }

    render() {
      const middleware = [ReduxThunk];
      const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      const enhancer = composeEnhancers(applyMiddleware(...middleware));
      const store = createStore(reducers, {}, enhancer);
      return (
        <Provider store={store}>
          <FlatListDemo />
        </Provider>
      );
    }
  }
