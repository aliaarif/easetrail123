<!-- components/QuillEditor.vue -->
<template>
  <div ref="editor"></div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Quill styles

export default {
  mounted() {
    this.quill = new Quill(this.$refs.editor, {
      theme: "snow", // other themes: 'bubble', 'core'
    });

    // Listen for text changes and emit the content
    this.quill.on("text-change", () => {
      this.$emit("input", this.quill.root.innerHTML);
    });

    this.quill.root.innerHTML = this.value;
  },
  beforeDestroy() {
    if (this.quill) {
      this.quill.off("text-change");
      this.quill = null;
    }
  },
  props: {
    value: String,
  },
};
</script>
