const logger = require('./logger')
const logEvent= async()=>{
    try{
        const result1= await job1()
        const result2= await job1(result1)
        const result3= await job1(result2)
        return await job4(result3)


    }catch(error){
        logger.error(error)
    }finally {
        awaitanywayDoThisJob()
    }
}
logEvent()