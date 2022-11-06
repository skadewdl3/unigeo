<template>
  <div class="viewer__container">
    <div
      class="viewer__title"
      :class="`${
        this.switching ? 'viewer__title--invisible' : 'viewer__title--visible'
      }`"
    >
      <span @click="this.goBack()" class="browser__title--back">
        <left-outlined class="viewer__title--back-icon" />
        <span>Back</span>
      </span>
      <span>{{ this.name }}</span>
    </div>
    <div
      class="viewer__content"
      :class="`${
        this.switching
          ? 'viewer__content--invisible'
          : 'viewer__content--visible'
      }`"
    >
      <div class="viewer__warning">
        Note that you will only be able to view this file and NOT download it.
        Please ask Universal Geography admins for download access.
      </div>
      <div class="viewer__cta">
        <button class="viewer__cta--btn" @click="openFile">View File</button>
      </div>
      <div class="viewer__details">
        <div v-for="detail in this.details" class="viewer__details--item">
          <div class="viewer__details--icon">
            <clock-circle-two-tone
              two-tone-color="#6c5ce7"
              v-if="detail.type == 'createdTime'"
            />
            <file-two-tone
              two-tone-color="#2ecc71"
              v-if="detail.type == 'size'"
            />
            <file-pdf-two-tone
              v-if="detail.type == 'mimeType' && detail.val.endsWith('pdf')"
              two-tone-color="#c0392b"
            />
            <file-ppt-two-tone
              v-if="
                detail.type == 'mimeType' &&
                (detail.val.endsWith('ms-powerpoint') ||
                  detail.val.endsWith(
                    'openxmlformats-officedocument.presentationml.presentation'
                  ))
              "
              two-tone-color="#e67e22"
            />
            <file-excel-two-tone
              v-if="
                detail.type == 'mimeType' &&
                (detail.val.endsWith('ms-excel') ||
                  detail.val.endsWith(
                    'openxmlformats-officedocument.spreadsheetml.sheet'
                  ))
              "
              two-tone-color="#27ae60"
            />
            <file-word-two-tone
              v-if="
                detail.type == 'mimeType' &&
                (detail.val.endsWith('msword') ||
                  detail.val.endsWith(
                    'openxmlformats-officedocument.wordprocessingml.document'
                  ))
              "
              two-tone-color="#2980b9"
            />
            <play-circle-two-tone
              v-if="detail.type == 'mimeType' && detail.val.startsWith('video')"
              two-tone-color="#18dcff"
            />
            <folder-two-tone
              v-if="detail.type == 'mimeType' && detail.val.endsWith('folder')"
              two-tone-color="#2c3e50"
            />
          </div>
          <div class="viewer__details--text">
            {{ detail.label
            }}{{
              detail.type == 'mimeType'
                ? this.mime.extension(detail.val)
                : detail.val
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import prettyBytes from 'pretty-bytes';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import mime from 'mime-types';

dayjs.extend(relativeTime);

export default {
  name: 'Viewer',
  props: ['setLoading'],
  data() {
    this.mime = mime;
    if (!this.$store.state.selectedFile) {
      this.$router.push({ name: 'home' });
    }
    let { name, size, mimeType, createdTime, webViewLink } =
      this.$store.state.selectedFile;

    return {
      name,
      size,
      createdTime,
      mimeType,
      webViewLink,
      switching: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.showLoadingScreen(false);
    }, 500);
  },
  computed: {
    details() {
      return [
        {
          type: 'size',
          label: 'Size: ',
          val: prettyBytes(parseInt(this.size))
        },
        {
          type: 'createdTime',
          label: 'Created ',
          val: dayjs(this.createdTime).fromNow()
        },
        { type: 'mimeType', label: 'File type: ', val: this.mimeType }
      ];
    }
  },
  methods: {
    openFile() {
      let link = document.createElement('a');
      link.href = this.webViewLink;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    goBack() {
      // this.switching = true;
      this.showLoadingScreen(true);
      setTimeout(() => {
        this.$router.push({
          name: 'home'
        });
      }, 400);
    },
    showLoadingScreen(val) {
      this.switching = val;
      this.setLoading(val);
    }
  }
};
</script>

<style lang="stylus">
.viewer
  &__container
    padding 0 10rem 0 10rem
  &__cta
    padding 3rem 0
    &--btn
      background #3498db
      color #fff
      padding 0.5rem 1rem
      font-size 1rem
      border-radius 0.4rem
      font-weight bold
      cursor pointer
      border solid 0.1rem #fff
      transition all .2s ease-out
      &:hover
        background #fff
        border solid 0.1rem #3498db
        color #3498db

  &__details
    &--item
      align-items center
      display flex
      padding 0.5rem 1rem 0.5rem 0
      font-size 1rem
    &--icon
      margin-right 1rem
      font-size 1.5rem


  &__warning
    font-weight bold
    color #f39c12
    font-size 1rem
  &__content
    padding 0 10rem 0 6.5rem
    transition all .2s ease-in-out
    &--invisible
      transform translateY(-5%)
      opacity 0

    &--visible
      transform 0
      opacity 1

  &__title
    transition all .2s ease-in-out
    transition-property transform, opacity
    font-size 2rem
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

    &--back-icon
      font-size 1rem

    &--visible
      transform 0
      opacity 1

    &--invisible
      transform translateY(5%)
      opacity 0
</style>
