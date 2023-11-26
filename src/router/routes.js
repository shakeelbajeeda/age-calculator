
const routes = [
  {
    path: '/',
    component: () => import('layouts/TicTacToe.vue'),
    children: [
      { path: '', component: () => import('pages/TicTacToe/Home.vue') },
      { path: 'double-players', component: () => import('pages/TicTacToe/DoublePlayer.vue') },
      { path: 'single-player', component: () => import('pages/TicTacToe/SinglePlayer.vue') },
      { path: 'game', component: () => import('pages/TicTacToe/Game.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'calculator', component: () => import('pages/IndexPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
