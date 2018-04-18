<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'

axios.defaults.headers.common['PRIVATE-TOKEN'] = localStorage.getItem('token')

export default {
  name: 'App'
}
</script>

<style>
</style>
