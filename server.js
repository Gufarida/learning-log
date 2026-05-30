const http = require('http');
const  { SecretManagerServiceClient } =  require ('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

const server = http.createServer(async (req, res) => {
 if (req.url === '/secret' ) { 
  try{ 
   const [version] = await client.accessSecretVersion({
    name: 'projects/strange-aria-402811/secrets/my-api-key/versions/latest',
});
  const secret = version.payload.data.toString();
  res.writeHead(200, { 'Content-Type': 'text/plain'});
  res.end(`Secret: ${secret}\n` );
} catch (err) {
 res.writeHead(500);
 res.end('Error reading secret\n');
}
} else {
res.writeHead(200, {'Content-Type': 'text/plain' })
res.end('Hello World\n');
}
});

server.listen(8080, () => {
console.log('server running at http://localhost:8080');
});
