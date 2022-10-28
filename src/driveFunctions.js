import axios from 'axios';

let prodEnv = true;

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
  let { data } = await axios.get(
    `${
      prodEnv ? 'https://unigeo.deta.dev' : 'http://localhost:3000'
    }/getfilesfromid/${id}`
  );
  return sortFilesByName(data.files);
};
