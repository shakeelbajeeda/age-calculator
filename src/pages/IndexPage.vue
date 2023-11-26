<template>
  <q-page>
    <div class="q-px-md q-pt-md">
      <div class="row">
        <div class="col-xs-6">
          Today's Date
        </div>
        <div class="col-xs-6 text-right">
          {{ day }}
        </div>
      </div>
      <q-input v-model="date" :rules="['date']" filled label="Today Date" mask="date">
        <template v-slot:append>
          <q-icon class="cursor-pointer" name="event">
            <q-popup-proxy cover transition-hide="scale" transition-show="scale">
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup color="primary" flat label="Close"/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <span>Date of Birth</span>
      <q-input v-model="dob" :rules="['date']" filled label="Date of Birth" mask="date">
        <template v-slot:append>
          <q-icon class="cursor-pointer" name="event">
            <q-popup-proxy cover transition-hide="scale" transition-show="scale">
              <q-date v-model="dob">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup color="primary" flat label="Close"/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div>
        <q-btn
          color="primary"
          label="Calculate"
          @click="calculateDate"
        />
        <q-btn
          class="q-ml-md"
          color="primary"
          label="Clear"
          @click="reset"
        />
      </div>
      <div class="q-pt-lg">
        Your Age
      </div>
      <div class="row rounded-borders q-pb-sm q-pt-xs" style="border: 1px solid red">
        <div class="col-xs-4 text-center text-subtitle1">
          <div>Years</div>
          <q-circular-progress
            :max="100"
            :value="this.year"
            class="text-light-blue"
            color="light-blue"
            show-value
            size="50px"
            track-color="grey-4"
          />
        </div>
        <div class="col-xs-4 text-center text-subtitle1">
          <div>Month</div>
          <q-circular-progress
            :max="12"
            :value="this.month"
            class="text-light-blue"
            color="light-blue"
            show-value
            size="50px"
            track-color="grey-4"
          />
        </div>
        <div class="col-xs-4 text-center text-subtitle1">
          <div>Days</div>
          <q-circular-progress
            :max="30"
            :value="this.days"
            class="text-light-blue"
            color="light-blue"
            show-value
            size="50px"
            track-color="grey-4"
          />
        </div>
      </div>
      <div>
        <div class="q-pt-lg">
          Extra
        </div>
        <div class="row">
          <div class="col-xs-6">
            <div>
              Total Years:
            </div>
            <div>
              Total Months:
            </div>
            <div>
              Total Weeks:
            </div>
            <div>
              Total Days:
            </div>
            <div>
              Total Hours:
            </div>
            <div>
              Total Minutes:
            </div>
            <div>
              Total Seconds:
            </div>
          </div>
          <div class="col-xs-6">
            <div>
              {{ this.total_years }}
            </div>
            <div>
              {{ this.total_months }}
            </div>
            <div>
              {{ Math.ceil(this.total_weeks) }}
            </div>
            <div>
              {{ this.total_days }}
            </div>
            <div>
              {{ this.total_hours }}
            </div>
            <div>
              {{ this.total_mints }}
            </div>
            <div>
              {{ this.total_seconds }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div> {{ batteryLevel ?? 0 }} </div>
    <q-btn
      @click="checkConnection"
      label="check connection"
      color="secondary"
    />
    <q-btn
      @click="logIn()"
      label="login"
      color="secondary"
    />
  </q-page>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import {date, Notify, useQuasar} from "quasar";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

export default defineComponent({
  name: 'IndexPage',
  setup () {
    // equivalent to calling this on creating the component
    const $q = useQuasar();
    $q.addressbarColor.set('#a2e3fa');
  },
  data() {
    return {
      date: date.formatDate(new Date()),
      dob: '',
      year: 0,
      month: 0,
      days: 0,
      total_months: 0,
      total_years: 0,
      total_days: 0,
      total_weeks: 0,
      total_hours: 0,
      total_mints: 0,
      total_seconds: 0,
      batteryLevel: '',
    }
  },
  computed: {
    day() {
      return new Date(this.date).toLocaleDateString('default', {weekday: 'long'});
    }
  },
  mounted() {
    GoogleAuth.initialize({
      clientId: '130919346282-m2hhjmvrbapon05tinuau9tc65kudvpr.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  },
  created() {
    window.addEventListener("batterystatus", onBatteryStatus, false);
    function onBatteryStatus(status) {
      this.batteryLevel = "Level: " + status.level + " isPlugged: " + status.isPlugged;
    }
  },
  methods: {
    reset() {
      this.dob = '';
    },
    logIn: async () => {
      const response = await GoogleAuth.signIn();
      console.log(response);
    },

    checkConnection() {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';
      Notify.create({
        color: 'positive',
        icon: 'done',
        position: 'top',
        message: 'Connection Type ' + states[networkState]
      });
    },
    async calculateDate() {
      let diff = new Date(this.date) - new Date(this.dob);
      let totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      this.year = Math.floor(totalDays / 365.25);
      this.month = Math.floor((totalDays % 365.25) / 30.4375);
      this.days = Math.floor((totalDays % 365.25) % 30.4375);
      this.total_years = this.year;
      this.total_months = (this.year * 12) + this.month  ?? 0;
      this.total_weeks = Math.floor(this.getDaysFromYears(this.total_years) / 7);
      this.total_days = this.getDaysFromYears(this.total_years);
      this.total_hours = this.total_days * 24;
      this.total_mints = this.total_hours * 60;
      this.total_seconds = this.total_mints * 60;
    },
    getDaysFromYears(year) {
      let days = 0 ;
      for (let i = 0; i <= year ; i++){
        if (year % 4 === 0 || year % 100 === 0 || year % 400 === 0) {
          days += 366
        }else {
          days += 365;
        }
      }
      return days;
    }
  }
})
</script>
