const http = require("http");
const fs = require("fs");
http.createServer(function (request, response) {
    console.log(`Запрошенный адрес: ${request.url}`);
    const filePath = request.url.substr(1); // получаем путь 

    if (request.url == "/") {
        response.statusCode = 302;
        response.setHeader("Location", "/index.html");
        response.end();
    }
    else{
        fs.readFile(filePath, function (error, data) {        
            if (error) {
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else {
                data = data.toString();
                data = data
                    .replace("{header}", fs.readFileSync("header.html", "utf8"))
                    .replace("{menu}", fs.readFileSync("menu.html", "utf8"));
                response.end(data);
            }
        });
    }
}).listen(3000, function () {
    console.log("Server started at 3000");
});
