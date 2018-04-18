<template>
  <div class="row gutter-sm">

    <div class="col-12">
      <q-table
        title="Merge Requests"
        :data="projects"
        :filter="filter"
        :columns="columns"
        row-key="id"
        :pagination.sync="serverPagination"
        @request="fetchData"
      >
        <template slot="top-right" slot-scope="props">
            <!-- <q-checkbox v-model="parameters.opened" @input="fetchData({serverPagination, filter})" label="Abertos"/> -->
            <!-- <q-checkbox v-model="parameters.closed" @input="fetchData({serverPagination, filter})" label="Fechados"/> -->
            <!-- <q-checkbox v-model="parameters.merged" @input="fetchData({serverPagination, filter})" label="Mergeados"/> -->
        </template>
      </q-table>
    </div>
  </div>
</template>

<style>
</style>

<script>
import { Loading } from 'quasar'
import axios from 'axios'

export default {
  name: 'MegeRequests',
  data () {
    return {
      parameters: {
        opened: true,
        closed: false,
        merged: false
      },
      filter: '',
      projects: [],
      error: null,
      columns: [],
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 10
      }
    }
  },
  created () {
    this.tableColumns()
    this.fetchData(
      {pagination: this.serverPagination},
      {filter: this.filter}
    )
  },
  methods: {
    fetchData ({pagination, filter}) {
      Loading.show({
        spinnerColor: 'blue'
      })

      const queryParameters = []
      if (this.parameters.opened) {
        queryParameters.push('status=opened')
      }

      if (this.parameters.closed) {
        queryParameters.push('status=closed')
      }

      if (this.parameters.merged) {
        queryParameters.push('status=merged')
      }

      this.filter += queryParameters.join('&')

      axios.get(`/api/v4/merge_requests?per_page=${pagination.rowsPerPage}&page=${pagination.page}&order_by=created_at&sort=desc&${filter}`)
        .then(
          response => {
            this.serverPagination = pagination
            this.serverPagination.rowsNumber = response.headers['x-total']
            this.projects = response.data

            Loading.hide()
          }
        ).catch(error => {
          Loading.hide()
          this.error = error.toString()
        })
    },
    tableColumns () {
      this.columns = [
        {name: 'title', label: 'Título', align: 'left', field: 'title'},
        {name: 'state', label: 'Estado', align: 'left', field: 'state'},
        {name: 'author', label: 'Autor', align: 'left', field: row => row.author.name},
        {name: 'assignee', label: 'Atribuído para', align: 'left', field: row => row && row.assignee ? row.assignee.name : 'none'},
        {name: 'mergeStatus', label: 'Merge status', align: 'left', field: 'merge_status'},
        {name: 'createdAt', label: 'Criado em', align: 'left', field: 'created_at'},
        {name: 'webUrl', label: 'Link', align: 'left', field: 'web_url'}
      ]
    }
  }
}
</script>
