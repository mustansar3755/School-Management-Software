// Sab se pehle .env load karo (ye import sab se upar rehna chahiye)
import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// Pehle DB connect, phir server start
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server chal raha hai: http://localhost:${PORT}`);
  });
};

startServer();