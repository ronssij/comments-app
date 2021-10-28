<template>
  <comment :item="item" :blog="blog" :comment="comment" />
</template>

<script>
export default {
  name: "Reply",

  components: { Comment: () => import("./Comment.vue") },

  props: {
    item: {
      type: [Object],
      required: true,
    },

    blog: {
      type: [Object],
      required: true,
    },

    comment: {
      type: [Object],
    },
  },
};
</script>
