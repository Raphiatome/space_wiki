import { createWebHistory, createRouter } from "vue-router";
import Astronauts from "../components/Astronauts.vue";
import Event from "../components/Event.vue";
import Ship from "../components/Ship.vue";
import Details from "../components/Details.vue";

const routes = [
    {
        path: "/",
        name: "astro",
        component: Astronauts,
        children: [
            {
                path: "astro/details/:id",
                name: "astro_details",
                component: Details
            }
        ]
    },
    {
        path: "/ship",
        name: "ship",
        component: Ship,

        children: [
            {
                path: "details/:id",
                name: 'ship_details',
                component: Details
            }
        ],
    }, 
    {
        path: "/events",
        name: "event",
        component: Event,
        children: [
            {
                path: "details/:id",
                name: 'event_details',
                component: Details
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;