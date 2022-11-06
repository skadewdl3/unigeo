<script>
export default {
  name: 'SearchResults',
  props: ['results', 'searching', 'term'],
  props: {
    results: {
      type: Array,
      default: []
    },
    term: String,
    searching: Boolean
  },
  computed: {
    sortedResults() {
      return [
        ...this.results.filter(file => file.mimeType.endsWith('folder')),
        ...this.results.filter(file => file.mimeType.endsWith('pdf')),
        ...this.results.filter(
          file =>
            file.mimeType.endsWith('msword') ||
            file.mimeType.endsWith(
              'openxmlformats-officedocument.wordprocessingml.document'
            )
        ),
        ...this.results.filter(
          file =>
            file.mimeType.endsWith('ms-powerpoint') ||
            file.mimeType.endsWith(
              'openxmlformats-officedocument.presentationml.presentation'
            )
        ),
        ...this.results.filter(file => file.mimeType.startsWith('video')),
        ...this.results.filter(
          file =>
            file.mimeType.endsWith('ms-excel') ||
            file.mimeType.endsWith(
              'openxmlformats-officedocument.spreadsheetml.sheet'
            )
        )
      ];
    }
  },
  data() {
    this.interval = null;
    return {
      geographyEmojis: [
        ['🌎', '🔎', '👨‍🎓'],
        ['🌐', '👩‍🎓', '🗼'],
        ['🗺', '📚', '🧭']
      ],
      emojis: [],
      emojiListIndex: 0,
      emojiIndex: 0
    };
  },
  methods: {
    showEmojis() {
      this.interval = setInterval(() => {
        if (this.emojiListIndex < 3) {
          if (this.emojiIndex < 3) {
            this.emojis.push(
              this.geographyEmojis[this.emojiListIndex][this.emojiIndex]
            );
            this.emojiIndex++;
          } else {
            this.emojiIndex = 0;
            this.emojiListIndex++;
            this.emojis = [];
          }
        } else {
          this.emojiIndex = 0;
          this.emojiListIndex = 0;
          this.emojis = [];
        }
      }, 500);
    },
    stopEmojis() {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  watch: {
    searching() {
      if (this.searching) {
        this.showEmojis();
      } else {
        this.stopEmojis();
      }
    },
    results() {
      console.log(this.sortedResults);
    }
  }
};
</script>

<template>
  <div class="results">
    <div
      :class="`results__container--${this.searching ? 'invisible' : 'visible'}`"
      v-if="!this.searching"
      class="results__container"
    >
      <div v-for="file in this.sortedResults" class="result">
        <div class="result__icon">
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
          <play-circle-two-tone
            class="browser__file--icon"
            v-if="file.mimeType.startsWith('video')"
            two-tone-color="#18dcff"
          />
          <folder-two-tone
            class="browser__file--icon"
            v-if="file.mimeType.endsWith('folder')"
            two-tone-color="#2c3e50"
          />
        </div>
        <div class="result__text">{{ file.name }}</div>
      </div>
    </div>
    <div v-if="this.searching" class="results__loader">
      <div>
        <span>Searching the world for '{{ this.term }}'{{ '  ' }}</span>

        <span v-for="emoji in this.emojis">{{ emoji }}{{ ' ' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.results
  &__loader
    height 10rem
    text-align center
    display flex
    align-items center
    justify-content center
    span
      margin auto auto
      font-family 'Poppins', sans-serif
      color #000
      font-size 1.3rem
      margin 1rem 0

  &__container
    transition all 1s ease-in-out
    padding 0 5rem
    &--visible
      opacity 1
    &--invisible
      opacity 0

.result
  display flex
  align-items center
  justify-content flex-start
  padding 0.5rem 1rem
  font-size 1.2rem

  &__icon
    margin-right 1rem
</style>
