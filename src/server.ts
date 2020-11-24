import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Initial Commit' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
