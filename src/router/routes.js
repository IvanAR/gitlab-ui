
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/projects',
        component: () => import('pages/projects/projects')
      },
      {path: '/merge-requests', component: () => import('pages/mergerequests/merge-requests')},
      {path: '/accounts/:id', component: () => import('pages/accounts/account')}
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
