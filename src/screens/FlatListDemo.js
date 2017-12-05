import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import FastImage from "react-native-fast-image";
import MasonryList from "@appandflow/masonry-list";
import LinearGradient from "react-native-linear-gradient";
import _ from "lodash";
const uuidv4 = require("uuid/v4");
const { height, width } = Dimensions.get("window");
var deepcopy = require("deepcopy");
import { connect } from "react-redux";
import { init } from "../actions";


const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`;
};

class Cell extends PureComponent {

  render() {
    const { item } = this.props;
    return (
      <View style={{ marginHorizontal: 5 }}>
        <FastImage
          style={{ height: item.height }}
          source={{
            uri: item.uri,
            headers: { Authorization: "someAuthToken" },
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          <LinearGradient
            colors={["transparent", "white"]}
            locations={[0.4, 1.2]}
            style={styles.linearGradient}
          >
            <View style={styles.itemtextArea}>
              <View style={styles.itembackdropView}>
                <Text style={styles.itemNameline}>{item.caption}</Text>
              </View>
            </View>
          </LinearGradient>
        </FastImage>
      </View>
    );
  }
}
class FlatListDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false
    };
    makeRemoteRequest = this.makeRemoteRequest.bind(this);
    onEndReachedCalledDuringMomentum = true;
    this.props.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialData !== this.props.initialData) {
      this.makeRemoteRequest(nextProps.initialData);
    }
  }

  makeRemoteRequest = (data) => {
    if(data && data.length > 0) {
      this.setState({ loading: true });
      var appendedData = deepcopy(data);
      _.map(appendedData, function(e, i) {
        height = Math.round(Math.random() * 100 + 100);
        return _.extend(e, { index: uuidv4(), height: height });
      });
      this.setState({
        loading: false,
        refreshing: false,
        data: [...this.state.data, ...appendedData]
      });
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.makeRemoteRequest();
      this.onEndReachedCalledDuringMomentum = true;
    }
  };

  renderSeparator = () => {
    return <View style={styles.headercontent} />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.footcontent}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flexGrow: 1, backgroundColor: "white" }}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <MasonryList
            data={this.state.data}
            renderItem={({ item }) => <Cell item={item} />}
            keyExtractor={item => item.index}
            ItemSeparatorComponent={this.renderSeparator}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReachedThreshold={0.5}
            getHeightForItem={({ item }) => item.height + 2}
            onEndReached={this.handleLoadMore}
            numColumns={3}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  footcontent: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  },
  headercontent: {
    height: 10,
    backgroundColor: "#FFFFFF"
  },
  gradient: {
    width: 200,
    height: 200
  },
  linearGradient: {
    flex: 1
  },
  itemtextArea: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start"
  },
  itembackdropView: {
    height: 25,
    backgroundColor: "rgba(0,0,0,0.0)"
  },
  itemNameline: {
    fontSize: 20,
    textAlign: "center",
    color: "white"
  }
});

const mapStateToProps = state => {
  const initialData =
    state.initialReducer.initialData &&
    state.initialReducer.initialData.length > 0
      ? state.initialReducer.initialData
      : [];
  return {
    initialData
  };
};

export default connect(mapStateToProps, {
  init
})(FlatListDemo);
