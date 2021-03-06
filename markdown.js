module.exports = function(dom) {

  var xmldom = new require('xmldom');
  var sanitizehtml = require('sanitize-html'); 
  var XMLSerializer = new xmldom.XMLSerializer();

  return read(dom);

  function read(dom) {
    var markdown = '';

    for(var i = 0; i < dom.childNodes.length; i++) {
      var childNode = dom.childNodes[i];

      var tag = childNode.tagName;
      
      switch(tag) {
        case 'p':
          markdown += paragraph(childNode);
          break;
        case 'h2':
          markdown += htag(childNode, 2);
          break;
        case 'ul':
          markdown += ul(childNode);
          break;
        case 'hr':
          markdown += hr();
          break;
        case 'a':
          markdown += a(childNode);
          break;
        case 'span':
          markdown += span(childNode);
          break;
        case 'img':
          markdown += img(childNode);
          break;
        case 'div':
          markdown += div(childNode);
          break;
        case 'figure':
          markdown += read(childNode);
          break;
        case 'strong':
          markdown += strong(childNode);
          break;
        case 'table':
          markdown += table(childNode);
          break;
        case 'tbody':
          markdown += read(childNode);
          break;
        case 'tr':
          markdown += read(childNode);
          break;
        case 'td':
          markdown += read(childNode);
          break;
        case undefined:
          if(childNode.constructor.name === 'Text') {
            markdown += childNode.data.replace(/^\n*/, '').replace(/\n*$/, '').replace(/^ \s*/, ' ').replace(/ \s*$/, ' ');
          }
          break;
      }
    }

    return markdown;
  }

  function paragraph(p) {
    return read(p) + '\n\n';
  }

  function htag(h, num) {
    var ret = '';
    for(var i = 0; i < num; i++) {
      ret += '#';
    }

    ret += ' ' + textVal(h) + '\n\n';

    return ret;
  }

  function ul(ul) {
    var ret = '';
    for(var i = 0; i < ul.childNodes.length; i++) {
      var childNode = ul.childNodes[i];
      if(childNode.tagName === 'li') {
        ret += '* ' + read(childNode) + '\n';
      }
    }

    return ret + '\n';
  }

  function hr() {
    return '* * *\n\n';
  }

  function a(dom) {
    var href = dom.getAttribute('href');
    var content = read(dom);

    return '[' + content + '](' + href + ')';
  }

  function strong(dom) {
    var content = read(dom);
    if(content) {
      return '**' + content + '**';
    }

    return '';
  }

  function span(dom) {
    if(dom.getAttribute('class').indexOf('off-screen') === -1) {
      return read(dom);
    }

    return '';
  }

  function img(dom) {
    var alt = dom.getAttribute('alt') || dom.getAttribute('data-image-alt');
    var src = 'http://www.aljazeera.com' + (dom.getAttribute('src') || dom.getAttribute('data-image-url'));
    
    return '![' + alt + '](' + src + ')\n\n';
  }

  function div(dom) {
    return read(dom);
  }

  function table(dom) {
    if(dom.getAttribute('class').indexOf('in-article-item') === -1) {
      return read(dom);
    }
  }

  function textVal(dom) {
    return sanitizehtml(XMLSerializer.serializeToString(dom), {
      allowedTags: [],
      allowedAttributes: {}
    }).replace(/^\s*/, '').replace(/\s*$/, '');

  }
}