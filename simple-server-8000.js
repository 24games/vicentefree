const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  let filePath = '';
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp'
  };
  
  const contentType = contentTypes[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('404 - File Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log('========================================');
  console.log(`✅ SERVIDOR RODANDO NA PORTA ${PORT}!`);
  console.log('========================================');
  console.log(`\n🌐 Acesse: http://localhost:${PORT}\n`);
  
  // Abrir navegador
  const { exec } = require('child_process');
  const url = `http://localhost:${PORT}`;
  exec(`start ${url}`);
});







