bbc-reader
----------

Scrape a AlJazeera article from aljazeera.com


## Install

```
npm install bbc-reader --save
```

## Use

```
   var AlJazeeraReader = require('aljazeerareader-reader');
   var aljazeerareader = new AlJazeeraReader();

   // Promise
   aljazeerareader.read('http://www.aljazeera.com/news/2015/11/russia-planes-safety-test-syria-151104051352338.html').then(function(article) {
      // Do Something with Article
   });

   // Callback
   aljazeerareader.read('http://www.aljazeera.com/news/2015/11/russia-planes-safety-test-syria-151104051352338.html', function(article) {
      // Do Something with Article
   });
```

## Article

```
var Article = {
   title: '',
   datetime: '',
   body: {
      clean: '',
      markdown: ''
   },
   images: [
      {
         full: ''
      }
   ],
   source: ''
};
```

**title**
The title of the Article. What appears in the h1 on the page.

**datetime**
The datetime with timezone of the last update of the article. Format: `YY-mm-dd H:i:s GMT`. The datetime will always be `GMT+0000`.

**body**
The body of the article. Comes in two formats. *clean* and *minimal*. The clean format removes all html elements and separates paragraphs by two newlines. Markdown attempts to provide a markdown version of the article.

**images**
An array of image urls found in the body. Comes in sizes `full` for each image.

**source**
The url of the aljazeera article.