import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "SabeerTravel",

    }).then(()=>{
console.log("Database connected succussfully !")
    }).catch(err=>{
        console.log(`error are occured ${err}`)
    })
}

// export default dbConnection; aa2jZDiHuBDfUhyT