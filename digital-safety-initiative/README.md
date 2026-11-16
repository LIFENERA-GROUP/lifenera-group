# LIFENERA Digital Safety Initiative website

A standalone static website for the LIFENERA Digital Safety Initiative, a programme of LIFENERA GROUP.

## Deploy as a separate Cloudflare Pages project

This website lives in the `digital-safety-initiative/` folder of the LIFENERA GROUP repository. It does not replace the existing LIFENERA GROUP homepage or Opportunity Signal.

Create a new Cloudflare Pages project connected to:
- Repository: `LIFENERA-GROUP/lifenera-group`
- Production branch: `main`
- Root directory: `digital-safety-initiative`
- Build command: leave blank
- Build output directory: `.`

Cloudflare Pages will serve this folder as a separate website. Choose a project name such as `lifenera-digital-safety`, then Cloudflare will provide a `.pages.dev` address.

## Current form behaviour

The initial assistance form prepares an email in the visitor's own email application. It does not store form data on a server and does not upload documents. This is intentional for the first version: do not collect passwords, verification codes, PINs or identity documents.

A secure case-management dashboard, authenticated staff access, encrypted storage, retention controls and a proper server-side intake endpoint should be implemented before accepting sensitive case records or attachments.

## Contact
lifeneragroup@gmail.com
