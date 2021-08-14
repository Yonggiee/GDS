const shorten = require('src/utils/shorten');

test('Util - shorten', () => {
    const int = 1;
    const shortened = 'littleshorty.link/w';

    expect(shorten(int)).toBe(shortened);
});
