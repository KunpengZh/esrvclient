<template>
  <div id="app">
      <div id="data-content">
        <router-view id="routerview"></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app{
  height:100%;
}
</style>
