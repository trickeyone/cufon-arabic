var ArabicStyle = {
  convertText: function( val ) {
    var isArabic = function( char ) {
      //              I       E       M       B
      //var r = {
      //  0x0623: [ 0xFE83, 0xFE84 ],
      //  0x0628: [ 0xFE8F, 0xFE90, 0xFE92, 0xFE91 ],
      //  0x062A: [ 0xFE95, 0xFE96, 0xFE98, 0xFE97 ],
      //  0x062B: [ 0xFE99, 0xFE9A, 0xFE9C, 0xFE9B ],
      //  0x062C: [ 0xFE9D, 0xFE9E, 0xFEA0, 0xFE9F ],
      //  0x062D: [ 0xFEA1, 0xFEA2, 0xFEA4, 0xFE93 ],
      //  0x062E: [ 0xFEA5, 0xFEA6, 0xFEA8, 0xFE97 ],
      //  0x062F: [ 0xFEA9, 0xFEAA ],
      //  0x0630: [ 0xFEAB, 0xFEAC ],
      //  0x0631: [ 0xFEAD, 0xFEAE ],
      //  0x0632: [ 0xFEAF, 0xFEB0 ],
      //  0x0633: [ 0xFEB1, 0xFEB2, 0xFEB4, 0xFEB3 ],
      //  0x0634: [ 0xFEB5, 0xFEB6, 0xFEB8, 0xFEB7 ],
      //  0x0635: [ 0xFEB9, 0xFEBA, 0xFEBC, 0xFEBB ],
      //  0x0636: [ 0xFEBD, 0xFEBE, 0xFEC0, 0xFEBF ],
      //};


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
      for( var b = a[i], j = 0; j < b.length; j++ ) {
        if( isArabic( b[ j ].charCodeAt( 0 ) ) ) {
          br.unshift( b[j] );
          hasArabic = true;
        } else {
          br.push( b[j] );
        }
      }
      if( prevArabic && hasArabic !== false ) {
        r.splice( hasArabic, 0, br.join( '' ) );
        //r.unshift( br.join('') );
      } else {
        r.push( br.join( '' ) );
      }
      prevArabic = hasArabic ? r.length - 1 : false;
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