// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import { config } from 'dotenv';
// import router from './router/route.js';

// import connect from './database/conn.js';

// const app = express()

// // Configure CORS for production
// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://your-frontend-url.vercel.app', 'https://quiz-frontend-yourname.vercel.app'] 
//     : 'http://localhost:5173',
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(morgan('tiny')); /*tiny format we use */
// app.use(cors(corsOptions));
// app.use(express.json());
// config();

// const port = process.env.PORT || 5001;

// /* routes */
// app.use('/api', router) 

// app.get('/', (req, res) => {
//     try {
//         res.json("Quiz API is running")
//     } catch (error) {
//         res.json(error)
//     }
// })

// // For Vercel serverless deployment
// if (process.env.NODE_ENV === 'production') {
//   // Listen directly in development, but export for Vercel in production
//   connect().then(() => {
//     console.log(`MongoDB connected successfully!`);
//   }).catch(error => {
//     console.log("Error while connecting to MongoDB", error);
//   });
// } else {
//   // Development mode
//   connect().then(() => {
//     try {
//         app.listen(port, () => {
//             console.log(`Backend server connected on http://localhost:${port}`)
//         })
//     } catch (error) {
//         console.log("Error while connecting to server!");
//     }
//   }).catch(error => {
//     console.log("Error while connecting to MongoDB");
//   });
// }

// // Export for Vercel
// export default app;



import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import router from "./router/route.js"

import connect from "./database/conn.js"

const app = express()

const NODE_ENV = process.env.NODE_ENV || "development";
// Configure CORS for production
const corsOptions = {
  origin:
    NODE_ENV === "production"
      ? [
          "https://frontend-quiz-cqklgfrfb-hridesh-srivastavas-projects.vercel.app",
          "https://frontend-quiz-hridesh-srivastavas-projects.vercel.app",
          "https://frontend-quiz-tau.vercel.app"
        ]
      : "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(morgan("tiny")) /*tiny format we use */
app.use(cors(corsOptions))
app.use(express.json())
config()
app.options('*', cors(corsOptions));

const port = process.env.PORT || 5001

/* routes */
app.use("/api", router)

app.get("/", (req, res) => {
  try {
    res.json("Quiz API is running")
  } catch (error) {
    res.json(error)
  }
})

// For Vercel serverless deployment
if (process.env.NODE_ENV === "production") {
  // Listen directly in development, but export for Vercel in production
  connect()
    .then(() => {
      console.log(`MongoDB connected successfully!`)
    })
    .catch((error) => {
      console.log("Error while connecting to MongoDB", error)
    })
} else {
  // Development mode
  connect()
    .then(() => {
      try {
        app.listen(port, () => {
          console.log(`Backend server connected on http://localhost:${port}`)
        })
      } catch (error) {
        console.log("Error while connecting to server!")
      }
    })
    .catch((error) => {
      console.log("Error while connecting to MongoDB")
    })
}

// Export for Vercel
export default app

