import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://Tathev:Aa123456@cluster0.fvugydi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


