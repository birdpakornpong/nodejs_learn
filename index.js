const express = require('express');  //เรียกใช้ express

const app = express(); //ประกาศตัวแปร app = express
app.use(express.json()); //app เรียก express.json


app.get('/', (req, res) => {
    res.send(`<h1>Hello bird นี้คือ port ${port}</h1>`)
});

//ประกาศตัวแปร เป็น opject
var movies = [
    {
        id: 0,
        name: "The Flash",
        type: "series",
        isPublished: false
    },
    {
        id: 1,
        name: "Arrow",
        type: "series",
        isPublished: true
    },
    {
        id: 2,
        name: "Harry Potter",
        type: "movie",
        isPublished: false
    }
];
//ส่งข้อมูลแบบ json
app.get('/api/movies', (req, res) => {
    res.send(movies);
});

//ส่งข้อมูลแบบ post
app.post('/api/movies', (req, res) => {
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        type: req.body.typeMovie,
        isPublished: req.body.isPublished
    };
    movies.push(movie);
    res.send(movie);
});

//ส่งข้อมูลแบบ put
app.put('/api/movies/:id',(req, res) => {
    // ประกาศตัวแปร movie = movies ค้นหา res จาก res.id ที่เท่ากับ req.body.id
    const movie =  movies.find(m => m.id === parseInt(req.body.id));
    //ถ้าไม่มีไอดี movies
    if(!movies){
        // ส่งstatus 404 และข้อความ
        res.status(404).send('The movie with the given ID was not found ')
    }else
    {
        movie.name = req.body.name;
        movie.type = req.body.type;
        movie.isPublished = req.body.isPublished;
        res.send(movie); //ส่ง response ตัวแปร movie 
    };

res.send(movie); //ส่ง response ตัวแปร movie 
});

//delete
app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) {
        res.status(404).send('The movie with the given ID was not found ')
    }else {

        const index = movies.indexOf(movie);
        movies.splice(index, 1);
    
        res.send(movie);
    }
});

//ตั้งค่า port ประกาศตัวแปร port
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port${port}...`));