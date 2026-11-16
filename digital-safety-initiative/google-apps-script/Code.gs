const RECIPIENT = "lifeneragroup@gmail.com";
const SUBJECT_PREFIX = "LIFENERA Digital Safety assistance enquiry";

function doPost(e) {
  const p = (e && e.parameter) ? e.parameter : {};

  // Quiet spam controls: honeypot and minimum completion time.
  if (p.website || !p.formStartedAt || (Date.now() - Number(p.formStartedAt)) < 3000) {
    return resultPage("error");
  }

  const name = clean(p.fullName, 80);
  const email = clean(p.Email_Address, 120);
  const phone = clean(p.Phone_Number, 30);
  const platform = clean(p.platform, 60);
  const issue = clean(p.issue, 100);
  const summary = clean(p.summary, 1200);
  const consent = clean(p.consent, 100);

  if (!name || !email || !platform || !issue || !summary || !consent) {
    return resultPage("error");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return resultPage("error");
  }

  const body = [
    "A new assistance enquiry was submitted through the LIFENERA Digital Safety Initiative website.",
    "",
    "Name: " + name,
    "Email address: " + email,
    "Phone / WhatsApp: " + (phone || "Not provided"),
    "Platform: " + platform,
    "Issue: " + issue,
    "",
    "Description:",
    summary,
    "",
    "Consent: " + consent,
    "",
    "Reply directly to this email to contact the person who submitted the enquiry."
  ].join("\n");

  try {
    MailApp.sendEmail({
      to: RECIPIENT,
      subject: SUBJECT_PREFIX + " — " + name,
      body: body,
      replyTo: email,
      name: "LIFENERA Digital Safety Initiative"
    });
    return resultPage("success");
  } catch (err) {
    console.error(err);
    return resultPage("error");
  }
}

function clean(value, maxLength) {
  return String(value || "").replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

function resultPage(status) {
  const safeStatus = status === "success" ? "success" : "error";
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' +
    '<script>window.top.postMessage({type:"lifenera-form-result",status:"' + safeStatus + '"},"*");</script>' +
    '</body></html>'
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}