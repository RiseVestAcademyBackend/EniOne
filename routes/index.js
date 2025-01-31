var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EniOne' });
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
module.exports = router;
