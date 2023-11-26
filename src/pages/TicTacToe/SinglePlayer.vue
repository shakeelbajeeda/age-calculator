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
        // Check if the player has a winning move
        let winningMove = this.findWinningMove(this.playerSelections);

        if (winningMove !== null) {
          this.playerSelections.push(winningMove);
        } else {
          // If the player doesn't have a winning move, play a random move
          this.playerSelections.push(index);
        }

        this.checkWinner();

        // System play after a short delay
        setTimeout(() => {
          this.systemPlay();
        }, 900);
      }
    },

    /**
     * System Play
     */
    systemPlay() {
      // Check if the system can win in the next move
      let winningMove = this.findWinningMove(this.systemSelections);

      if (winningMove !== null) {
        this.systemSelections.push(winningMove);
        this.checkWinner();
        return;
      }

      // Check if the player can win in the next move and block that move
      let blockingMove = this.findWinningMove(this.playerSelections);

      if (blockingMove !== null) {
        this.systemSelections.push(blockingMove);
        this.checkWinner();
        return;
      }

      // If neither player nor system can win, play a random move
      let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      let random = Math.floor(Math.random() * indexes.length);

      if (!this.playerSelections.includes(random) && !this.systemSelections.includes(random)) {
        this.systemSelections.push(random);
        this.checkWinner();
      } else {
        this.systemPlay(); // Try again if the random move is already taken
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

    /**
     * Helper function to find a winning move for the system
     */
    findWinningMove(selections) {
      for (let i = 0; i < this.winnersIndexes.length; i++) {
        let count = 0;
        let emptyIndex = null;

        for (let j = 0; j < this.winnersIndexes[i].length; j++) {
          if (selections.includes(this.winnersIndexes[i][j])) {
            count++;
          } else {
            emptyIndex = this.winnersIndexes[i][j];
          }
        }

        if (count === 2 && emptyIndex !== null && !this.playerSelections.includes(emptyIndex) && !this.systemSelections.includes(emptyIndex)) {
          return emptyIndex; // Return the winning move
        }
      }

      return null; // No winning move found
    },
  }
}
</script>
