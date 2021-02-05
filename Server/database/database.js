const mdb = require("mongoose");

mdb
  .connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected...");
  })
  .catch((error) => {
    console.log("error", error);
  });
