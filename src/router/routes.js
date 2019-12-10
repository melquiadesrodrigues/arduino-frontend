import PageLayout from "@/layout/Page.vue";
import NotFound from "@/pages/NotFoundPage.vue";

const Home = () => import("@/pages/Home.vue");

const routes = [
  {
    path: "/",
    component: PageLayout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
    ]
  },
  { path: "*", component: NotFound },
];

export default routes;
