import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import $ from "jquery";

dotenv.config();
const app = express();
const port = 3000;

const grant_type = process.env.GRANT_TYPE;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const url =
  "https://outpost.mappls.com/api/security/oauth/token?grant_type=client_credentials&client_id=" +
  client_id +
  "&client_secret=" +
  client_secret;

app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/map", async (req, res) => {
  try {
    const data = {
      grant_type,
      client_id,
      client_secret,
    };
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data);
    res.render("map.ejs", { token: response.data.access_token });
    return res.json({ token: response.data.access_token });
  } catch (error) { }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
