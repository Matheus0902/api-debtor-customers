require("express-async-errors")
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations")

const cors = require("cors")
const express = require("express")
const AppError = require("./utils/AppError")
const  routes = require("./routes")

migrationsRun()

const app = express()

// Configuração CORS para permitir múltiplas origens
const allowedOrigins = [
  'https://debtor-customer.netlify.app', 
  'http://localhost:5173',               // Front-end local (para desenvolvimento)
];

const corsOptions = {
  origin: (origin, callback) => {
    // Se não houver origem (requests do Postman ou servidores), libera
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions)) 

app.use(express.json())

app.use(routes)


app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
}) 

const PORT = process.env.PORT || 3333

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))