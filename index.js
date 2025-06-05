var http = require('http');
var fs = require('fs');
var url = require('url');

// An array containing the names of all html pages
const pages = ['index', 'about', 'contact-me'];

function getFilePath(pathname) {
    // If pathname is empty, return index.html
    if (pathname === '') return 'index.html';

    // Look for the pathname in the pages array and return if found
    for(let i = 0; i < pages.length; i++) {
        if (pathname === pages[i]){
            return pages[i] + '.html';
        }
    }
    // Return the error page if not found
    return '404.html';
}

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    let filepath = getFilePath(q.pathname.replace(/^\/|\/$/g, '').toLowerCase());

    fs.readFile(filepath, function(err, data) {
        if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        return res.end('Server Error');
        }

        res.writeHead(filepath === '404.html' ? 404 : 200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);