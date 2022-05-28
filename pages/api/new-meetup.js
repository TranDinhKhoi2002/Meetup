import { connectToDatabase } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    let client;

    try {
      client = await connectToDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to database failed!" });
      return;
    }

    const { title, image, address, description } = data;
    if (!title || !image || !address || !description) {
      res.status(422).json({ message: "Invalid data" });
      client.close();
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection("meetups").insertOne(data);

      console.log(result);
      res.status(201).json({ message: "Insert meet up successfully!" });
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
    }

    client.close();
  }
}

export default handler;
