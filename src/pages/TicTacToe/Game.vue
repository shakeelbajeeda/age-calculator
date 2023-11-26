<!-- <template>
  <q-page padding class="">
    <div class="row justify-content-center items-center">
      <div class="col-xs-6">
        <div class="row">
          <div class="col-4" v-for="(n, index) in 9">
            <q-btn @click="play(index)">
              <q-icon :name="findIcon(index)"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
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
      if (this.next_player === 1) {
        this.player1Selections.push(index);
        this.next_player = 2;
      } else {
        this.player2Selections.push(index);
        this.next_player = 1;
      }
      this.winnersIndexes.forEach(item => {
        if(this.compareArrays(item, this.player1Selections) || this.compareArrays(item.reverse(), this.player1Selections)) {
          alert('Player1 Win')
        }
        if(this.compareArrays(item, this.player2Selections) || this.compareArrays(item.reverse(), this.player2Selections)) {
          alert('Player2 Win')
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
    compareArrays(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    }
  }
}
</script> -->


<template>
  <q-page padding class="">
    <!-- content -->
    <div class="row justify-content-center items-center">
      <div class="col-xs-6">
        <div class="row">
          <div class="col-4" v-for="(n, index) in 9">
            <q-btn @click="play(index)">
              <q-icon :name="findIcon(index)"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
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
      win: false,
    }
  },
  methods: {
    play(index) {
        this.player1Selections.push(index);
        this.player1Selections = this.player1Selections.sort()
        this.findWinner();
        setTimeout(() => {
          this.systemPlay();
        }, 900)
    },

    systemPlay() {
      let indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      // // const random = Math.floor(Math.random() * indexes.length);
      // let random = this.player1Selections[this.player1Selections.length -1];
      // random++;
      // if(random === 8) {
      //   random = 5;
      // }
      let random = 0;
      
      if (this.player1Selections.length <= 2) {
        this.winnersIndexes.forEach(item => {
          if (this.player1Selections.length === 1 && item[0] === this.player1Selections[0]) {
            random = item[1];
          }
          if (this.player1Selections.length === 2 && item[1] === this.player1Selections[1]) {
            random = item[2];
          }
        })
      } else {
      random = random = Math.floor(Math.random() * indexes.length)  ;
      }
      
      if(!this.player1Selections.includes(random)) {
        this.player2Selections.push(random);
        this.findWinner();
        return;
      }else {
        this.systemPlay();
      }
    },

    findWinner() {
      this.winnersIndexes.forEach(item => {
        if(this.compareArrays(item, this.player1Selections) || this.compareArrays(item.reverse(), this.player1Selections)) {
          this.win = true;
          alert('Player1 Win')
        }
        if(this.compareArrays(item, this.player2Selections) || this.compareArrays(item.reverse(), this.player2Selections)) {
          this.win = true;
          alert('System Win')
        }
      });
      if(!this.win && this.player1Selections.length === 3 && this.player2Selections.length === 3) {
        alert('draw')
      }
    },

    findIcon(index) {
      if (this.player1Selections.includes(index)) {
        return 'close';
      } else if (this.player2Selections.includes(index)) {
        return 'radio_button_unchecked';
      }
      return '';
    },
    compareArrays(a, b) {
      return JSON.stringify(a) === JSON.stringify(b);
    }
  }
}
</script>
