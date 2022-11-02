import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {getTopLevelFolders} from './driveFunctions';
import File from './components/File';

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
});

const textStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
  },
});

const App = () => {
  const [files, setFiles] = useState([]);
  const [fileTree, setFileTree] = useState([]);
  useEffect(() => {
    fetch('https://unigeo.deta.dev/getfiles')
      .then(res => res.json())
      .then(data => setFiles(data.files))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setFileTree(getTopLevelFolders(files));
  }, [files]);

  return (
    <View style={{...styles.body}}>
      <View style={{...styles.navbar}}>
        <Text style={{...textStyles.title}}>
          <Text style={{color: '#2980b9'}}>Uni</Text>
          <Text style={{color: '#2ecc71'}}>Geo</Text>
        </Text>
        <View style={{...styles.separator}}></View>
      </View>
      {getTopLevelFolders(files).map(file => (
        <File name={file.name} key={file.id} />
      ))}
    </View>
  );
};

export default App;
