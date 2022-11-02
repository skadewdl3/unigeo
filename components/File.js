import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fileNames: {
    color: '#000',
  },
});

const File = ({name, icon}) => {
  return (
    <View>
      {icon ? <Text>{icon}</Text> : null}
      <Text style={{...styles.fileNames}}>{name}</Text>
    </View>
  );
};

export default File;
