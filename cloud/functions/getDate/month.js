module.exports =  async ({methods,db,data}) => {
  switch (methods) {
    case 'get':
        try {
          return await db.collection('months').orderBy('month', 'asc')
          .get()
        } catch (e) {
          return e
        }
    case 'update':
      try {
        return await db.orderBy('month', 'asc')
        .get()
      } catch (e) {
        return e
      }
    default:
      break;
  }
}