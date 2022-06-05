const Passage = require('../src/Passage.js');

describe('constructor()', () => {
  it('Should contain default values when initialized with no arguments', () => {
    const p = new Passage();
    expect(p.name).toBe('Default');
  });
});

describe('render()', () => {
  beforeEach(() => {
  });

  it('Should passthrough any <script> tags', () => {
    const p = new Passage(1, 'Default', [], '<div><script>console.log("Hello world")</script></div>');
    expect(p.render()).toBe('<div><script>console.log("Hello world")</script></div>');
  });

  it('Should not trigger markdown code blocks', () => {
    const p = new Passage(1, 'Default', [], '<% if(window.setup.example) { %><div>[[Testing]]</div><% } %>');
    expect(p.render()).toBe('<div><tw-link role="link" data-passage="Testing">Testing</a></div>');
  });
});
