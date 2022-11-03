import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, StyleSheet, Animated, Easing} from 'react-native';
import File from './../components/File';

const styles = StyleSheet.create({
  navbar: {
    padding: 10,
    alignItems: 'center',
  },
  pathWrapper: {
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    width: '95%',
    borderRadius: 1,
    marginTop: 10,
  },
  headerSeparator: {
    height: 3,
    width: '100%',
    borderRadius: 1,
    marginBottom: 10,
  },
});

const textStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
  path: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

const StickyHeader = ({text, showSeparator}) => {
  let opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSeparator) {
      console.log('this ran');
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [showSeparator]);

  return (
    <View style={{...styles.pathWrapper}}>
      <Text style={{...textStyles.path}}>{text}</Text>
      <Animated.View
        style={{
          ...styles.headerSeparator,
          alignItems: 'center',
          backgroundColor: showSeparator ? '#eee' : '#fff',
          opacity,
        }}></Animated.View>
    </View>
  );
};

const Title = () => {
  return (
    <View style={{...styles.navbar}}>
      <Text style={{...textStyles.title}}>
        <Text style={{color: '#2980b9'}}>Uni</Text>
        <Text style={{color: '#2ecc71'}}>Geo</Text>
      </Text>
      <View style={{...styles.separator}}></View>
    </View>
  );
};

const FileList = ({stickyHeaderData, listData}) => {
  let renderData = [{id: 'title'}, {id: 'stickyHeader'}, ...listData];

  const [showHeaderSeparator, setShowHeaderSeparator] = useState(false);

  const updateHeader = ({nativeEvent: e}) => {
    if (e.contentOffset.y > 0) {
      setShowHeaderSeparator(true);
    } else {
      setShowHeaderSeparator(false);
    }
  };

  return (
    <FlatList
      onScroll={updateHeader}
      stickyHeaderIndices={[1]}
      data={renderData}
      renderItem={({item}) =>
        item.id === 'title' ? (
          <Title />
        ) : item.id === 'stickyHeader' ? (
          <StickyHeader
            {...stickyHeaderData}
            showSeparator={showHeaderSeparator}
          />
        ) : (
          <File name={item.name} id={item.id} />
        )
      }
      keyExtractor={item => item.id}
    />
  );
};

export default FileList;
