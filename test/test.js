const assert = require('assert');
const t = require('apostrophe/test-lib/test');

process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_smoke';

describe('Apostrophe - Stripe Examples Integration Tests', function () {
  let apos;

  this.timeout(t.timeout);

  after(async function () {
    await t.destroy(apos);
  });

  before(async function () {
    apos = await t.create({
      baseUrl: 'http://localhost:7770',
      modules: {
        'stripe-examples': {},
        'stripe-examples/example-alpine-js-page': {},
        'stripe-examples/example-htmx-vanilla-js-page': {}
      }
    });
  });

  it('should properly instantiate the examples modules', function () {
    assert(apos.modules['stripe-examples'], 'Stripe Examples module should be instantiated');
    assert(apos.stripeExamples, 'Stripe Examples module alias should be available');
  });

  it('should properly instantiate both example page types', function () {
    assert(apos.modules['stripe-examples/example-alpine-js-page'], 'Alpine.js example page type should be instantiated');
    assert(apos.modules['stripe-examples/example-htmx-vanilla-js-page'], 'HTMX + Vanilla JS example page type should be instantiated');
  });

  it('should expose the publishable key from the environment via a template helper', function () {
    const helper = apos.template.templateApos.stripeExamples.stripePublishableKey;
    assert.strictEqual(typeof helper, 'function', 'stripePublishableKey helper should be registered');
    assert.strictEqual(helper(), 'pk_test_smoke', 'Helper should return the configured publishable key');
  });
});
