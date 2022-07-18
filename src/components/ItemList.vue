<template>
  <ul>
    <ItemCard 
      v-for="(item, index) in computedResults" 
      :key="index" 
      :item="item" 
      :type="type" 
      v-on='$listeners'/>
  </ul>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';

export default {
  name: 'ItemList',
  components: {
    ItemCard
  },
  props: {
    results: Array,
    selectedGenre: String,
    type: String
  },
  computed: {
    computedResults () {
      if (this.selectedGenre !== '' && this.selectedGenre !== null && this.selectedGenre !== 'all') {
        return this.results.filter(item => {
          return item && item.show ? item.show.genres.includes(this.selectedGenre) === true
          : item.genres.includes(this.selectedGenre)
        });
      }
      this.$emit('totalResults', this.results.length);
      return this.results
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    display: flex;   
    flex-wrap: wrap; 
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
