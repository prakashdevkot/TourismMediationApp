const config = {
    env: process.env.NODE_ENV || 'development', 
    port: process.env.PORT || 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
    mongoUri: process.env.MONGODB_URI ||"mongodb+srv://devkotaprakash321:Ga6BjlzEwZVCZnDz@cluster0.fdly7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' + 
   (process.env.MONGO_PORT || '27017') +
    '/mernproject' 
    }
    export default config
   
   