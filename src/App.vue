<template>
  <div id="nav" v-if="$store.state.user" class="navi">
    <router-link to="/">Home</router-link> |
    <router-link to="/student">Student</router-link>
    <router-link to="/event">Event</router-link>
    <button @click="$store.dispatch('logout')">Logout</button>
  </div>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

.navi {
  align-items: left;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
