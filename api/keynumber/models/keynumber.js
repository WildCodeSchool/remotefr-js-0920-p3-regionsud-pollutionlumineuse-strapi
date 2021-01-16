'use strict';
const generateSummary = require('../../../helpers/generate-summary')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    beforeCreate(data) {
      data.summary = generateSummary(data.text);
    },
    beforeUpdate(params, data) {
      console.log(data)
      data.summary = generateSummary(data.text);
      console.log(data)
    },
  },
};
