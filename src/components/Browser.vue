<template>
  <div class="browser__container">
    <div
      class="browser__title"
      :class="`browser__title--${this.switching ? 'invisible' : 'visible'} ${
        this.prevParents.length != 0 ? 'browser__title--small' : ''
      }`"
    >
      <span
        @click="this.goBack()"
        class="browser__title--back"
        v-if="this.prevParents.length != 0"
      >
        <left-outlined class="browser__title--icon" />
        <span>Back</span>
      </span>
      <span>
        <span v-for="(parent, index) in this.prevParents"
          >{{ parent.name }} > {{ ' ' }}
        </span>
        <span>{{ this.parentFile.name }}</span>
      </span>
    </div>
    <div
      class="browser__file"
      :class="`browser__file--${this.switching ? 'invisible' : 'visible'}`"
      v-for="(file, index) in this.fileTree"
    >
      <div class="browser__file--content" @click="this.updateFileTree(file)">
        <div class="browser__file--logo">
          <file-pdf-two-tone
            class="browser__file--icon"
            v-if="file.mimeType.endsWith('pdf')"
            two-tone-color="#c0392b"
          />
          <file-ppt-two-tone
            class="browser__file--icon"
            v-if="
              file.mimeType.endsWith('ms-powerpoint') ||
              file.mimeType.endsWith(
                'openxmlformats-officedocument.presentationml.presentation'
              )
            "
            two-tone-color="#e67e22"
          />
          <file-excel-two-tone
            class="browser__file--icon"
            v-if="
              file.mimeType.endsWith('ms-excel') ||
              file.mimeType.endsWith(
                'openxmlformats-officedocument.spreadsheetml.sheet'
              )
            "
            two-tone-color="#27ae60"
          />
          <file-word-two-tone
            class="browser__file--icon"
            v-if="
              file.mimeType.endsWith('msword') ||
              file.mimeType.endsWith(
                'openxmlformats-officedocument.wordprocessingml.document'
              )
            "
            two-tone-color="#2980b9"
          />
          <folder-two-tone
            class="browser__file--icon"
            v-if="file.mimeType.endsWith('folder')"
            two-tone-color="#2c3e50"
          />
        </div>
        <div class="browser__file--name">{{ file.name }}</div>
      </div>
      <div
        v-if="index != fileTree.length - 1"
        class="browser__file--separator"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getTopLevelFolders, getChildrenFromID } from './../driveFunctions';

let prodEnv = true;

export default {
  name: 'Browser',
  data() {
    this.prevData = {};
    return {
      switching: true,
      prevParents: [],
      files: [],
      fileTreeString: '[]',
      parentFile: {
        name: 'Digital Library 📚',
        id: ''
      }
    };
  },

  computed: {
    fileTree() {
      return JSON.parse(this.fileTreeString);
    }
  },

  mounted() {
    axios
      .get(
        `${
          prodEnv ? 'https://unigeo.deta.dev' : 'http://localhost:3000'
        }/getfiles`
      )
      .then(({ data }) => {
        this.files = data.files;
        this.fileTreeString = JSON.stringify(getTopLevelFolders(this.files));
        setTimeout(() => {
          this.switching = false;
        }, 1000);
      })
      .catch(err => console.log(err));
  },

  methods: {
    // openFile(file) {
    //   this.$router.push({ name: 'view', params: { file } });
    // },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async updateFileTree(file, back = false) {
      if (file && !file.mimeType.endsWith('folder')) {
        this.switching = true;
        setTimeout(() => {
          this.$router.push({ name: 'view', state: { file } });
        }, 400);
      }

      this.switching = true;
      if (file) {
        if (this.prevData[file.id]) {
          await this.sleep(400);
          this.fileTreeString = this.prevData[file.id];
        } else {
          let fileTreeString = JSON.stringify(await getChildrenFromID(file.id));
          this.fileTreeString = fileTreeString;
          this.prevData[file.id] = fileTreeString;
        }
        if (!back) {
          this.updatePrevParents();
        }
        this.parentFile = file;
      } else {
        this.fileTreeString = JSON.stringify(
          await getTopLevelFolders(this.files)
        );
      }
      this.switching = false;
    },
    updatePrevParents() {
      this.prevParents.push(this.parentFile);
    },
    goBack() {
      this.switching = true;
      setTimeout(() => {
        this.parentFile = this.prevParents.pop();

        this.updateFileTree(
          this.prevParents.length != 0 ? this.parentFile : null,
          true
        );
      }, 400);
    }
  }
};
</script>

<style lang="stylus">

.browser
  &__container
    padding 0 10rem 0 10rem
  &__file
    margin 0.5rem 0
    border-radius 0.3rem
    font-size 1rem
    text-align center
    transition all .2s ease-in-out

    &--invisible
      transform translateY(-5%)
      opacity 0

    &--visible
      transform 0
      opacity 1

    &--content
      padding 0.5rem 1rem
      display flex
      align-items center
      cursor pointer
      &:hover
        color #54a0ff
        font-weight bold

    &--logo
      margin-right 1.5rem

    &--icon
      font-size 1.4rem

    &--name
      font-size 1rem
    &--separator
      display inline-block
      height 0.1rem
      background #eee
      width 100%


  &__title
    transition all .2s ease-in-out
    transition-property transform, opacity
    font-size 2.5rem
    font-weight bold
    margin 1rem 0
    font-family 'Baloo 2', 'Open Sans', sans-serif
    display flex
    align-items center

    &--back
      display flex
      align-items center
      font-size 1.4rem
      margin-right 2rem
      color #ccc
      cursor pointer

    &--small
      font-size 1.5rem

    &--icon
      font-size 1rem

    &--visible
      transform 0
      opacity 1

    &--invisible
      transform translateY(5%)
      opacity 0
</style>
