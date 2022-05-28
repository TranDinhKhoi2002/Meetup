import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://trandinhkhoi102:ESB4gvTIeDtdluW6@cluster0.9srxm.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  return client;
}
