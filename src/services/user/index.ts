import { userService as RmoteService } from "./user.service.ts"
import { userService as localService } from "./user.service.local.ts"

// const { VITE_LOCAL } = import.meta.env 

export const userService = false ? localService : RmoteService 

// export const userService = VITE_LOCAL === 'true' ? localService : RmoteService 