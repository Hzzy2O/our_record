import requset from "./request"

export const getMonth:any = () => requset("getDate",'months','get')

export const login:any = () => requset("login")

export const updateMonth:any = data => requset("getDate","months","update",data)