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

  convert: function( el ) {
    if( typeof el.textContent != 'undefined') {
      el.textContent = ArabicStyle.convertText( el.textContent );
    } else {
      el.innerText = ArabicStyle.convertText( el.innerText );
    }
  }
};