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
      <span v-for="file in this.results">{{ file.name }}</span>
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
    &--visible
      opacity 1
    &--invisible
      opacity 0
</style>
