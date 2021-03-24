import requset from "./request"

export const getMonth:any = () => requset("getDate",'get')

export const login:any = () => requset("login")

export const updateMonth:any = data => requset("getDate","update",data)

export const createDianry:any = data => requset("getDate","newdianry",data)

export const getDianryList:any = data => requset("getDate","getDianryByMonth",data)

export const updateDiary:any = data => requset("getDate","updatediary",data)