
<script setup>
const props = defineProps({
    propsObj: {type: Object}
})
</script>
<template>
  <section>
    <h1 class="title is-1">{{ props.propsObj.meta.page_title }} in {{ props.propsObj.title(props.propsObj.city) }}</h1>
    <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
      <div
        class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen"
        v-for="s in props.propsObj.contents" :key="s._id" >
        <a :href="`/${props.propsObj.slug(props.propsObj.city)}/${props.propsObj.slug(s?.name)}-in-${props.propsObj.slug(props.propsObj.city)}`"
          class="grid-item box" >
          <p> <b>{{ s.name }}</b></p>
        </a>
      </div>
    </div>
  </section>
</template>