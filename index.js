// const Person=require('./person')
// // import Person from './person'
// // console.log(person);
// person1=new Person('john doe',30);
// person1.greetings();

// const Logger=require('./logger');
// const logger=new Logger();
// logger.on('message',(data)=>{
//     console.log('Called Lister :',data);
// })
// logger.log("Hello world")
// logger.log("love node")

//load http etc without express

const http=require('http');
const path=require('path');
const fs=require('fs');

const server=http.createServer((req,res)=>{

    // if(req.url==='/')
    // {
    //     fs.readFile(path.join(__dirname,'/public','index.html'),(err,content)=>{
    //         if(err) throw err;
    //         res.writeHead(200,{'content-Type':"text/html"});
    //         res.end(content);
    //     });
    // }
    // if(req.url==='/api/users')
    // {
    //     const users=[
    //         {name:"alice",age:35},
    //         {name:"bob",age:45},
    //         {name:"cate",age:35},
    //     ]
    //     res.writeHead(200,{'content':'application/json'});
    //     res.end(JSON.stringify(users));
    // }
    // console.log(req.url);

    let filePath=path.join(__dirname,'public',req.url==='/'?'index.html':req.url);

    //Extension of the file
    let extname=path.extname(filePath);

    //Initial content type

    let contentType='text/html';

    //check ext and set content type
    switch(extname)
    {
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
            break;
        case '.json':
            contentType='application/json';
            break;
        case '.png':
            contentType='image/png';
            break;
        case '.jpg':
            contentType='image/jpg';
            break;
    }

    //Read file

    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code==='ENOENT')
            {
                //page not found..
                fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                    res.writeHead(200,{'Content-Type':'text/html'});
                    res.end(content,'utf-8')
                })
            }
            else{
                //some server error
                res.writeHead(500);
                res.end(`Server Error : ${err.code}`)
            }
        }
        else{
                //success
                res.writeHead(200,{'Content-Type':contentType});
                res.end(content,'utf-8');
        }
    });
    // console.log(filePath);
    // res.end();
});

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`server running on Port ${PORT}`);
})