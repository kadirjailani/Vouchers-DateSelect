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
      <select
        v-model="optionWeeklySelected"
        class="browser-default custom-select custom-select-lg mb-3"
      >
        <option v-for="option in optionsWeekly" :value="option" v-bind:key="option.id">{{ option }}</option>
      </select>
    </div>

    <div v-else-if="selected === 'monthly'">
      <p>Subscription for 3 months</p>
    </div>

    <button
      class="btn btn-primary subs-button"
      v-on:click="subsThis"
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
      // todayDate: moment(),
      selected: "",
      price: 30,
      optionsWeekly: [2, 4, 6, 8],
      optionWeeklySelected: 2,
      finalPrice: "",
      startDate: moment().format("DD-MM-YYYY"),
      endDate: "",
      selectedDateToSubs: [],
    };
  },
  methods: {
    subsThis: function () {
      this.selectedDateToSubs = []; // Clear all previous date's array

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

      this.postPackageToServer(); // Post to server
    },
    dailySubs: function () {
      this.finalPrice = this.price;
      this.endDate = this.startDate;
      this.selectedDateToSubs.push(this.startDate);
    },
    weeklySubs: function () {
      let end = moment().add(this.optionWeeklySelected * 7, "d");
      let arr = [];

      // Get "next" tuesday
      let tmp = moment().clone().day(2);

      // Get Weekly list
      while (tmp.isBefore(end)) {
        tmp.add(7, "days");
        this.selectedDateToSubs.push(tmp.format("DD-MM-YYYY"));
      }

      let getFinalPrice = this.price * this.selectedDateToSubs.length;
      this.finalPrice = getFinalPrice;
      this.endDate = end.format("DD-MM-YYYY");
    },
    monthlySubs: function () {
      let end = moment().add(3, "M");
      let tmp = moment().date(20);

      // Get monthly list
      while (tmp.isBefore(end)) {
        tmp.add(1, "M");
        this.selectedDateToSubs.push(tmp.format("DD-MM-YYYY"));
      }

      let getFinalPrice = this.price * this.selectedDateToSubs.length;
      this.finalPrice = getFinalPrice;
      this.endDate = end.format("DD-MM-YYYY");
    },
    postPackageToServer: async function () {
      const url = "http://localhost:3000/";
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "*");

      let raw = JSON.stringify({
        type: this.selected,
        price: this.finalPrice,
        startDate: this.startDate,
        endDate: this.endDate,
        subscribeDate: this.selectedDateToSubs,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${url}vouchers`, requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

      // console.log(raw);
    },
  },
};
</script>