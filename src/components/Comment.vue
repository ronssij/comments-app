<template>
  <div class="d-flex flex-column my-5 py-1 line">
    <div>
      <span class="font-weight-bold text-decoration-underline">
        @{{ parentComment.username }}
      </span>
      -
      <span class="font-italic grey--text">
        {{ parentComment.created_at }}
      </span>
    </div>

    <div class="py-1 pb-0">
      {{ parentComment.comment }}
    </div>

    <div v-if="parentComment.depth < 2" class="mt-1 mb-2">
      <v-btn class="px-1" color="grey" @click="toReply = !toReply" small text>
        <v-icon class="mr-1" small>mdi-message-outline</v-icon>
        <span> Reply </span>
      </v-btn>
    </div>

    <template v-if="toReply">
      <div class="mt-1">
        <v-textarea
          v-model="reply"
          rows="2"
          :placeholder="`Reply to @${parentComment.username}`"
          @keydown.enter.exact.prevent="saveReply"
          @keydown.enter.shift.exact.prevent="reply += '\n'"
          hide-details
          auto-grow
          outlined
          dense
          flat
        />
      </div>
    </template>

    <div class="pl-9 pb-0">
      <template v-if="item">
        <replies
          v-for="reply in parentComment.replies"
          :item="reply"
          :blog="blog"
          :comment="item"
          :key="reply.id"
        />
      </template>
    </div>
  </div>
</template>

<script>
import Replies from "@/components/CommentReplies";
import CommentModel from "@/models/Comment";
import BlogModel from "@/models/Blog";
import { mapGetters } from "vuex";

export default {
  name: "Comment",

  components: { Replies },

  props: {
    item: {
      type: [Object, CommentModel],
      required: true,
    },

    blog: {
      type: [Object, BlogModel],
      required: true,
    },

    comment: {
      type: [Object],
      default: null,
    },
  },

  data() {
    return {
      parentComment: {
        id: null,
        replies: [],
      },

      toReply: false,
      reply: "",
    };
  },

  computed: {
    ...mapGetters({
      usernameState: "getUsername",
    }),
  },

  created() {
    this.parentComment = this.item;
  },

  methods: {
    async saveReply() {
      if (!this.reply) return;

      const blog = new BlogModel(this.blog);

      let params = {
        blog_id: blog.id,
        username: this.usernameState,
        comment: this.reply,
      };

      // If there is a reply(comment) on a comment
      // add comment as a reply on the parent comment,
      if (this.comment) {
        params = { ...params, comment_id: this.parentComment.id };
      } else {
        params = { ...params, comment_id: this.item.id };
      }

      const reply = new CommentModel(params).for(this.blog);

      const data = await reply.save();

      this.parentComment.replies.unshift(data);

      this.reply = "";
    },
  },
};
</script>

<style scoped>
.line {
  border-left: 2px solid #e0e0e0;
  padding: 15px;
}
</style>
