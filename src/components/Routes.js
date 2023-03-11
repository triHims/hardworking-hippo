import { matchPath } from "@docusaurus/router"
const routes = [
    "/docs"
]

const matchOptions = {
    strict: false,
    exact: false
}

const matchRoutes = (location) => {

    const filteredRoutes = routes.filter(element =>
        matchPath(location, {
            ...matchOptions,
            path: element
        }) != null

    )

    return filteredRoutes.length>0
}


export { matchRoutes }
