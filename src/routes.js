import PageNotFound from "./pages/pageNotFound/PageNotFound"
import ListsPage from "./pages/listPage/ListsPage"
import LoginPage from "./pages/authPage/LoginPage"
import CreateListPage from "./pages/createListPage/CreateListPage"
import { routeNames } from "./constants/routeNames"

const routes = [
	{
		exact: true,
		path: routeNames.ROUTE_PAGE_NOT_FOUND,
		component: PageNotFound
	},
    {
		exact: true,
		path: routeNames.ROUTE_MAIN,
		component: ListsPage
	},
    {
        exact: true,
		path: routeNames.ROUTE_LOGIN,
		component: LoginPage
    },
	{
        exact: true,
		path: routeNames.ROUTE_CREATE_LIST,
		component: CreateListPage
    }
]

export default routes