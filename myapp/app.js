const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log('Bonbon')
  console.log('Biopicccccccc')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// respond withd" when a GET request is made to the homepage
app.get('/students', function(req, res) {
  res.send([{ name: "Eric Burel", school: "EPF" }, { name: "Harry Potter", school: "Poudlard"}]);
});




