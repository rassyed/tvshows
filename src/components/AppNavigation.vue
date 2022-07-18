<template>
  <div class="navigation">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <router-link :to="link.url">
          <font-awesome-icon :icon="link.icon" :transform="link.transform" size="2x" class="icon" />
          <br />
          <span>{{ link.text }}</span>
        </router-link>
      </li>
      <li>
        <div class="genre-container">
          <select
          @change="genreSelected"
          >
            <option value="null" selected>Select genre</option>
            <option
              v-for="(genre, index) in genres" 
              :key="index" 
              v-on='$listeners'
            >{{genre}}</option>
          </select>
        </div>
      </li>
      <li>
        <AppSearch />
      </li>
    </ul>
  </div>
</template>

<script>
import AppSearch from '@/components/AppSearch';
import { mapGetters } from 'vuex';

export default {
  name: 'AppNavigation',
  components: { AppSearch },
  computed: {
    ...mapGetters(['genres']),
  },
  data() {
    return {
      links: [
        {
          url: '/tv-shows',
          text: 'On air',
          icon: 'tv',
          transform: 'shrink-8'
        },
        {
          url: '/shows',
          text: 'Shows',
          icon: 'tv',
          transform: 'shrink-8'
        }
      ]
    };
  },
  methods: {
    genreSelected (e) {
      this.$store.commit('setGenre', e.currentTarget.value)
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
  display: flex;
}
li {
  height: 60px;
  width: 50px;
  border-left: 1px solid $background-border;
  list-style: none;
  display: inline-block;
  box-sizing: border-box;
  &:last-child {
    flex-grow: 1;
    border-right: 1px solid $background-border;
  }
  &:nth-last-child(2) {
    flex-grow: 0.5;
    border-right: 1px solid $background-border;
  }  
}
a {
  display: block;
  height: 100%;
  text-align: center;
  color: $color-text-primary;
  text-decoration: none;
  &:hover {
    color: $color-text-secondary;
  }
  &.router-link-active {
    background: $background-active;
    background: radial-gradient(
      circle,
      $background-active-gradient1,
      $background-active-gradient2
    );
    color: $color-text-secondary;
  }
}
span {
  display: none;
}
.navigation{
  margin: 0 auto;
    max-width: 1000px;
}
.icon {
  margin-top: 15px;
}
.genre-container {
  display: flex;
  align-items: center;
  height: 60px;
}
select {
  border: 0;
  padding: 2px 10px;
  width: calc(100% - 40px);
  font-size: 1em;
  outline: 0;
  color: $color-primary;
  background-color: $background-input;
  border-radius: 3px;
  margin-left: 20px;
}
@include sm {
  li {
    width: 85px;
  }
  span {
    display: inline;
    padding: 0 10px;
  }
  .icon {
    margin-top: 3px;
  }
  select {
    padding: 8px 8px;
    font-size: 1em;
  }
}
</style>
