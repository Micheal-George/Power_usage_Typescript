import express from "express";
import Routes from "./routes/route";
import connection from "./db/config";
import { json, urlencoded } from "body-parser";
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('../swagger.json');
const app = express();

app.use(json());

app.use(urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.status(200).send("Hello world");
});

app.use("/power", Routes);
var options = {
  swaggerOptions: {
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
  }
};
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
  }
);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });
app.listen(3001, () => {
  console.log("Server started on port 3000");
});

export default app