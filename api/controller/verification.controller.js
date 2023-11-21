const verificationService = require('../service/verification.service');
const logger = require('../logger/logger');

class VerificationController {

  async searchGoogleScholar(query) {
    logger.info('Controller: searchGoogleScholar');
    return await verificationService.searchGoogleScholar(query);
  }

  async citeGoogleScholar(cite) {
    logger.info('Controller: citeGoogleScholar');
    return await verificationService.citeGoogleScholar(cite);
  }

  async getHTMLContent(url) {
    logger.info('Controller: getHTMLContent');
    return await verificationService.getHTMLContent(url);
  }

}

module.exports = new VerificationController();