<template>
  <div class="row gutter-sm">

    <!-- <div class="col-12"> -->
      <!-- <q-btn label="Novo" icon="library add" size="md" color="primary" class="float-right" @click="$router.push('/companies/company')" /> -->
    <!-- </div> -->

    <div class="col-12">
      <q-table
        title="Projetos"
        :filter="filter"
        :data="projects"
        :columns="columns"
        row-key="id"
        :pagination.sync="serverPagination"
        @request="fetchData"
      >
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
  name: 'Projects',
  data () {
    return {
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
      axios.get(`/api/v4/projects?per_page=${pagination.rowsPerPage}&page=${pagination.page}&statistics=true&order_by=name&sort=asc`)
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
        {name: 'namespace', label: 'Namespace/Nome', align: 'left', field: 'name_with_namespace'},
        {name: 'description', label: 'Descrição', align: 'left', field: 'description'},
        {name: 'createdAt', label: 'Criado em', align: 'left', field: 'created_at'},
        {name: 'visibility', label: 'Visibilidade', align: 'left', field: 'visibility'},
        {name: 'statistics', label: 'Commits', align: 'left', field: row => row && row.statistics ? row.statistics.commit_count : 0},
        {name: 'archived', label: 'Arquivado', align: 'left', field: 'archived', format: val => { if (val) { return 'Sim' } else { return 'Não' } }}
      ]
    }
  }
}
</script>
