const myURL = new URL('https://example.com:8080/path/name?query=value#fragment');

// Access URL components
console.log(myURL.href);        // Full URL: 'https://example.com:8080/path/name?query=value#fragment'
console.log(myURL.protocol);    // Protocol: 'https:'
console.log(myURL.host);        // Host: 'example.com:8080'
console.log(myURL.hostname);    // Hostname: 'example.com'
console.log(myURL.port);        // Port: '8080'
console.log(myURL.pathname);    // Pathname: '/path/name'
console.log(myURL.search);      // Query string: '?query=value'
console.log(myURL.hash);        // Fragment: '#fragment'
console.log(myURL.searchParams); // URLSearchParams object
console.log(myURL.searchParams.get('query')); // 'value'