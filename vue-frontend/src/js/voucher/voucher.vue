<template>
  <div class="app">
    <h5 class="app-title">I want to subscribe to:</h5>

    <!-- Selection of subscriptions -->
    <div class="d-flex">
      <div class="radioGaGa">
        <input type="radio" id="one" value="daily" v-model="selected" />
        <label for="one">Daily</label>
      </div>
      <div class="radioGaGa">
        <input type="radio" id="one" value="weekly" v-model="selected" />
        <label for="one">Weekly</label>
      </div>
      <div class="radioGaGa">
        <input type="radio" id="two" value="monthly" v-model="selected" />
        <label for="two">Monthly</label>
      </div>
    </div>

    <!-- if user want to subscribe to weekly with selected period -->
    <div v-if="selected === 'weekly'">
      <select v-model="selectedOption" class="browser-default custom-select custom-select-lg mb-3">
        <option v-for="option in optionsWeekly" :value="option" v-bind:key="option.id">{{ option }}</option>
      </select>
    </div>

    <div v-else-if="selected === 'monthly'">
      <p>If monthly</p>
    </div>

    <button
      class="btn btn-primary subs-button"
      v-on:click="postPackageToServer"
      :disabled="selected===''"
    >Subscribe now</button>
  </div>
</template>

<script>
window.moment = require("moment");

export default {
  data() {
    return {
      // greeting: "hello world",
      todayDate: moment(),
      selected: "",
      price: 30,
      optionsWeekly: [2, 4, 6, 8],
      selectedOption: 2,
      selectedDateToSubs: [],
    };
  },
  methods: {
    subsThis: function () {
      switch (this.selected) {
        case "daily":
          this.dailySubs();
          break;
        case "weekly":
          this.weeklySubs();
          break;
        case "monthly":
          this.monthlySubs();
      }
    },
    dailySubs: function () {
      console.log("daily");
    },
    weeklySubs: function () {
      // let start = moment();
      let end = moment().add(this.selectedOption * 7, "d");

      var arr = [];
      // Get "next" tuesday
      let tmp = moment().clone().day(2);

      // Get Weekly list
      while (tmp.isBefore(end)) {
        tmp.add(7, "days");
        this.selectedDateToSubs.push(tmp.format("DD-MM-YYYY"));
      }

      let finalPrice = this.price * this.selectedDateToSubs.length;
      console.log(this.selectedDateToSubs, finalPrice);

      this.selectedDateToSubs = []; // empty this array for future action
    },
    monthlySubs: function () {
      let end = moment().add(3, "M");
      let tmp = moment().date(20);

      // Get monthly list
      while (tmp.isBefore(end)) {
        tmp.add(1, "M");
        this.selectedDateToSubs.push(tmp.format("DD-MM-YYYY"));
      }

      let finalPrice = this.price * this.selectedDateToSubs.length;
      console.log(this.selectedDateToSubs, finalPrice);

      this.selectedDateToSubs = []; // empty this array for future action
    },
    postPackageToServer: function () {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append('Access-Control-Allow-Origin', '*');

      var raw = JSON.stringify({
        type: "monthly",
        price: 30,
        startDate: "04-08-2020",
        endDate: "06-08-2020",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      let postData = async() => {
        let postingDating = await fetch("http://localhost:3000/vouchers", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result, "Run"))
        .catch((error) => console.log("error", error));
      }
      // console.log("run");
    },
  },
};
</script>