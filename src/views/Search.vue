<template>
  <div
    class="search__container"
    :class="`${
      this.stopSearching
        ? 'search__container--invisible'
        : 'search__container--visible'
    }`"
  >
    <div
      class="search__title"
      :class="`${this.searchActive ? 'search__title--small' : ''}`"
    >
      <span @click="this.goBack()" class="search__title--back">
        <left-outlined class="search__title--icon" />
        <span>Back</span>
      </span>
      <input
        ref="searchBox"
        class="search__box"
        placeholder="Search topics, publishers and more..."
        @input="
          e => {
            this.term = e.target.value;
          }
        "
      />
    </div>
    <SearchResults
      :results="this.searchResults"
      :searching="this.searchInProgress"
      :term="this.term"
    />
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import { searchFor } from './../driveFunctions';
import SearchResults from './../components/SearchResults.vue';

export default {
  name: 'Search',
  props: [
    'searching',
    'setSearching',
    'setExpandSearchBar',
    'setSearchQuery',
    'expandSearchBar'
  ],
  components: {
    SearchResults
  },
  data() {
    return {
      searchActive: false,
      stopSearching: false,
      term: '',
      searchResults: [],
      searchInProgress: false
    };
  },
  mounted() {
    this.setSearching(true);
    this.stopSearching = true;
    setTimeout(() => {
      this.stopSearching = false;
      this.$refs.searchBox.focus();
    }, 100);

    let observer = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        this.setExpandSearchBar(true);
        this.setSearchQuery('');
      } else {
        this.setExpandSearchBar(false);
        this.setSearchQuery(this.term);
      }
    });

    observer.observe(document.querySelector('.search__box'));
  },
  methods: {
    goBack() {
      this.stopSearching = true;
      setTimeout(() => {
        this.setSearching(false);
        this.$router.push({ name: 'home' });
      }, 300);
    },

    makeSearchRequest: throttle(
      async function () {
        this.searchInProgress = true;
        console.log('searching for', this.term);
        let results = await searchFor(this.term);
        this.searchResults = results;
        this.searchInProgress = false;
      },
      2000,
      { leading: false }
    )
  },
  watch: {
    term() {
      if (this.term) {
        this.makeSearchRequest();
      }
    },
    expandSearchBar() {
      if (this.expandSearchBar) {
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

<style lang="stylus">
.search
  &__container
    padding 0 10rem 0 10rem
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

  &__box
    padding 0.5rem 1rem
    width 100%
    font-size 1.5 rem
    font-weight bold
    font-family 'Open Sans', sans-serif
    transition all .2s ease-in-out
    border-top solid 0.1rem #fff
    border-right solid 0.1rem #fff
    border-left solid 0.1rem #fff
    border-bottom solid 0.1rem #eee

    &:focus, &:active, &:hover
      border solid 0.1rem #54a0ff
      border-radius 0.5rem
      color #54a0ff
      &::placeholder
        color #54a0ff
</style>
