import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __pathname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__pathname);

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.resolve(__dirname, "../public")))

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.use((req,res,next)=>{
  res.status(404).render("404")
})
export default app;
