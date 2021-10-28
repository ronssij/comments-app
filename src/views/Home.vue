<template>
  <v-row class="mt-7">
    <v-col cols="12" sm="12">
      <template v-for="blog in blogs">
        <Blog :item="blog" :key="blog.id" />
      </template>
    </v-col>
  </v-row>
</template>

<script>
import BlogModel from "@/models/Blog";
import Blog from "@/components/Blog";

export default {
  name: "Home",

  components: {
    Blog,
  },

  data() {
    return {
      blogs: [],
    };
  },

  created() {
    this.fetchBlogs();
  },

  methods: {
    async fetchBlogs() {
      const { data } = await BlogModel.include(["comments"]).get();

      this.blogs = data;
    },
  },
};
</script>
