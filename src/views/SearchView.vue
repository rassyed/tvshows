<template>
  <div>
    <div class="message">
      <div v-show="showMessage">{{ message }}</div>
      <div v-if="showResults && totalResults > 0">
        Results found for
        <span class="query">{{ query }}</span>
        : {{ totalResults }}
      </div>
      <div v-else><p>There are no matches for you search.</p></div>
    </div>

    <ItemList :results="results" :selectedGenre="selectedGenre" type="multi" @item-clicked="viewDetailInfo"  @totalResults="computeLoadMore"/>
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
  name: 'SearchView',
  mixins: [viewDetailMixin],
  components: {
    ItemList,
    ItemListMore
  },
  data() {
    return {
      query: this.$route.query.q,
      page: 1,
      searching: false,
      loading: false,
      error: '',
      results: [],
      totalResults: null,
      totalPages: 1
    };
  },
  computed: {
    ...mapGetters(['selectedGenre']),
    loadMore() {
      return this.totalPages === this.page ? true : false;
    },
    showResults() {
      return !this.searching && this.totalResults != null;
    },
    showMessage() {
      return this.searching || this.error != '' ? true : false;
    },
    message() {
      return this.searching ? 'Searching...' : this.error;
    }
  },
  created(){
      this.fetchData('INIT');
  },
  methods: {
    async fetchData(action) {
      if (action == 'INIT') {
        this.page = 1;
        this.searching = true;
        this.results = [];
      } else {
        this.page++;
        this.loading = true;
      }
      try {
        const response = await AppServices.search(
          this.query,
          this.page
        );
        this.results = this.results.concat(response.data);
        this.totalResults = this.results.length;
      } catch (e) {
        if (action == 'MORE') this.page--;
        this.error = e;
      } finally {
        this.searching = false;
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
.query {
  color: $color-primary;
  font-weight: bold;
  font-style: italic;
  text-transform: lowercase;
}
</style>
