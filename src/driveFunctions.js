import axios from 'axios';

const sortFilesByName = arr => {
  const sorter = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };
  arr.sort(sorter);
  return arr;
};

export const getTopLevelFolders = files => {
  let topLevelFolders = files.filter(file => file.parents === undefined);
  return sortFilesByName(topLevelFolders);
};

export const getChildrenFromID = async id => {
  let { data } = await axios.get(`%BASE_URL%/getfilesfromid/${id}`);
  return sortFilesByName(data.files);
};

export const searchFor = async term => {
  let { data } = await axios.post(`%BASE_URL%/search?term=${term}`);
  return sortFilesByName(data.files);
};
