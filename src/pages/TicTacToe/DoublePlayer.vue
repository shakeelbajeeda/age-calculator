<template>
  <q-page padding class=" flex flex-center">
    <div class="col-xs-12 full-width">
      <q-item v-if="!dialog">
        <q-item-section class="text-capitalize text-center">
          {{ firstPlayer }}
        </q-item-section>
        <q-item-section class="text-center">
          VS
        </q-item-section>
        <q-item-section class="text-capitalize text-center ">
          {{ secondPlayer }}
        </q-item-section>
      </q-item>
      <div class="row q-pt-xl">
        <div class="col-xs-4 bg-grey-1" v-for="(n, index) in 9">
          <div>
            <q-btn @click="play(index)" class="full-width" style="height: 60px">
              <q-icon :name="findIcon(index)"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialog" persistent full-width>
      <q-card class="rounded-borders">
        <q-card-section class="text-center text-h6">
          Enter Player Names
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="firstPlayer"
            outlined
            label="1st Player Name"
          />
          <q-input
            v-model="secondPlayer"
            outlined
            label="2nd Player Name"
            class="q-mt-md"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            label="Add"
            :disable="!(firstPlayer && secondPlayer)"
            :color="!(firstPlayer && secondPlayer) ? 'grey-5' : 'primary'"
            @click="dialog = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <Popup
      :model="popupModel"
      :text="popupText"
      @close="resetGame"
    />
  </q-page>
</template>

<script>
import Popup from "components/Popup.vue";

export default {
  name: 'DoublePlayer',
  components: {Popup},
  data() {
    return {
      popupText: null,
      popupModel: false,
      dialog: true,
      firstPlayer: null,
      secondPlayer: null,
      player1Selections: [],
      player2Selections: [],
      next_player: 1,
      winnersIndexes: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ],
    }
  },
  methods: {
    play(index) {
      if (!this.player1Selections.includes(index) && !this.player2Selections.includes(index)) {
        if (this.next_player === 1) {
          this.player1Selections.push(index);
          this.next_player = 2;
        } else {
          this.player2Selections.push(index);
          this.next_player = 1;
        }
        this.checkWinner();
      }
    },

    checkWinner() {
      this.winnersIndexes.forEach(item => {
        if (this.findWinner(item, this.player1Selections)) {
          this.popupText = this.firstPlayer + ' is winner';
          this.popupModel = true;
        } else if (this.findWinner(item, this.player2Selections)) {
          this.popupText = this.secondPlayer + ' is winner';
          this.popupModel = true;
        } else if ((this.player1Selections.length === 5 && this.player2Selections.length === 4) || (this.player1Selections.length === 4 && this.player2Selections.length === 5)) {
          this.popupText = 'Draw';
          this.popupModel = true;
        }
      });
    },

    findIcon(index) {
      if (this.player1Selections.includes(index)) {
        return 'close';
      } else if (this.player2Selections.includes(index)) {
        return 'radio_button_unchecked';
      }
      return '';
    },

    findWinner(array, playerSelections) {
      let value = true;
      array.forEach(item => {
        if (!playerSelections.includes(item)) {
          value = false;
        }
      });
      return value;
    },

    resetGame() {
      this.popupModel = false;
      this.next_player = 1;
      this.player1Selections = [];
      this.player2Selections = [];
    }
  }
}
</script>
