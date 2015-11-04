var AlJazeeraReader = require('./index');
var toMarkdown = require('./markdown');
var reader = new AlJazeeraReader();

var sampleDom = '<p>test text node <a href="http://google.com"><p>this whole 2 par is link</p><p>im serious</p></a></p>';

var xmldom = new require('xmldom');
DOMParser = new xmldom.DOMParser({
   errorHandler: {
      warning: function() {/* Ignore */},
      error: function() {/* Ignore */}
   }
});
var dom = DOMParser.parseFromString(sampleDom);

reader.read('http://www.aljazeera.com/news/2015/11/russian-plane-black-box-recorded-unusual-sounds-151103233740267.html').then(function(article) {
  
});