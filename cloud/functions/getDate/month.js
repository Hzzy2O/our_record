module.exports =  async ({methods,db,data}) => {
  switch (methods) {
    case 'get':
        try {
          return await db.collection('months').aggregate()
          .lookup({
            from: 'days',
            localField: 'month',
            foreignField: 'bt_month',
            as: 'daysArr'
          }).sort({
            month: 1,
          }).end(res=>{
            res.forEach(e=>e.daysArr.sort((a,b)=> b.day - a.day))
            return res
          })
        } catch (e) {
          return e
        }
    case 'update':
      try {
        const {month} = data;
        return await db.collection('months').where({
          month
        }).update({
          data: {
            ...data
          },
        })
      } catch (e) {
        return e
      }
    default:
      break;
  }
}