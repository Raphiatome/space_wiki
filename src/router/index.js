import { createWebHistory, createRouter } from "vue-router";
import Astronauts from "../components/Astronauts.vue";
import Event from "../components/Event.vue";
import Ship from "../components/Ship.vue";
import Details from "../components/Details.vue";

const routes = [
    {
        path: "/",
        name: "astro",
        component: Astronauts
    },
    {
        path: "/ship",
        name: "ship",
        component: Ship
    }, 
    {
        path: "/events",
        name: "event",
        component: Event
    },
    {
        path: "/details/{type}/{id}",

    },
    {
        path: "/ship/:id?",
        name: 'ship_detail',
        component: Details
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;