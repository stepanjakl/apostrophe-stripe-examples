<div align="center">
    <h1>
        Stripe Examples For ApostropheCMS
    </h1>
    <p>
        <a aria-label="Apostrophe logo" href="https://v3.docs.apostrophecms.org">
            <img src="https://img.shields.io/badge/MADE%20FOR%20APOSTROPHECMS-000000.svg?style=for-the-badge&logo=Apostrophe&labelColor=6516DD">
        </a>
        <a aria-label="Stripe logo" href="https://stripe.com">
            <img src="https://img.shields.io/badge/STRIPE-000000.svg?style=for-the-badge&logo=Stripe&labelColor=635bFF&logoColor=FFFFFF">
        </a>
        <br>
        <a aria-label="Personal logo" href="https://stepanjakl.com">
            <img src="https://img.shields.io/badge/STEPANJAKL.COM%20-000000.svg?style=for-the-badge&labelColor=EED500&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTAgMTV2NWgyMFY3LjVIMHY1aDE1LjA1VjE1SDBaTTIwIDBIMHY1aDIwVjBaIiAvPjwvc3ZnPg==">
        </a>
        <a aria-label="License"
           href="https://github.com/apostrophecms/module-template/blob/main/LICENSE.md">
            <img alt="License"
                 src="https://img.shields.io/static/v1?style=for-the-badge&labelColor=000000&label=License&message=MIT&color=3DA639">
        </a>
    </p>
</div>

<br>

These modules add client-side integration examples for Stripe packages to page types in ApostropheCMS. [One example](https://github.com/stepanjakl/apostrophe-stripe-examples/tree/main/modules/stripe-examples/example-alpine-page) primarily uses [Alpine.js](https://alpinejs.dev/), while [the other](https://github.com/stepanjakl/apostrophe-stripe-examples/tree/main/modules/stripe-examples/example-htmx-vanilla-js-page) is mostly written in Vanilla JS with sprinkles of HTMX/hyperscript.

<br>

The Stripe-ApostropheCMS packages used in these examples are:
- [`apostrophe-stripe-checkout`](https://github.com/stepanjakl/apostrophe-stripe-checkout)
- [`apostrophe-stripe-products`](https://github.com/stepanjakl/apostrophe-stripe-products)

<br>

## Alpine.js example screenshots

<table>
  <tr>
    <td><a href="./public/images/store-alpine-1.png"><img src="./public/images/store-alpine-1.png" alt="Store Alpine UI 1"></a></td>
    <td><a href="./public/images/store-alpine-2.png"><img src="./public/images/store-alpine-2.png" alt="Store Alpine UI 2"></a></td>
    <td><a href="./public/images/store-alpine-3.png"><img src="./public/images/store-alpine-3.png" alt="Store Alpine UI 3"></a></td>
    <td><a href="./public/images/store-alpine-checkout.png"><img src="./public/images/store-alpine-checkout.png" alt="Stripe Checkout Alpine"></a></td>
  </tr>
</table>

<br>

## HTMX + Vanilla JS example screenshots

<table>
  <tr>
    <td><a href="./public/images/store-htmx-vanilla-js-1.png"><img src="./public/images/store-htmx-vanilla-js-1.png" alt="Store HTMX + Vanilla JS UI 1"></a></td>
    <td><a href="./public/images/store-htmx-vanilla-js-2.png"><img src="./public/images/store-htmx-vanilla-js-2.png" alt="Store HTMX + Vanilla JS UI 2"></a></td>
  </tr>
</table>

<br>

## Installation

Use your preferred package manager to install the following packages:

```zsh
npm install stripe-examples@npm:@stepanjakl/apostrophe-stripe-examples

npm install stripe-checkout@npm:@stepanjakl/apostrophe-stripe-checkout

npm install stripe-products@npm:@stepanjakl/apostrophe-stripe-products

npm install read-only-field@npm:@stepanjakl/apostrophe-read-only-field
```

<br>

## Usage

First, add installed modules to your configuration in the `app.js` root file:

```js
require('apostrophe')({
  shortName: 'project-name',
  modules: {
    // Custom fields
    'read-only-field': {},

    // Stripe Checkout
    'stripe-checkout': {},
    'stripe-checkout/session': {},

    // Stripe Products
    'stripe-products': {},
    'stripe-products/product': {},

    // Stripe Examples
    'stripe-examples': {},
    'stripe-examples/example-alpine-page': {},
    'stripe-examples/example-htmx-vanilla-js-page': {}
  }
});
```

<br>

Then, set global variables inside the `.env` file. It's important to set the `STRIPE_TEST_MODE` variable to anything other than `false` to enable [test mode](https://docs.stripe.com/test-mode).

```dotenv
PORT='4000'
APOS_BASE_URL='http://localhost:4000'
APOS_RELEASE_ID='a4-boilerplate'
APOS_MONGODB_URI='mongodb://localhost:27017/a4-boilerplate'

STRIPE_KEY='sk_test_xyz'
STRIPE_TEST_MODE='false'
STRIPE_DASHBOARD_BASE_URL='https://dashboard.stripe.com'
STRIPE_WEBHOOK_ENDPOINT_SECRET='whsec_xyz'
```

<br>

---

To run these examples with the fully functional [`stripe-checkout`](https://github.com/stepanjakl/apostrophe-stripe-checkout) module, you'll need to set up event forwarding using the [Stripe CLI](https://docs.stripe.com/stripe-cli). This will send all Stripe events to your local webhook endpoint for testing and/or monitoring purposes.

Here's how to do it:

1. **Set up event forwarding with the Stripe CLI:** Run the following command to listen for specific events and forward them to your local endpoint:

   ```zsh
   stripe listen --events=payment_intent.succeeded --forward-to localhost:5000/api/v1/stripe-checkout/webhook
   ```

2. **Set the webhook signing secret:** The webhook signing secret is generated and displayed in the initial output of the listen command. Use this value for the `STRIPE_WEBHOOK_ENDPOINT_SECRET` environment variable.

For more details on creating a secret Stripe API key, [read the documentation](https://docs.stripe.com/keys#create-api-secret-key).

---

<br>

Lastly, to activate the example page types, integrate them into the core module configuration located at `modules/@apostrophecms/page/index.js`:

```js
module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default'
      },
      {
        name: '@apostrophecms/home-page',
        label: 'Home'
      },
      {
        name: 'stripe-examples/example-alpine-js-page',
        label: 'Stripe - Example with Alpine.js'
      },
      {
        name: 'stripe-examples/example-htmx-vanilla-js-page',
        label: 'Stripe - Example with HTMX + Vanilla JS'
      }
    ]
  }
};
```

<br>

## Separation of concerns

The decision to keep the `products` and `checkout` packages separate aligns with the principle of separation of concerns. Stripe's API structure exemplifies this approach, offering distinct endpoints for Products and Checkout Sessions ([Stripe API Documentation](https://docs.stripe.com/api/)).

Each package is designed to function independently, allowing for flexible integration. For instance, you can use the `stripe-checkout` package with your existing product dataset without requiring additional dependencies (as outlined [here](https://github.com/stepanjakl/apostrophe-stripe-products?tab=readme-ov-file#recommended-use)). This modular approach also facilitates the integration of other Stripe services into the Stripe/Apostrophe ecosystem without impacting existing functionality.

Moreover, maintaining separate packages simplifies updates, maintenance, and troubleshooting, ensuring a more manageable and robust development process.

Additional Stripe packages to support other Stripe services can be added upon request. For inquiries, please email: [stepan.jakl@outlook.com](stepan.jakl@outlook.com).
