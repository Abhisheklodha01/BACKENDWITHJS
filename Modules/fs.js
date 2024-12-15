// operations : 
/* 
File Operations
fs.readFile:	Reads content from a file (async).
fs.readFileSync:	Reads content from a file (sync).
fs.writeFile:	Writes content to a file (async).
fs.writeFileSync:	Writes content to a file (sync).
fs.appendFile:	Appends content to a file (async).
fs.appendFileSync:	Appends content to a file (sync).
fs.unlink:	Deletes a file (async).
fs.unlinkSync:	Deletes a file (sync).


*/

// Writing to a file
fs.writeFile('example.txt', 'Hello, World!', (err) => {
    if (err) throw err;
    console.log('File created and written!');
});

// Reading from a file
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data); // Output: Hello, World!
});


// Directory Operations

/*
Directory Operations

fs.mkdir:	Creates a directory (async).
fs.mkdirSync:	Creates a directory (sync).
fs.readdir:	Reads the contents of a directory.
fs.rmdir:	Removes a directory (async).
fs.rmdirSync:	Removes a directory (sync).
*/

// Creating a directory
fs.mkdir('newDir', (err) => {
    if (err) throw err;
    console.log('Directory created!');
});

// Reading directory contents
fs.readdir('.', (err, files) => {
    if (err) throw err;
    console.log(files); // Outputs all files in the current directory
});

// file status
/**
fs.stat	        Retrieves file or directory information.
fs.lstat	    Similar to fs.stat but includes symlinks.
fs.statSync 	Synchronous version of fs.stat.
*/

fs.stat('example.txt', (err, stats) => {
    if (err) throw err;
    console.log(stats.isFile()); // true if it’s a file
    console.log(stats.size);     // File size in bytes
});


// fs stream

/*
fs.createReadStream  	Reads file content as a stream.
fs.createWriteStream	Writes file content as a stream.
*/

const readStream = fs.createReadStream('example.txt', 'utf8');
readStream.on('data', (chunk) => {
    console.log(chunk); // Outputs file content chunk by chunk
});

const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Writing to a stream!');
writeStream.end();


// sync vs async operations
// Async
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// Sync
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);
