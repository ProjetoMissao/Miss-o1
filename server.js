const WebSocket = require('ws');
const port = 3000;
const server = new WebSocket.Server({ port });

// Função para verificar se o texto é JSON válido
function isJsonString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

server.on('connection', ws => {
  console.log('Cliente conectado');

  ws.on('message', message => {
    console.log(`Comando recebido: ${message}`);

    if (message === 'getLocation') {
      // Se o comando é 'getLocation', responde com 'captureLocation'
      console.log("Enviando 'captureLocation' para o cliente");
      ws.send('captureLocation');
    } else if (isJsonString(message)) {
      // Apenas processa como JSON se for uma string JSON válida
      const locationData = JSON.parse(message);
      console.log(`Localização recebida: Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}`);
    } else {
      // Ignora qualquer mensagem que não seja JSON válido
      console.log("Mensagem recebida não é JSON e foi ignorada.");
    }
  });
});

console.log(`Servidor WebSocket em execução na porta ${port}`);

