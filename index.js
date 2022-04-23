const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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

        //Showing Data ================================
        app.get('/user', async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        //Updating an User===============================
        app.get('user/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })
         //Delete an User================================
        app.delete('/user/:id', async(req,res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })

        //Add a new User===============================
        app.post('/user', async(req,res) => {
            const newUser = req.body;
            console.log('New User Adding');
            const result = await userCollection.insertOne(newUser);

            res.send(result);
        })
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