module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET, // frase secreta
    expiresIn: "1d" // tempo de expiração
  }
}