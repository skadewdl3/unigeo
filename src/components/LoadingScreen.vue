<template>
  <div class="spinner">
    <div class="spinner__text">
      <span>Loading Awesomeness{{ ' ' }}</span>
      <span v-for="emoji in this.emojis">{{ emoji }}{{ ' ' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
  props: ['stopLoading'],
  data() {
    return {
      geographyEmojis: [
        ['🌎', '🔎', '👨‍🎓'],
        ['🌐', '👩‍🎓', '🗼'],
        ['🗺', '📚', '🧭']
      ],
      loading: false,
      emojis: [],
      emojiListIndex: 0,
      emojiIndex: 0
    };
  },
  mounted() {
    setInterval(() => {
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
  }
};
</script>

<style lang="stylus">
.spinner
  position absolute
  top 50%
  left 50%
  transform translate(-50%, -50%)
  width 100%
  height 100vh
  display flex
  align-items center
  justify-content center
  // background rgba(#000, 0.8)
  z-index 100
  transition all 1s ease-in-out

  &__text
    color #000
    font-size 1.6rem
    margin 1rem 0
    font-family 'Baloo 2', 'Open Sans', sans-serif

  &--invisible
    opacity 0
  &--visible
    opacity 1

.spinner__img-container
  display flex
  align-items center
  justify-content center
  flex-direction column

.spinner__img
  animation rotation 2s ease-in-out
  animation-iteration-count infinite
  transform-origin 50% 50%
  width 20rem
  height 20rem

@keyframes rotation {
  from {
    transform: rotate(0deg)
  }
  80% {
    transform: rotate(359deg)
  }
  to {
    transform: rotate(359deg)
  }
}
</style>
