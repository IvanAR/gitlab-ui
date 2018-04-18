<template>
  <div class="row gutter-sm">

    <q-field class="col-12">
      <q-btn label="Salvar" @click="save(account)" icon="library add" size="md" color="primary" class="float-right" />

      <!-- <q-btn
        v-go-back=" '/' "
        color="primary"
        icon="keyboard backspace"
        size="md"
      /> -->
    </q-field>

    <q-field class="col-12">
      <q-input float-label="Gitlab url" type="text" class="no-margin" v-model="account.url"/>
    </q-field>

    <q-field class="col-12">
      <q-input float-label="Token" type="password" class="no-margin" v-model="account.token"/>
    </q-field>

  </div>
</template>

<style>
</style>

<script>
export default {
  name: 'Account',
  data () {
    return {
      account: {}
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    save (account) {
      localStorage.setItem('url', account.url)
      localStorage.setItem('token', account.token)
    },
    fetchData () {
      this.account.url = localStorage.getItem('url')
      this.account.token = localStorage.getItem('token')
    }
  }
}
</script>
