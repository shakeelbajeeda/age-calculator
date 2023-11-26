<template>
  <q-page padding class="flex flex-center">
    <div class="col-xs-12 full-width">
      <q-list>
        <q-item
          v-for="item in items"
          :key="item"
          clickable
          v-ripple
          class="shadow-22 rounded-borders q-mt-md"
          @click="$router.push(item.url)"
        >
          <q-item-section class="text-center text-h6">{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      items: [
        {
          label: 'Single Player',
          url: '/single-player',
        },
        {
          label: 'Play With Friends',
          url: '/double-players',
        },
        {
          label: 'Play With System',
          url: '/system-player',
        },
      ]
    }
  }
}
</script>
