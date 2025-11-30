import express, { json, Request, Response } from "express";
const app = express();
const port = 5000;

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Next Level Web Development!!");
});

app.post("/", (req: Request, res: Response) => {
  console.log("Req", req.body);

  res.status(201).json({
    success: true,
    message: "Api is running correctly",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
