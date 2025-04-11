import { storageService } from "./../storage.service.ts"
import { UserModel } from "../../models/user.model.ts"

export const userService = {
    query,
    getById,
    signup,
    getByUsernameAndPassword,
    login,
    getLoggedinUser,
    logout,
}

const STORAGE_KEY : string = 'user'

export type CredentialsModel = {
  username: string
  password: string
}


function query(): Promise<UserModel[]> {
  return storageService.query<UserModel>(STORAGE_KEY)
}

function getById(userId : string) : Promise<UserModel> {
  return storageService.get(STORAGE_KEY, userId)
}

async function getByUsernameAndPassword(credentials: CredentialsModel): Promise<UserModel> {
  const users = await query()
  const user = users.find(user => user.username === credentials.username)
  if(user === undefined || user.password !== credentials.password)
    throw new Error('Username or password is incorrect')
  return user
}

async function signup(credentials: CredentialsModel): Promise<UserModel> {
  const users: UserModel[] = await query()
  const isUsernameExists = users.some(user => user.username === credentials.username)
  if (isUsernameExists) 
    throw new Error('Username already exists')
  return storageService.post(STORAGE_KEY, credentials)
}

async function login(credentials: CredentialsModel): Promise<void>{
  const user = await getByUsernameAndPassword(credentials)
  sessionStorage.setItem('LoggedinUser', JSON.stringify({_id: user._id, username: user.username}))
}

async function getLoggedinUser(): Promise<Omit<UserModel,'password'> | null>{
  const userStr = sessionStorage.getItem('LoggedinUser')
  if(!userStr) return null
  return JSON.parse(userStr)
}

async function logout(): Promise<void> {
  sessionStorage.removeItem('LoggedinUser');
}

