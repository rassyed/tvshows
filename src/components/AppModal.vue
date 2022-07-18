<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal_content">
      <div class="item_content clearfix">
        <template v-if="showItemInfo">
          <aside class="poster">
            <figure>
              <img :src="urlImg" />
            </figure>
          </aside>
          <section class="info">
            <h1>{{ title }}</h1>
            <p v-html="description"></p>
            <h2 class="label">
              <font-awesome-icon 
                :icon="icon" 
                size="1x" 
                class="icon" />&nbsp;
                Premiered Date</h2>
            <p>{{ this.date }}</p>
            <h2 class="label" v-if="genres.length > 0">Genres</h2>
            <ul v-if="genres.length > 0">
              <li v-for="(g, index) in genres" :key="index">{{ g }}</li>
            </ul>
            <h2 class="label">CAST</h2>
            <p>{{ itemInfo.cast }}</p>
            <h2 class="label">Run time</h2>
            <p>{{ itemInfo.runtime }} minutes</p>
            <h2 class="label" v-if="rating">Rating</h2>
            <p v-if="rating">{{ rating }}</p>
          </section>
        </template>
        <template v-else>Loading ...</template>
      </div>
      <button title="Close" class="close_modal" @click="closeModal">
        <font-awesome-icon icon="times" transform="shrink-6" size="1x" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import dayjs from 'dayjs'
export default {
  name: 'Modal',
  components: {},
  computed: {
    ...mapState(['itemInfo']),
    showItemInfo () {
      return !Object.keys(this.itemInfo).length ? false : true;
    },
    title () {
      return this.itemInfo && this.itemInfo.show ? this.itemInfo.show.name : this.itemInfo.name 
    },
    description () {
      return this.itemInfo && this.itemInfo.show ? this.itemInfo.show.summary : this.itemInfo.summary 
    },
    urlImg () {
      if (this.itemInfo && this.itemInfo.show) {
        return this.itemInfo.show && this.itemInfo.show.image != null
          ? this.itemInfo.show.image.medium || this.itemInfo.show.image.original
          : require('@/assets/images/poster-not-available.png');
      }
      return this.itemInfo && this.itemInfo.image != null
        ? this.itemInfo.image.medium || this.itemInfo.image.original
        : require('@/assets/images/poster-not-available.png');
    },
    genres () {
      return this.itemInfo && this.itemInfo.show ? this.itemInfo.show.genres.map(element => element.toUpperCase()) : this.itemInfo.genres.map(element => element.toUpperCase());
    },
    date () {
      return this.itemInfo && this.itemInfo.show ? (this.itemInfo.show.premiered) ? dayjs(this.itemInfo.show.premiered).format('MMM D, YYYY') : dayjs(this.itemInfo.premiered).format('MMM D, YYYY') : ''
    },
    icon () {
      return this.itemInfo.type == 'movie' ? 'film' : 'tv';
    },
    rating () {
      if (this.itemInfo.show && this.itemInfo.show.rating && this.itemInfo.show.rating.average !== null) {
        return this.itemInfo.show.rating.average
      }
      if (this.itemInfo && this.itemInfo.rating && this.itemInfo.rating.average !== null) {
        return this.itemInfo.rating.average
      }
      return ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
figure {
  margin: 0 0 1em;
}
img {
  width: 100%;
  height: auto;
}
h1 {
  margin-top: 0;
  font-size: 2em;
  color: $color-primary;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}
li {
  display: inline;
  padding: 4px;
  margin-right: 5px;
  background-color: $color-tags;
  color: $color-text-secondary;
  font-size: 0.9em;
}
p {
  margin: 0;
  line-height: 1.4;
}
button {
  color: $color-text-secondary;
}
a {
  display: inline-block;
  color: $color-text-secondary;
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 1px dotted $color-text-secondary;
  &:hover {
    color: $color-primary;
  }
}
.item_content {
  padding: 2em;
}
.poster{
  display: block;
  margin-bottom: 2em;
  text-align: center;
}
.info {
  display: block;
}
.label {
  margin: 2em 0 0.2em;
  font-family: $font-secondary, sans-serif;
  color: $color-secondary;
  font-size: 1em;
  text-transform: uppercase;
}
.web a {
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 990;
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 995;
    background: $modal-background-overlay;
  }
  .modal_content {
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $modal-background;
    box-shadow: 0 1px 5px $modal-color-shadow;
    text-align: left;
    border-radius: 4px;
    width: 780px; /* This just a default width */
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    .buttons_wrapper {
      padding: 20px;
    }
    &::-webkit-scrollbar {
      border-radius: 10px;
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: $scrollbar-color-thumb;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background: $scrollbar-color-track;
    }
  }
  .close_modal {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-size: 18px;
    background: none;
    border: none;
    transition: opacity 0.2s ease;
    &:hover {
      color: $color-primary;
    }
  }
}
@include sm {
  .poster {
    float: left;
    margin: 0;
    width: 33%;
    text-align: center
  }
  .info{
    display: block;
    padding-left: 2em;
    margin-left: 33%;    
  }
}
</style>
