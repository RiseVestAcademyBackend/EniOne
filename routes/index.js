var express = require('express');
var router = express.Router();

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
