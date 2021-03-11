module.exports =  async ({methods,db,data}) => {
  switch (methods) {
    case 'get':
        try {
          console.log(data)
          return await db.orderBy('month', 'asc')
          .get()
        } catch (e) {
          return e
        }
      break;
    default:
      break;
  }
}