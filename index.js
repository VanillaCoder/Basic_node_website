const http = require ('http');
const path = require ('path');
const fs = require ('fs');

const server = http.createServer((req, res) => {

    let contentType = 'text/html';
    switch(req.url){
        case '/':
            contentType = 'text/html';
            req.url = '/index.html'
            break;
        case '/about':
            contentType = 'text/html';
            req.url = '/about.html'
            break;
        case '/contact-me':
            contentType = 'text/html';
            req.url = '/contact-me.html'
            break;
        case '/css/style.css':
            contentType = 'text/css'
            break;
    }

    let filePath = path.join(__dirname, '/public', req.url);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT'){
                fs.readFile(path.join(__dirname, '/public/404.html'), (err, content) => {
                    res.writeHead(404, {'Content-Type': contentType})
                    res.end(content, 'utf8')
                })
            }
        } 
        else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8')
        }

     
        
    })
})








const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));