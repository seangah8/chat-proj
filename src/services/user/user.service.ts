import { UserModel } from "../../models/user.model.ts"
import { httpService } from "../http.service.ts"

export const userService = {
    query,
    getById,
    signup,
    getByUsernameAndPassword,
    login,
    getLoggedinUser,
    logout,
}

export type CredentialsModel = {
  username: string
  password: string
}


async function query(): Promise<UserModel[]> {
  return await httpService.get(`user`)
}

async function getById(userId : string) : Promise<UserModel> {
  return await httpService.get(`user/${userId}`)
}

async function getByUsernameAndPassword(credentials: CredentialsModel): Promise<UserModel> {
  const users = await query()
  const user = users.find(user => user.username === credentials.username)
  if(user === undefined || user.password !== credentials.password)
    throw new Error('Username or password is incorrect')
  return user
}

async function signup<T = Omit<UserModel,'password'>>(credentials : CredentialsModel) :  Promise<T> {
  const user : T = await httpService.post('auth/signup', credentials)
  return _saveLocalUser(user)
}

async function login<T = Omit<UserModel,'password'>>(credentials : CredentialsModel) :  Promise<T> {
	const user : T = await httpService.post('auth/login', credentials)
	return _saveLocalUser(user)
}

async function getLoggedinUser(): Promise<Omit<UserModel,'password'> | null>{
  const userStr = sessionStorage.getItem('LoggedinUser')
  if(!userStr) return null
  return JSON.parse(userStr)
}

async function logout(): Promise<void> {
  sessionStorage.removeItem('LoggedinUser');
}

function _saveLocalUser<T = Omit<UserModel,'password'>>(user : T) : T {
	sessionStorage.setItem('LoggedinUser', JSON.stringify(user))
	return user
}

