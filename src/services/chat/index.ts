import { chatService as RmoteService } from "./chat.service.ts"
// import { chatService as localService } from "./chat.service.local.ts"

// const { VITE_LOCAL } = import.meta.env 

// export const chatService = false ? localService : RmoteService 
export const chatService = RmoteService 

// export const userService = VITE_LOCAL === 'true' ? localService : RmoteService 