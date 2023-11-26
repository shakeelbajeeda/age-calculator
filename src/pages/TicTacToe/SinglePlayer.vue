<template>
  <q-page padding class=" flex flex-center">
    <div class="col-xs-12 full-width">
      <q-item>
        <q-item-section class="text-capitalize text-center">
          You
        </q-item-section>
        <q-item-section class="text-center">
          VS
        </q-item-section>
        <q-item-section class="text-capitalize text-center ">
          System
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
  name: 'Game',
  components: {Popup},
  data() {
    return {
      popupText: null,
      popupModel: false,
      playerSelections: [],
      systemSelections: [],
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
    /**
     * Player Play
     * @param index
     */
    play(index) {
      if (!this.playerSelections.includes(index) && !this.systemSelections.includes(index)) {
        this.playerSelections.push(index);
        this.checkWinner();
        setTimeout(() => {
          this.systemPlay();
        }, 900)
      }
    },

    /**
     * System Play
     */
    systemPlay() {
      let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      let random = 0;

      if (this.playerSelections.length <= 2) {
        this.winnersIndexes.forEach(item => {
          if (this.playerSelections.length === 1 && item[0] === this.playerSelections[0]) {
            random = item[1];
          }
          if (item[2] === this.playerSelections[1] && item[0] === this.playerSelections[0]) {
            random = item[1];
          } else if (item[0] === this.playerSelections[0] && item[2] === this.playerSelections[1]) {
            random = item[1];
          }else if (this.playerSelections.length === 2 && item[1] === this.playerSelections[1]) {
            random = item[2];
          }
        })
      } else {
        random = random = Math.floor(Math.random() * indexes.length)  ;
      }

      if (!this.playerSelections.includes(random) && !this.systemSelections.includes(random)) {
        this.systemSelections.push(random);
        this.checkWinner();
        return;
      }else {
        this.systemPlay();
      }
    },

    /**
     * Check Game Winner
     */
    checkWinner() {
      this.winnersIndexes.forEach(item => {
        if (this.findWinner(item, this.playerSelections)) {
          this.popupText = 'You win';
          this.popupModel = true;
        } else if (this.findWinner(item, this.systemSelections)) {
          this.popupText = 'System win';
          this.popupModel = true;
        } else if ((this.playerSelections.length === 5 && this.systemSelections.length === 4) || (this.playerSelections.length === 4 && this.systemSelections.length === 5)) {
          this.popupText = 'Draw';
          this.popupModel = true;
        }
      });
    },

    /**
     * Find Player Icon
     * @param index
     * @returns {string}
     */
    findIcon(index) {
      if (this.playerSelections.includes(index)) {
        return 'close';
      } else if (this.systemSelections.includes(index)) {
        return 'radio_button_unchecked';
      }
      return '';
    },

    /**
     * Find Game Winner
     * @param array
     * @param playerSelections
     * @returns {boolean}
     */
    findWinner(array, playerSelections) {
      let value = true;
      array.forEach(item => {
        if (!playerSelections.includes(item)) {
          value = false;
        }
      });
      return value;
    },

    /**
     * Reset game
     */
    resetGame() {
      this.popupModel = false;
      this.next_player = 1;
      this.playerSelections = [];
      this.systemSelections = [];
    },
  }
}
</script>
