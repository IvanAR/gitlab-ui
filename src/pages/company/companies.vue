<template>
  <div class="row gutter-sm">

    <div class="col-12">
      <q-btn label="Novo" icon="library add" size="md" color="primary" class="float-right" @click="$router.push('/companies/company')" />
    </div>

    <div class="col-12">
      <q-list highlight v-if="companies" class="on-top">
          <q-list-header>Recent chats</q-list-header>
          <q-item>
              <q-item-side>
              <q-item-tile avatar>
                  <img src="statics/boy-avatar.png">
              </q-item-tile>
              </q-item-side>
              <q-item-main label="John Doe" />
              <q-item-side right>
              <q-item-tile icon="chat_bubble" color="green" />
              </q-item-side>
          </q-item>
          <q-item>
              <q-item-side avatar="statics/linux-avatar.png" />
              <q-item-main label="Jim Doe" />
              <q-item-side right icon="chat_bubble" />
          </q-item>
          <q-item-separator />
      </q-list>

      <q-list highlight v-if="!companies">
          <q-list-header>Não foram encontradas companhias</q-list-header>
          <q-item-separator />
      </q-list>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { Loading } from 'quasar'
import axios from 'axios'

export default {
  name: 'Companies',
  data () {
    return {
      loading: false,
      companies: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  methods: {
    fetchData () {
      Loading.show({
        spinnerColor: 'blue'
      })
      axios.get('/api/companies')
        .then(
          response => {
            this.companies = response.content
            Loading.hide()
          }
        ).catch(error => {
          Loading.hide()
          this.error = error.toString()
        })
    }
  }
}
</script>
