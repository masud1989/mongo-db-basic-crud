const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
// use middleware 
app.use(cors());
app.use(express.json());


/*
    UserName: mongodbuser1
    Password: HnzOyRpiXdSOdxjM
*/
const uri = "mongodb+srv://mongodbuser1:HnzOyRpiXdSOdxjM@cluster0.ergjf.mongodb.net/foodExpress?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");
        const user = {name:'Nodi', email:'nodi@gmail.com'};
        const result = await userCollection.insertOne(user);
        console.log(`User Inserted with ID: ${result.insertedId}`);
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Running My Node CRUD Server');
})

app.listen(port, () =>{
    console.log('CRUD Server is Running from port', port);
})