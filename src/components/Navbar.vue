<template>
  <div class="navbar__wrapper">
    <div class="navbar">
      <div class="logo" @click="this.$router.push('/')">
        <p class="logo__text">
          <span class="logo__text--blue">Uni</span
          ><span class="logo__text--green">Geo</span>&nbsp;🌍
        </p>
      </div>
      <div class="search">
        <input
          @click="this.switchToSearch"
          :class="`${
            this.searching
              ? 'search__input--invisible'
              : 'search__input--visible'
          }`"
          type="text"
          class="search__input"
          placeholder="Search the world..."
        />
      </div>
      <div class="settings">
        <div class="settings__container">
          <div
            class="settings__theme-wrapper"
            :class="`settings__theme-wrapper--${this.theme} ${
              this.hovered ? 'settings__theme-wrapper--hovered' : ''
            }`"
          ></div>
          <div
            @click="toggleTheme"
            @mouseenter="toggleHovered"
            @mouseleave="toggleHovered"
            class="settings__theme-toggle"
            :class="`settings__theme-toggle--${this.theme} ${
              this.hovered ? 'settings__theme-toggle--hovered' : ''
            } settings__theme-toggle${
              this.hovered ? '--hovered' : ''
            }--${currentPosition}`"
          >
            <span
              class="settings__theme-toggle__icon"
              v-if="this.theme === 'light'"
              >🌞</span
            >
            <span
              class="settings__theme-toggle__icon"
              v-if="this.theme === 'dark'"
              >🌚</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="separator">
      <div class="separator__line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['setSearching', 'searching'],
  computed: {
    currentPosition() {
      return this.theme === 'light' ? 'left' : 'right';
    }
  },
  data() {
    return {
      theme: 'light',
      hovered: false,
      toggling: false
    };
  },
  methods: {
    switchToSearch() {
      this.setSearching(true);
    },
    toggleTheme() {
      this.toggling = true;
      this.theme === 'light' ? (this.theme = 'dark') : (this.theme = 'light');
      setTimeout(() => {
        this.toggling = false;
        this.toggleHovered();
      }, 500);
    },
    toggleHovered() {
      if (this.toggling) return;
      this.hovered = !this.hovered;
    }
  }
};
</script>

<style lang="stylus">
.navbar
  width 100%
  padding 1rem 2rem
  display grid
  grid-template-columns 1fr 10fr 1fr
  &__wrapper
    background #fff
    position sticky
    top 0

.logo
  cursor pointer
  display flex
  align items-center
  &__text
    display flex
    align-items center
    font-family 'Baloo 2', 'Open Sans', sans-serif
    font-size 1.5rem
    font-weight bold
    letter-spacing .15rem
    &--blue
      color #2980b9
    &--green
      color #2ecc71

.search
  text-align center
  &__input
    background #eee
    display inline-block
    padding 0.5rem 1rem
    font-size 1rem
    border-radius 0.5rem
    font-weight 700
    color #34495e
    width 30%
    border 0.1rem solid #fff
    transition all 0.2s ease-out

    &--visible
      transform 0
      opacity 1
    &--invisible
      transform translateY(5%)
      opacity 0

    &:hover, &:active
      border 0.1rem solid #54a0ff
      background #fff
      width 35%

.separator
  display flex
  justify-content center
  &__line
    background #eee
    width 98%
    height 0.2rem

.settings
  &__container
    width 4rem
    height 2rem
    display flex
    align-items center
    justify-content center
    position relative
  &__theme-wrapper
    &--light
      background linear-gradient(to bottom left, #f1c40f, #e67e22)

    &--dark
      background linear-gradient(to top right, #34495e, #2f3640)
    border-radius 100rem
    background #eee
    position relative
    width 4rem
    height 2rem
    transition all .2s ease-in-out
    &--hovered
      height 0.5rem
      width 3rem


  &__theme-toggle
    display flex
    align-items center
    justify-content center
    position absolute
    transition all .2s ease-in-out
    top 50%
    transform translate(0, -50%)
    cursor pointer
    border 0.1rem solid transparent
    width 1.5rem
    border-radius 100rem
    height 1.5rem
    background #fff
    &--left
      left 7%
    &--right
      left 93%
      transform translate(-100%, -50%)
    &--hovered
      border 0.1rem solid #ccc
      background #fff
      height 1.6rem
      width 1.6rem
      &--left
        left 0
      &--right
        left 100%
        transform translate(-100%, -50%)
    &__icon
      font-size 1rem
</style>
