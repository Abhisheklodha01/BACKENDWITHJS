const https = require('https');

// one way
https.createServer((req, res) => {
    const method = req.method;

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (method === 'GET') {
        res.end('GET request received');
    } else if (method === 'POST') {
        res.end('POST request received');
    } else if (method === 'PUT') {
        res.end('PUT request received');
    } else if (method === 'DELETE') {
        res.end('DELETE request received');
    } else {
        res.end('Unsupported method');
    }
}).listen(8443, () => {
    console.log('HTTPS server running at https://localhost:8443');
});



// Create HTTPS server
const server = https.createServer((req, res) => {
    const method = req.method;  // HTTP method
    const url = req.url;        // Request URL

    // Parse request body for POST/PUT methods
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        // Handle HTTP methods
        switch (method) {
            case 'GET':
                res.end(JSON.stringify({ message: 'GET request received', url }));
                break;
            case 'POST':
                res.end(JSON.stringify({ message: 'POST request received', url, body }));
                break;
            case 'PUT':
                res.end(JSON.stringify({ message: 'PUT request received', url, body }));
                break;
            case 'DELETE':
                res.end(JSON.stringify({ message: 'DELETE request received', url }));
                break;
            default:
                res.end(JSON.stringify({ message: `Unsupported method: ${method}`, url }));
                break;
        }
    });
});

// Start server
server.listen(8443, () => {
    console.log('HTTPS server running at https://localhost:8443');
});
