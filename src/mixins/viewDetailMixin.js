export const viewDetailMixin = {
    methods: {
      viewDetailInfo(item) {
        try {
          this.$store.dispatch('getItem', item);
          this.$emit('open-modal');
        } catch (e) {
          this.error = e;
        }
      }
    }
  };