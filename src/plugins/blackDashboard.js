import RTLPlugin from "./RTLPlugin";
import "@/assets/sass/black-dashboard.scss";
import "@/assets/css/nucleo-icons.css";

export default {
  install(Vue) {
    Vue.use(RTLPlugin);
  }
}
