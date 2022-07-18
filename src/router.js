import Vue from "vue";
import Router from "vue-router";
import SearchView from "@/views/SearchView";
import TvShowsView from "@/views/TvShowsView";

Vue.use(Router);

export default new Router({
  //mode: 'history',
  base: process.env.NODE_ENV === "development" ? "/" : "/vue-movies/",
  routes: [
    {
      path: "/",
      redirect: { name: "tv-shows" }
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
      meta: {
        showBlock: true
      }
    },
    {
      path: "/tv-shows",
      name: "tv-shows",
      component: TvShowsView,
      meta: {
        showBlock: true
      }
    },
    {
      path: "/shows",
      name: "shows",
      component: TvShowsView
    },
    {
      path: "/*",
      redirect: { name: "tv-shows" }
    }
  ]
});
