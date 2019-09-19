const keys = require("../../config/keys");

module.exports = rsvp => {
  return `
  <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the fallowing question:</p>
        <p>${rsvp.body}</p>
        <div>
          <a href="${keys.redirectDomain}/api/rsvps/${rsvp.id}/yes">Yes</a>
        </div>
        <div>
          <a href="${keys.redirectDomain}/api/rsvps/${rsvp.id}/no">No</a>
        </div>
      </div>
    </body>
  </html>`;
};
