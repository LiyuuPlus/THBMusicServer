import { Routes } from "../router"
export type Controller = {
    ControllerName: string,
    initRoutes(): Routes
}