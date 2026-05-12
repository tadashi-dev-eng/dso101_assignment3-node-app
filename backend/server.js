// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { PrismaClient, Prisma } = require('@prisma/client');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const prisma = new PrismaClient();

// async function initDB() {
//   try {
//     await prisma.$connect();
//     await prisma.$executeRaw`
//       CREATE TABLE IF NOT EXISTS todos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         task TEXT NOT NULL,
//         done BOOLEAN DEFAULT false
//       )
//     `;
//     console.log('Database connected and table ready');
//   } catch (err) {
//     console.error('DB connection error:', err.message || err);
//     process.exit(1);
//   }
// }

// initDB();

// // GET - fetch all todos
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } });
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST - create a new todo
// app.post('/todos', async (req, res) => {
//   try {
//     const { task } = req.body;
//     if (!task) return res.status(400).json({ error: 'Task is required' });
//     const todo = await prisma.todo.create({ data: { task } });
//     res.json(todo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // PUT - update a todo (edit task text or mark done)
// app.put('/todos/:id', async (req, res) => {
//   try {
//     const { task, done } = req.body;
//     const id = parseInt(req.params.id, 10);
//     if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid todo id' });

//     const data = {};
//     if (task !== undefined) data.task = task;
//     if (done !== undefined) data.done = done;

//     const todo = await prisma.todo.update({
//       where: { id },
//       data,
//     });
//     res.json(todo);
//   } catch (err) {
//     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE - delete a todo
// app.delete('/todos/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id, 10);
//     if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid todo id' });

//     await prisma.todo.delete({ where: { id } });
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(process.env.PORT || 5000, () => console.log('Backend running'));

// module.exports = app;

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3')
require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db'
const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: DATABASE_URL }),
})
const app = express()

app.use(cors())
app.use(express.json())

// Root route for service status
app.get('/', (req, res) => {
  res.send('Backend is running.')
})

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// GET all todos
app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany()
  res.json(todos)
})

// POST create todo
app.post('/todos', async (req, res) => {
  const { task } = req.body
  if (!task) return res.status(400).json({ error: 'Task is required' })
  const todo = await prisma.todo.create({
    data: { task }
  })
  res.json(todo)
})

// PUT update todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { task, done } = req.body
  const data = {}
  if (task !== undefined) data.task = task
  if (done !== undefined) data.done = done
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data
  })
  res.json(todo)
})

// DELETE todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params
  await prisma.todo.delete({ where: { id: Number(id) } })
  res.json({ message: 'Deleted' })
})

if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

module.exports = app