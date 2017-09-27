const server = require('express');
const app = server();
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on PORT: ${port}`));

app.get('/', (req, res) => {
  const fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });
});

app.get('/:datestring', (req, res) => {
  let myDate;
  if (/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X"); 
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }

});
