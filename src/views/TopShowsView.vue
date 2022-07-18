<template>
  <div>
    <h2 class="title">
      <font-awesome-icon 
        icon="star" 
        transform="shrink-3"
        size="1x" />&nbsp;
        Top Shows
      </h2>
    <ItemList :results="computedResults" :selectedGenre="selectedGenre" type="tv" @item-clicked="viewDetailInfo" @totalResults="computeLoadMore"/>
    <ItemListMore :loading="loading" :loadMore="loadMore" @view-more="fetchData('MORE')"/>
  </div>
</template>

<script>
import ItemList from '@/components/ItemList';
import ItemListMore from '@/components/ItemListMore';
import AppServices from '@/services/AppServices';
import { viewDetailMixin } from '@/mixins/viewDetailMixin';
import { mapGetters } from 'vuex';

export default {
  name: 'TopShowsView',
  mixins: [viewDetailMixin],
  components: {
    ItemList,
    ItemListMore
  },
  data() {
    return {
      page: 1,
      loading: false,
      error: '',
      results: [],
      totalPages: 1
    };
  },
  computed: {
    ...mapGetters(['selectedGenre']),
    loadMore () {
      return this.totalPages > this.page ? true : false;
    },
    showMessage () {
      return this.searching || this.error != '' ? true : false;
    },
    computedResults () {
        let results = this.results.filter(function(item) {
            return item.rating.average !== null && item.rating.average !== 'null'
        })
        return results.sort(function(a, b) {
            if (a.rating.average !== null) {
                if(a.rating.average < b.rating.average) { return 1; }
                if(a.rating.average > b.rating.average) { return -1; }
            }
        })
    }
  },
  created(){
    this.fetchData('INIT');
  },
  methods: {
    async fetchData(action) {
      if (action == 'INIT') {
        this.page = 1;
      } else {
        this.page++;
        this.loading = true;
      }
      try {
        const response = await AppServices.getShows(this.page);
        this.results = this.results.concat(response.data);
      } catch (e) {
        if (action == 'MORE') this.page--;
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
    computeLoadMore (total) {
      this.totalPages = Math.round(total / 250)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
