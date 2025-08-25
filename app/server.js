const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Test kasutajad (mock andmed)
const users = [
  { username: 'testuser', password: 'password123', name: 'Test Kasutaja' },
  { username: 'admin', password: 'admin123', name: 'Admin' },
  { username: 'john', password: 'john123', name: 'John Doe' }
];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Sisselogimise POST route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Kontrolli kas väljad on täidetud
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Kasutajanimi ja parool on kohustuslikud!'
    });
  }

  // Kontrolli kasutajat
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      message: 'Sisselogimine õnnestus!',
      user: { username: user.username, name: user.name }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Vale kasutajanimi või parool!'
    });
  }
});

// API endpoint kasutajate nimekirja jaoks (testimiseks)
app.get('/api/users', (req, res) => {
  res.json(users.map(u => ({ username: u.username, name: u.name })));
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Lehekülge ei leitud');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Serveri viga!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server käib pordil ${PORT}`);
  console.log(`📱 Ava brauser: http://localhost:${PORT}`);
  console.log('\n📋 Test kasutajad:');
  console.log('   Kasutajanimi: testuser, Parool: password123');
  console.log('   Kasutajanimi: admin, Parool: admin123');
  console.log('   Kasutajanimi: john, Parool: john123');
});
