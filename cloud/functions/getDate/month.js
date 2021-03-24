module.exports =  async ({methods,db,data}) => {
  switch (methods.toLowerCase()) {
    case 'get':
        try {
          const _ = db.command
          const $ = db.command.aggregate
          return await db.collection('months').aggregate()
          .lookup({
            from: 'days',
            localField: 'month',
            foreignField: 'bt_month',
            as: 'daysArr'
          }).lookup({
            from: 'dianry',
            let: {
              year: '$bt_year',
              month: '$month'
            },
            pipeline: $.pipeline()
              .match(_.expr($.and([
                $.eq(['$bt_year', '$$year']),
                $.eq(['$bt_month', '$$month']),
                $.gt(['$status', 0])
              ])))
              .project({
                _id: 0,
                title: 1,
              })
              .done(),
            as: 'count',
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
    case 'newdianry':
      try {
        data.status = 1;
        data.id = Date.now()
        return await db.collection('dianry').add({data})
      } catch (error) {
        
      }
    case 'getdianrybymonth':
      try {
        return await db.collection('dianry').where({
          bt_month:data.month,
          status:1
        }).get()
      } catch (error) {
        
      }
    case 'updatediary':
      try {
        const {id} = data
        return await db.collection('dianry').where({
          id
        }).update({
          data: {
            ...data
          },
        })
      } catch (error) {
        
      }
    default:
      break;
  }
}