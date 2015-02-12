/**
 * Copyright (c) 2015 Josh England
 * Licensed under the MIT license.
 *
 * @version 1.00
 *
 * @type {{convertText: Function, fixElement: Function, convert: Function}}
 */

var ArabicStyle = {
  convertText: function( val ) {
    var isArabic = function( char ) {
      var arabicRanges = [
        [ 0x0600, 0x06FF ], // Main characters
        [ 0x0750, 0x076D ], // Supplemental
        [ 0xFB50, 0xFBB1 ], // Presentation Forms A - 1
        [ 0xFBD3, 0xFD3F ], // Presentation Forms A - 2
        [ 0xFD50, 0xFDC7 ], // Presentation Forms A - 3
        [ 0xFDF0, 0xFDFC ], // Presentation Forms A - 4
        [ 0xFEF0, 0xFDFC ]  // Presentation Forms B
      ];

      for( var c in arabicRanges ) {
        if( char >= arabicRanges[c][0] && char <= arabicRanges[c][1] ) {
          return true;
        }
      }

      return false;
    };

    var r = [], prevArabic = false;
    for( var a = val.split(' '), i = 0; i < a.length; i++ ) {
      var br = [], hasArabic = false;
      for( var b = a[i].split(''), j = 0; j < b.length; j++ ) {
        if( isArabic( b[ j ].charCodeAt( 0 ) ) ) {
          br.unshift( b[j] );
          hasArabic = true;
        } else {
          br.push( b[j] );
        }
      }
      if( prevArabic && hasArabic ) {
        r.splice( r.length - 1, 0, br.join( '' ) );
      } else {
        r.push( br.join( '' ) );
      }
      prevArabic = hasArabic;
    }

    return r.join( ' ' );
  },

  fixElement: function( el ) {
    if( typeof el.textContent != 'undefined') {
      if( typeof el.originalText == 'undefined') {
        el.originalText = el.textContent;
      }
      el.textContent = ArabicStyle.convertText( el.originalText );
    } else {
      if( typeof el.originalText == 'undefined') {
        el.originalText = el.innerText;
      }
      el.innerText = ArabicStyle.convertText( el.originalText );
    }
  },

  convert: function( el, options ) {
    var node, type, next;
    for( node = el.firstChild; node; node = next ) {
      type = node.nodeType;
      next = node.nextSibling;
      if( type == 3 ) {
        ArabicStyle.fixElement( node );
      }
    }
  }
};