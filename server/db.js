"use ustrict"
let mongoose = require('mongoose')

let mongoDB = "mongodb+srv://IsaacNoriega:IsaacNoriega@cluster0.ualxzre.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoDB);
let db = mongoose.connection;

const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    year: Number,
    genre: [String],
    img: String,
    video: String
});

const userSchema = new mongoose.Schema({
    _uid: String,
    _nombre: String,
    _apellidos: String,
    _email: String,
    _password: String,
    _fecha: String,
    _sexo: String,
    _imagen: String,
    profiles: {
        type: Map,
        of: {
            _imagen: String,
            _myList: [movieSchema],
            _watching: [{
                media: movieSchema,
                progress: Number
            }]
        }
    }
});

let User = mongoose.model('user',userSchema);

let newUser = { "_uid":"2354947071",
"_nombre":"Juan",
"_apellidos":"Perez",
"_email":"juan.perez@iteso.mx",
"_password":"ImpossibleToHack",
"_fecha":"1980-10-10",
"_sexo":"H",
"_imagen":"https://randomuser.me/api/portraits/men/71.jpg",
"profiles":{
    "user1":{
        "_imagen":"https://randomuser.me/api/portraits/men/71.jpg",
        "_myList":[
                {
                    "title":"La La Land",
                    "director":"Damien Chazelle",
                    "year":2016,
                    "genre":["Musical","Drama","Romance"],
                    "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                    "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                }
            ],
        "_watching":[
            {
                "media":
                    {
                        "title":"La La Land",
                        "director":"Damien Chazelle",
                        "year":2016,
                        "genre":["Musical","Drama","Romance"],
                        "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                        "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                    }
                    ,"progress":0.770254
            }
        ]
    },
    "user2":{
        "_imagen":"https://randomuser.me/api/portraits/men/87.jpg",
        "_myList":[
                {
                    "title":"La La Land",
                    "director":"Damien Chazelle",
                    "year":2016,
                    "genre":["Musical","Drama","Romance"],
                    "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                    "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                }
            ],
            "_watching":[
                {
                    "media":
                        {
                            "title":"La La Land",
                            "director":"Damien Chazelle",
                            "year":2016,
                            "genre":["Musical","Drama","Romance"],
                            "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                            "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                        }
                        ,"progress":0.770254
                }
            ]
    },
    "user3":{
        "_imagen":"https://randomuser.me/api/portraits/men/87.jpg",
        "_myList":[
                {
                    "title":"La La Land",
                    "director":"Damien Chazelle",
                    "year":2016,
                    "genre":["Musical","Drama","Romance"],
                    "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                    "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                }
            ],
            "_watching":[
                {
                    "media":
                        {
                            "title":"La La Land",
                            "director":"Damien Chazelle",
                            "year":2016,
                            "genre":["Musical","Drama","Romance"],
                            "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                            "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                        }
                        ,"progress":0.770254
                }
            ]
    },
    "ScaryBunny":{
        "_imagen":"https://pbs.twimg.com/profile_images/3420483513/818e56bf687d3fb90f73adbf30b8de4b_400x400.jpeg",

            "_myList":[
                {"title":"The Last of Us",
                "director":"Kantemir Balagov",
                "year":2023,
                "genre":["Action","Adventure","Drama"],
                "img":"https://th.bing.com/th/id/R.08a8959cb71456abda26ff89a2812f26?rik=lDHKLqMy%2fMWY1Q&pid=ImgRaw&r=0",
                "video":"https://drive.google.com/uc?export=download&id=1yLUNcpeKVeVTMhvH67435GTylKRp1odC"
                }
            ],
            "_watching":[
                {
                    "media":
                        {
                            "title":"La La Land",
                            "director":"Damien Chazelle",
                            "year":2016,
                            "genre":["Musical","Drama","Romance"],
                            "img":"https://th.bing.com/th/id/R.61e50b048f87ef13d0718c50e5637e63?rik=B5plTZNxOYCPiA&pid=ImgRaw&r=0",
                            "video":"https://drive.google.com/uc?export=download&id=1HJTVqUPAXImXJLvNNMDWPbRm-YFZxp3d"
                        }
                        ,"progress":0.770254
                }
            ]
    }
}
}

let user = User(newUser);
user.save().then((doc)=>console.log(doc));