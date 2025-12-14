// Servidor HTTP ultra-simples
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

http.createServer((req, res) => {
  console.log('Requisição:', req.url);
  
  let file = '';
  
  if (req.url === '/' || req.url === '/landing-page.html') {
    file = 'public/landing-page.html';
  } else if (req.url === '/tracking.js') {
    file = 'public/tracking.js';
  } else {
    file = 'public' + req.url;
  }
  
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + file);
      return;
    }
    
    const ext = path.extname(file);
    const contentType = ext === '.js' ? 'text/javascript' : 'text/html';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('\n=========================================');
  console.log('✅ SERVIDOR RODANDO COM SUCESSO!');
  console.log('=========================================\n');
  console.log('🌐 Acesse no navegador:\n');
  console.log('   http://localhost:' + PORT + '/landing-page.html\n');
  console.log('=========================================\n');
  
  // Abrir navegador
  setTimeout(() => {
    require('child_process').exec('start http://localhost:' + PORT + '/landing-page.html');
  }, 1000);
});



