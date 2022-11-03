import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, ScrollView} from 'react-native';
import {getTopLevelFolders} from './driveFunctions';
import File from './components/File';
import FileList from './layouts/FileList';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    height: '100%',
  },
  navbar: {
    padding: 10,
    // backgroundColor: '#6c5ce7',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    width: '95%',
    borderRadius: 1,
    marginTop: 10,
  },
  fileNameContainer: {
    paddingLeft: 20,
    paddingRight: 20,
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
  },
});

const App = () => {
  const [files, setFiles] = useState([]);
  const [fileTree, setFileTree] = useState([]);

  const stickyHeaderData = {
    text: 'Digital Library',
  };

  useEffect(() => {
    console.log('useEffect ran');
    fetch('https://unigeo.deta.dev/getfiles')
      .then(res =>
        res
          .json()
          .then(data => setFiles(data.files))
          .catch(err => console.log(err)),
      )
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // setFileTree(getTopLevelFolders(files));
    setFileTree(files);
  }, [files]);

  return (
    <View style={{...styles.body}}>
      <View style={{...styles.fileNameContainer}}>
        {/* {getTopLevelFolders(files).map(file => (
          <File name={file.name} key={file.id} />
        ))} */}
        <FileList stickyHeaderData={stickyHeaderData} listData={fileTree} />
      </View>
    </View>
  );
};

export default App;
