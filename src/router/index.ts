import { createRouter, createWebHistory } from "vue-router"
import BillForm from '../views/BillForm.vue'
import BillList from '../views/BillList.vue'
const routes = [
	{
		path: "/createBill",
		name: "createBill",
		component: BillForm,
		meta: {
			middleware: []
		}
	},
	{
		path: "/billList",
		name: "billList",
		component: BillList,
		meta: {
			middleware: []
		}
	},
]
export const router = createRouter({
	history: createWebHistory(),
	routes: routes
})