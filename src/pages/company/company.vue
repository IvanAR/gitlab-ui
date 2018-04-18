<template>
  <div class="row gutter-sm">

    <q-field class="col-12">
      <q-btn label="Salvar" @click="save(company)" icon="library add" size="md" color="primary" class="float-right" />

      <q-btn
        v-go-back=" '/companies' "
        color="primary"
        icon="keyboard backspace"
        size="md"
      />
    </q-field>

    <q-field class="col-12">
      <q-input float-label="Razão Social" type="text" class="no-margin" v-bind="company.companyName"/>
    </q-field>
    <q-field class="col-12">
      <q-input float-label="Trading Name" type="text" class="no-margin" v-bind="company.tradingName"/>
    </q-field>
    <q-field class="col-12">
      <q-select class="no-margin"
        v-model="select"
        radio
        :options="selectOptions"
      />
    </q-field>
  </div>
</template>

<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'Company',
  data () {
    return {
      company: {},
      stores: {}
    }
  },
  methods: {
    save (company) {
      axios
        .post('/api/v4/projects')
        .then(response => {
          this.company = response
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchStores () {
      axios
        .get('/api/stores')
        .then(response => {
          this.projects = response
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
