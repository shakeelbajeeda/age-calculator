<template>
  <div>
    <q-dialog position="top" v-model="popupModel" full-width>
      <q-card class="q-pa-md q-ma-md">
        <q-card-section class="text-body1 text-center">
          {{ text }}
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="Close"
            @click="$emit('close')"
            color="negative"
            class="full-width"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  emits: ['close'],
  props: {
    model: Boolean,
    text: String,
  },
  setup () {
    return {

    }
  },
  computed: {
    popupModel() {
      return this.model;
    }
  }
}
</script>
