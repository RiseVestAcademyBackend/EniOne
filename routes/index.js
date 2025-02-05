var express = require('express');
var router = express.Router();


const data = [
  {id : 1, title :  "Iron Man", year :  '2008'},
  {id : 2, title :  "Thor", year :  '2010'},
  {id : 3, title :  "Captain American", year :  '2018'},
  {id : 4, title :  "King of Boys", year :  '2028'},
]

router.get("/movies",  (req,res,next) => {
  res.status(200).json(data);
})

router.post("/auth/signin", (req,res, next) => {
  res.redirect("/namedamola")
  
  res.send({
    "name" : "wemi",
    "bank" : "zenith",
    "number" : 78
  })
})  
router.get("/auth/signup", (req,res, next) => {
  res.json({
    "name" : "lekan",
    "bank" : "zenith",
    "number" : 78
  })
})  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EniOne', links: ["/namerufai", "/namefestus",
     "/nameanthony", "/namedamola", "/namefemi", "/nameebuka", "/namewemi", "nameEkene", "/nameTemitayo", "/namezara"
    
  ] });
});

router.get('/namerufai', function(req, res, next) {
  res.render('viewrufai', { name: 'Rufai', quality: "dark"});
});

router.get('/namefestus', function(req, res, next) {
  console.log(req)
  res.render('viewfestus', { name: 'Festus', quality: "fair", height: "7'", work: 'Backend Engineer' });
});

router.get('/nameanthony', function(req, res, next) {
  res.render('viewanthony', { name: 'Anthony', nickname: "T ☕"})
})

router.get('/namedamola', function(req, res, next) {
  res.render('viewdamola', { name: 'Adedamola', nickname: "Toyibah", qualities: ['Smart', 'Hijabi', 'Computer Science']})
})

router.get('/namefemi', function(req, res, next) {
  res.render('viewfemi', { name: 'Oluwafemi', nickname: "femi", quality: 'Chill guy'})
})

router.get('/nameebuka', function(req, res, next) {
  
  res.render('viewebuka', { name: 'Ebuka', qualities: ['Dark', 'Backend engineer', 'Art lover', 'Anime'] });
});

router.get('/namewemi', function(req, res, next) {
  res.render('viewwemi', { name: 'Wemi', quality: "charismatic", weight: "70kg", role: 'anywork' });
});

router.get('/nameEkene', function(req, res, next) {
  res.render('viewEkene', { name: 'Ekene', nickname: "Shizuo", likes: ['Anime', 'Scrabble', 'Games']});
});

router.get('/nameTemitayo', function(req, res, next) {
  res.render('viewtemitayo', { name: "Temitayo", quality: "Tall", study: "Electrical/Electronics Engineering", likes: "Minecraft" });
});

router.get('/nameolalekan', function(req, res, next) {
  res.render('viewolalekan', { name: "Olalekan", quality: "Soft", nickname: "Olexy", likes: "Food" });
});

router.get('/namezara', function(req, res, next) {
  res.render('viewzara', { name: "CHIZARAM", mode: "HAPPY", color: "fair", height: "100cm" });
});

module.exports = router;
