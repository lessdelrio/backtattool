const mongoose = require('mongoose');

const URL_MONGO = 'mongodb+srv://lessdelrio:ksOP5S1j@cluster0-wwy4i.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(URL_MONGO, {useNewUrlParser: true,useUnifiedTopology: true}, (err)=>{
    if(!err) {console.log('Conexión exitosa con MongoDB')}
    else{
        console.log(err);
    }
});

const Schema = mongoose.Schema;

const tatuadorSchema = new Schema({
    nombre:{
        type:String, 
        unique:true
    },
    location:String,
    style: String,
    age:Number,
    profilepic:String
},{timestamps: true});

const Tatuador = mongoose.model('Tatuador', tatuadorSchema);

module.exports = {
    Tatuador
}