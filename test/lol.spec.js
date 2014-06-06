var patch = require('../lol');

describe('patch', function () {
  var redefine = patch(Object),
      object;

  beforeEach(function () {
    object = {};
  });

  it('should allow redefinition of non-configurable properties', function () {
    Object.defineProperty(object, 'y', {
      value: 5
    });
    expect(object.y).toBe(5);

    redefine(object, 'y', {
      value: 10
    });
    expect(object.y).toBe(10);
  });

  it('should preserve the behavior of Object.defineProperty', function () {
    Object.defineProperty(object, 'y', { value: 5, writable: false });
    expect(object.y).toBe(5);

    expect(function () {
      Object.defineProperty(object, 'y', { value: 10 });
    }).toThrow();
    expect(object.y).toBe(5);

    object.y = 10;
    expect(object.y).toBe(5);
  });

});
