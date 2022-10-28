const { google } = require('googleapis');
const credentials = require('./credentials');

const scopes = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes
);

const drive = google.drive({ version: 'v3', auth });

const getFiles = async () => {
  let folderList = [];
  let updateFolderList = newList => {
    folderList = [...folderList, ...newList];
  };
  await getFolderTree(updateFolderList, '');
  return folderList;
};

const getFilesFromID = async ID => {
  let folderList = [];
  let updateFolderList = newList => {
    folderList = [...folderList, ...newList];
    console.log(folderList.length);
  };
  await getFolderTreeFromID(updateFolderList, '', ID);
  return folderList;
};

const getFolderTree = async (updateFolderList, nextPageToken) => {
  let { data } = await drive.files.list({
    pageSize: 1000,
    pageToken: nextPageToken ? nextPageToken : '',
    fields: 'files(id,name,parents,mimeType),nextPageToken',
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  updateFolderList(data.files);
  if (data.nextPageToken != '') {
    getFolderTree(updateFolderList, nextPageToken);
  }
};

const getFolderTreeFromID = async (updateFolderList, nextPageToken, ID) => {
  let { data } = await drive.files.list({
    q: `'${ID}' in parents`,
    pageSize: 1000,
    pageToken: nextPageToken ? nextPageToken : '',
    fields:
      'files(id,name,parents,mimeType,webViewLink,webContentLink),nextPageToken',
    includeItemsFromAllDrives: true,
    supportsAllDrives: true
  });
  updateFolderList(data.files);
  if (data.nextPageToken) {
    getFolderTree(updateFolderList, nextPageToken);
  } else {
    console.log('all done');
  }
};

module.exports = { getFiles, getFilesFromID };
