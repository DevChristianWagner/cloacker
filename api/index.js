const express = require('express');
const request = require('request');

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  const userIP = req.ip;

  // Use o serviço ipinfo.io para obter informações de localização com base no IP
  request(`https://ipinfo.io/${userIP}`, { json: true }, (err, response, body) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao obter informações de localização.');
    }

    const country = body.country;

    // Redireciona com base no país
    if (country === 'US') {
      res.redirect('https://www.youtube.com');
    } else if (country === 'BR') {
      res.redirect('https://x.ai');
    } else {
      res.send('Bem-vindo! Seu país não foi configurado para redirecionamento.');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});