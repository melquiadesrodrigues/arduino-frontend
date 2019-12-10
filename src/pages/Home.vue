<template>
  <div>
    <div class="row">
      <div class="col-12">
        <base-card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">
                  {{$t('home.dayleConsumption')}} - {{$t('home.totalDayleConsumption')}}:
                  {{dayleChart.totals[dayleChart.activeIndex]}} {{labelCharts}}
                </h5>
                <h2 class="card-title">{{$t('home.consumptionPerHour')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in dayleChart.days"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         style="padding: 4px;"
                         :class="{active: dayleChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initDayleChart(index)"
                           name="options" autocomplete="off"
                           :checked="dayleChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="dayleChart"
                        chart-id="dayle-chart"
                        :chart-data="dayleChart.chartData"
                        :gradient-colors="dayleChart.gradientColors"
                        :gradient-stops="dayleChart.gradientStops"
                        :extra-options="dayleChart.extraOptions">
            </line-chart>
          </div>
        </base-card>
      </div>
    </div>
    <div class="row">
      <div class="col-12" :class="{'text-right': isRTL}">
        <base-card type="chart">
          <template slot="header">
            <h5 class="card-category">
              {{$t('home.annualConsumption')}} - {{$t('home.totalAnnualConsumption')}}:
              {{annualChart.total}} {{labelCharts}}
            </h5>
            <h3 class="card-title">{{$t('home.consumptionPerMonth')}}</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       ref="annualChart"
                       chart-id="annual-chart"
                       :chart-data="annualChart.chartData"
                       :gradient-stops="annualChart.gradientStops"
                       :extra-options="annualChart.extraOptions">
            </bar-chart>
          </div>
        </base-card>
      </div>
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';
  import BaseCard from "../components/Card";

  export default {
    components: {
      LineChart,
      BarChart,
      BaseCard
    },
    data() {
      return {
        labelCharts: "",
        dayleChart: {
          allData: [],
          hours: [],
          days: [],
          totals: [],
          activeIndex: 0,
          extraOptions: chartConfigs["lineChartOptions"],
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        annualChart: {
          allData: [],
          months: [],
          total: [],
          extraOptions: chartConfigs["barChartConfig"],
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0]
        },
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      }
    },
    methods: {
      initDayleChart(index) {
        let dayleChartData = {
          datasets: [{
            label: this.labelCharts,
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.dayleChart.allData[index]
          }],
          labels: this.dayleChart.hours,
        };
        this.$refs.dayleChart.updateGradients(dayleChartData);
        this.dayleChart.chartData = dayleChartData;
        this.dayleChart.activeIndex = index;
      },
      initAnnualChart() {
        let annualChartData = {
          datasets: [{
            label: this.labelCharts,
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: this.annualChart.allData
          }],
          labels: this.annualChart.months,
        };
        this.$refs.annualChart.updateGradients(annualChartData);
        this.annualChart.chartData = annualChartData;
      }
    },
    mounted() {
      axios.get('http://192.168.0.11:8000/sensor_data/month/actual')
        .then(response => {
          this.labelCharts = response.data.label;
          this.dayleChart.allData = response.data.data;
          this.dayleChart.hours = response.data.hours;
          this.dayleChart.days = response.data.days;
          this.dayleChart.activeIndex = response.data.active;
          this.dayleChart.totals = response.data.totals;
          this.initDayleChart(this.dayleChart.activeIndex);
        });
      axios.get('http://192.168.0.11:8000/sensor_data/year/actual')
        .then(response => {
          this.annualChart.allData = response.data.data;
          this.annualChart.months = response.data.months;
          this.annualChart.total = response.data.total;
          this.initAnnualChart();
        });
    }
  };
</script>
<style>
</style>
