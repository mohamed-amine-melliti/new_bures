const express = require('express');
const reservationRouter = require('./api/reservation/reservation');

const app = express();
app.use(express.json());

// Mount the reservation router
app.use('/api/reservation', reservationRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});