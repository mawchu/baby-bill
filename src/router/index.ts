import { createRouter, createWebHistory } from "vue-router"
import BillForm from '../views/BillForm.vue'
import BillList from '../views/BillList.vue'
const routes = [
	{
		path: "/createBill",
		name: "createBill",
		component: BillForm
	},
	{
		path: "/billList",
		name: "billList",
		component: BillList
	},
]
export const router = createRouter({
	history: createWebHistory(),
	routes: routes
})