const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {Tatuador} = require('./tatuadores.js')

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());



app.get('/',(request, response)=>{
    response.send({message: 'Bienvenido a mi API'});
})

app.post('/create/tatuador', (request, response )=>{
    const {nombre, location, style, age, profilepic} = request.body;

    const newTatuador = Tatuador({
        nombre,
        location,
        style,
        age,
        profilepic
    });
    newTatuador.save((err, tatuador)=>{
        !err
        ? response.status(201).send(tatuador)
        : response.status(400).send(err)
    });
});
app.get('/all/tatuadores',(req,res)=>{
    Tatuador.find().exec()
    .then(tatuadores => res.send(tatuadores))
    .catch(err => res.status(409).send(err))
});

app.get('/tatuador/:id',(req,res)=>{
    const {id} = req.params;

    Tatuador.findById(id).exec()
    .then(tatuador => tatuador ? res.status(200).send(tatuador): res.status(404) .send({message: "No se encontró al tatuador"}))
    .catch(err => res.status(409).send(err))

});

app.listen(PORT,()=>{
    console.log(`Server inicializado en el puerto ${PORT}`);
});