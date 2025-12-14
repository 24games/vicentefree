// Servidor HTTP simples para servir a landing page
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './public/landing-page.html';
  } else if (filePath.startsWith('./public/')) {
    // Manter como está
  } else if (filePath === './landing-page.html') {
    filePath = './public/landing-page.html';
  } else if (!filePath.startsWith('./public/') && !filePath.startsWith('./api/')) {
    filePath = './public' + filePath;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Se não encontrar, tentar landing-page.html
        if (req.url === '/' || req.url === '/index.html') {
          filePath = './public/landing-page.html';
          fs.readFile(filePath, (error2, content2) => {
            if (error2) {
              res.writeHead(404);
              res.end('File not found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html' });
              res.end(content2, 'utf-8');
            }
          });
        } else {
          res.writeHead(404);
          res.end('File not found: ' + filePath);
        }
      } else {
        res.writeHead(500);
        res.end('Server error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('========================================');
  console.log('✅ SERVIDOR RODANDO!');
  console.log('========================================');
  console.log('');
  console.log('🌐 ACESSE NO NAVEGADOR:');
  console.log('');
  console.log('   http://localhost:5173/landing-page.html');
  console.log('');
  console.log('   OU');
  console.log('');
  console.log('   http://localhost:5173/');
  console.log('');
  console.log('========================================');
  console.log('');
  
  // Abrir navegador automaticamente após 1 segundo
  setTimeout(() => {
    const { exec } = require('child_process');
    const url = 'http://localhost:5173/landing-page.html';
    const command = process.platform === 'win32' 
      ? `start ${url}` 
      : process.platform === 'darwin' 
        ? `open ${url}` 
        : `xdg-open ${url}`;
    exec(command);
  }, 1000);
});



