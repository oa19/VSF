<template>
  <div v-editable="story">
    <template v-for="item in story.body">
      <component :key="item._uid" :story="item" :is="item.component" />
    </template>
  </div>
</template>

<script>
export default {
  props: ['story']
}
</script>
