<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Menu
          <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
        </q-toolbar-title>
        <q-btn flat size="lg" round dense icon="person">
          <q-popover fit>
          <q-list separator link>
            <q-item to="/accounts/:id" replace>
              Minha Conta
            </q-item>
            <q-item @click.native="doSomething">
              Sair
            </q-item>
          </q-list>
        </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>
          <router-link to="/" replace>
            Home
          </router-link>
        </q-list-header>
        <q-item to="/projects" replace>
          <q-item-side icon="assignment" />
          <q-item-main label="Projetos"/>
        </q-item>
        <q-item to="/merge-requests" replace>
          <q-item-side icon="pageview" />
          <q-item-main label="Merge Requests"/>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="q-mx-md q-mt-md">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
