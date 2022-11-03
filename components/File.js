import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  fileNameText: {
    color: '#000',
    fontSize: 18,
    marginLeft: 10,
  },
  fileName: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  fileNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const File = ({name, id}) => {
  const icon = null;
  return (
    <View style={{...styles.fileName}}>
      {icon ? <Text>{icon}</Text> : null}
      <View style={{...styles.fileNameWrapper}}>
        <Icon
          name="folder-outline"
          size={styles.fileNameText.fontSize}
          color="#000"
        />
        <Text style={{...styles.fileNameText}}>{name}</Text>
      </View>
    </View>
  );
};

export default File;
