module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/acceptance/**/*.ts'],
    format: ['progress-bar', 'html:tests/reports/cucumber.html']
  }
}
