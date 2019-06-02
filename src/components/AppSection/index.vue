<template>
    <div class="sys-section">
      <div class="title">
        <strong>{{title}}</strong>
      </div>
      <hr/>
      <slot></slot>
      <br/>
      <br/>
    </div>
</template>

<script>
    export default {
      name: "app-section",
      props:['title']
    }
</script>

<style scoped>

</style>
