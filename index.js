var createPage = (function () {

  var features = {
    'Screen/Device dimensions': {
      'width': true,
      'height': true,
      'aspect-ratio': true,
      'orientation': ['landscape', 'portrait']
    },
    'Display Quality': {
      'resolution': true,
      'scan': ['interlace', 'progressive'],
      'grid': true,
      'update-frequency': ['none', 'slow', 'normal'],
      'overflow-block': ['none', 'scroll', 'optional-paged', 'paged'],
      'overflow-inline': ['none', 'scroll']
    },
    'Color': {
      'color': true,
      'inverted-colors': ['none', 'inverted']
    },
    'Interaction': {
      'pointer': ['none', 'coarse', 'fine'],
      'hover': ['none', 'on-demand', 'hover'],
      'any-pointer': ['none', 'coarse', 'fine'],
      'any-hover': ['none', 'on-demand', 'hover']
    },
    'Environment': {
      'light-level': ['dim', 'normal', 'washed']
    },
    'Scripting': {
      'script': ['none', 'initial-only', 'enabled']
    }
  };

  var styles = 'color: white; background: yellowgreen;';

  function addItem (className, query) {
    var item = '<li class="' + className + '">';
    item += '(<code>' + query + '</code>)';
    item += '<style>@media (' + query + ') { .' + className + ' { ' + styles + ' } }</style>';
    item += '</li>';
    return item;
  }

  var DOM = '';

  for (var t in features) {
    var title = '<h2>' + t + '</h2>';
    var list = '<ul>';
    for (var f in features[t]) {
      if (features[t][f] === true) {
        list += addItem(f, f);
      } else {
        for (var i = 0; i < features[t][f].length; i++) {
          list += addItem(f + '--' + features[t][f][i], f + ': ' + features[t][f][i]);
        }
      }
    }
    list += '</ul>';
    DOM += title + list;
  }

  // custom
  DOM += '<h2>Custom</h2>';
  DOM += '<ul>';
  DOM += '<li class="custom"><code>@custom-media --custom (min-width: 1px)</code></li>';
  DOM += '<style>@custom-media --custom (min-width: 1px); @media (--custom) { .custom { ' + styles +' } }</style>';
  DOM += '</ul>';

  // range context
  DOM += '<h2>Range context</h2>';
  DOM += '<ul>';
  DOM += '<li class="range"><code>@media (width >= 1px)</code></li>';
  DOM += '<style>@media (width >= 1px) { .range { ' + styles + ' } }</style>';
  DOM += '</ul>';

  var src = require('fs').readFileSync('src.html', 'utf-8');
  return src.replace('{{features}}', DOM);

})();

require('fs').writeFileSync('index.html', createPage);