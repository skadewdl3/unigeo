import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Home from './views/Home.vue';
import Viewer from './views/Viewer.vue';
import {
  FilePdfTwoTone,
  FilePptTwoTone,
  FileWordTwoTone,
  FileExcelTwoTone,
  FolderTwoTone,
  LeftOutlined,
  ClockCircleTwoTone,
  FileTwoTone
} from '@ant-design/icons-vue';
import { createStore } from 'vuex';

import './assets/main.css';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/view/',
      name: 'view',
      component: Viewer
    }
  ]
});

const store = createStore({
  state() {
    return {
      prevFileTreeString: '',
      prevParentFile: null,
      selectedFile: null,
      prevData: null,
      prevParents: null,
      files: null
    };
  },
  mutations: {
    setPrevFileTreeString(state, val) {
      state.prevFileTreeString = val;
    },
    setPrevParentFile(state, val) {
      state.prevParentFile = val;
    },
    setSelectedFile(state, val) {
      state.selectedFile = val;
    },
    setPrevData(state, val) {
      state.prevData = val;
    },
    setPrevParents(state, val) {
      console.log(val);
      state.prevParents = val;
    },
    setFiles(state, val) {
      state.files = val;
    }
  },
  actions: {
    clearState(context) {
      context.commit('setPrevFileTreeString', '');
      context.commit('setPrevParentFile', null);
      context.commit('setPrevParents', null);
      context.commit('setSelectedFile', null);
    }
  }
});

const app = createApp(App);

app.component('file-pdf-two-tone', FilePdfTwoTone);
app.component('file-ppt-two-tone', FilePptTwoTone);
app.component('file-excel-two-tone', FileExcelTwoTone);
app.component('file-word-two-tone', FileWordTwoTone);
app.component('folder-two-tone', FolderTwoTone);
app.component('left-outlined', LeftOutlined);
app.component('clock-circle-two-tone', ClockCircleTwoTone);
app.component('file-two-tone', FileTwoTone);

app.use(router);
app.use(store);

app.mount('#app');
