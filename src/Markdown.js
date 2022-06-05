class Markdown {
  static parse (text) {
    const rules = [
      // [[rename|destination]]
      [/\[\[(.*?)\|(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</a>'],
      // [[rename->dest]]
      [/\[\[(.*?)->(.*?)\]\]/g, '<tw-link role="link" data-passage="$2">$1</a>'],
      // [[dest<-rename]]
      [/\[\[(.*?)<-(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$2</a>'],
      // [[destination]]
      [/\[\[(.*?)\]\]/g, '<tw-link role="link" data-passage="$1">$1</a>'],
      // ##### Heading level 5
      [/#{5}\s?([^\n]+)/g, '<h5>$1</h5>'],
      // #### Heading level 4
      [/#{4}\s?([^\n]+)/g, '<h4>$1</h4>'],
      // ### Heading level 3
      [/#{3}\s?([^\n]+)/g, '<h3>$1</h3>'],
      // ## Heading level 2
      [/#{2}\s?([^\n]+)/g, '<h2>$1</h2>'],
      // # Heading level 1
      [/#{1}\s?([^\n]+)/g, '<h1>$1</h1>'],
      // **bold text**
      [/\*\*\s?([^\n]+)\*\*/g, '<strong>$1</strong>'],
      // __bold text__
      [/__([^_]+)__/g, '<strong>$1</strong>'],
      // *italic text*
      [/\*\s?([^\n]+)\*/g, '<em>$1</em>'],
      // _italic text_
      [/_([^_`]+)_/g, '<em>$1</em>'],
      // Line Item (*/+/-)
      [/\n([\*|\-|\+])(.*)/g, '<ul><li>$2</li></ul>'], // eslint-disable-line
      // Horizontal Line
      [/(=|-){3}/g, '<hr>'],
      // Image
      [
        /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
        '<img src="$2" alt="$1" title="$3" />'
      ]
    ];

    rules.forEach(([rule, template]) => {
      text = text.replaceAll(rule, template);
    });

    return text;
  }

  static unescape (text) {
    const unescapeSequences = [
      ['&amp;', '&'],
      ['&lt;', '<'],
      ['&gt;', '>'],
      ['&quot;', '"'],
      ['&#x27;', "'"],
      ['&#x60;', '`']
    ];

    unescapeSequences.forEach(([rule, template]) => {
      text = text.replaceAll(rule, template);
    });

    return text;
  }
}

module.exports = Markdown;
