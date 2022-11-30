const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("Le bot va se lancer")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Serveur prêt.")
  })
}

module.exports = keepAlive
// N'oubliez pas de copier le lien du site et faire un nouveau moniteur avec Uptime Robot !
