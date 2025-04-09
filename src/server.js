import fs from "node:fs";
import express from "express";
import tovarsRouter from "./routes/tovarsRouter.js"
import path from "path";
import clientRoutes from "./routes/clientRoutes.js";
import employeRoutes from "./routes/employeRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import getPrice from "./routes/pricesRouter.js"
import GetRot from "./routes/actionRouter.js"
import {config} from "dotenv"
import {login} from "./controllers/loginController.js"


config();

const PORT = process.env.PORT || 4000 ;

const app = express();


app.use(express.static(path.join(process.cwd(), "public")))
app.use(express.static(path.join(process.cwd(), "src", "views")));
app.use(express.json());

// Login
app.post("/api/auth/login", login);

// Admin
app.use("/api/admin", adminRouter);

// Employes
app.use("/api/employes", employeRoutes);

// Clients
app.use("/api/clients", clientRoutes);

// Actions
app.use('/api/action', GetRot)

// Technics
app.use("/api/technics", tovarsRouter)

// Prices
app.use("/api/price", getPrice)



const rootDir = process.cwd();

app.get("*", (req, res) => {
  let fileName = req.path === "/" ? "index.html" :  `${req.path}.html`;
  let filePath = path.join(rootDir, "src", "views", fileName);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err)
      res.status(404).json({ message: "File is not found !", status: 404 });
    else res.sendFile(filePath);
  });
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Other errors", status: 404 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

