<template>
  <v-card rounded="lg">
    <v-card-title>
      {{ blog.title }}
    </v-card-title>

    <v-divider />

    <v-card-text>
      <div>
        {{ blog.body }}
      </div>

      <div class="mt-3">
        <v-textarea
          v-model="comment"
          placeholder="Write a comment"
          rows="1"
          @keydown.enter.exact.prevent="saveComment"
          @keydown.enter.shift.exact.prevent="comment += '\n'"
          block
          hide-details
          auto-grow
          outlined
          dense
          flat
        />
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text class="px-4 pb-0">
      <div class="d-flex flex-column">
        <template v-if="blog.comments.length">
          <template v-for="(comment, index) in blog.comments">
            <comment :item="comment" :blog="blog" :key="comment.id" />
            <v-divider
              v-if="index < blog.comments.length - 1"
              :key="`line-${comment.id}`"
            />
          </template>
        </template>
      </div>
    </v-card-text>

    <v-divider />
  </v-card>
</template>

<script>
import CommentModel from "@/models/Comment";
import Comment from "@/components/Comment";
import Blog from "@/models/Blog";

export default {
  components: { Comment },
  name: "Blog",

  props: {
    item: {
      type: Blog,
      required: true,
    },
  },

  data() {
    return {
      blog: {
        id: null,
        comments: [],
      },
      toReply: false,
      comment: "",
    };
  },

  created() {
    this.blog = this.item;
  },

  methods: {
    async saveComment() {
      if (!this.comment) return;

      const comment = new CommentModel({
        blog_id: this.blog.id,
        username: "cjronxel",
        comment: this.comment,
      }).for(this.blog);

      const data = await comment.save();

      this.comment = "";

      this.blog.comments.unshift(data);
    },
  },

  watch: {
    item() {
      this.blog = { ...this.blog, ...this.item };
    },
  },
};
</script>
