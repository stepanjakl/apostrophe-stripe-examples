const fs = require('fs');
const path = require('path');

module.exports = {
  options: {
    alias: 'stripeExamples'
  },
  bundle: {
    directory: 'modules',
    modules: getBundleModuleNames()
  },
  helpers() {
    return {
      // Publishable keys are meant to be exposed to the browser, but they must
      // be configured per-deployment so they match the same Stripe account as
      // the server's STRIPE_KEY. Hardcoding one breaks embedded checkout for
      // anyone using a different account.
      stripePublishableKey() {
        return process.env.STRIPE_PUBLISHABLE_KEY;
      }
    };
  }
};

function getBundleModuleNames() {
  return fs.readdirSync(path.resolve(__dirname, 'modules')).reduce((result, dir) => {
    if (dir.includes('stripe') && !(/(^|\/)\.[^/.]/g).test(dir)) {
      const subdirectories = fs.readdirSync(path.resolve(__dirname, `modules/${dir}`));
      subdirectories.forEach((subdir) => {
        if (!(/(^|\/)\.[^/.]/g).test(subdir)) {
          result.push(`${dir}/${subdir}`);
        }
      });
    }
    return result;
  }, []);
}
