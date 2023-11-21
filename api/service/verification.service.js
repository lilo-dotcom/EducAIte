const verificationRepository = require('../repository/verification.repository');

class VerificationService {
  
  constructor() {}

  async searchGoogleScholar(query) {
    return await verificationRepository.searchGoogleScholar(query);
  }

  async citeGoogleScholar(cite) {
    return await verificationRepository.citeGoogleScholar(cite);
  }

  async getHTMLContent(url) {
    return await verificationRepository.getHTMLContent(url);
  }
}

module.exports = new VerificationService();