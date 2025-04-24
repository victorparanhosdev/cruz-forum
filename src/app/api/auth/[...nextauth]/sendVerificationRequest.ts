import { SendVerificationRequestParams } from 'next-auth/providers/email'
import { createTransport } from 'nodemailer'

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url, provider } = params

  const transport = createTransport(provider.server)

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Autenticação Cruz Forum`,
    text: text({ url }),
    html: html({ url }),
  })

  const failed = result.rejected.filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}

function html(params: { url: string }) {
  const { url } = params

  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <style type="text/css">
    body,
    p,
    div {
      font-family: arial, helvetica, sans-serif;
      font-size: 14px;
    }

    body {
      color: #fdfffe;
    }

    body a {
      color: #A3F7DA;
      text-decoration: none;
    }

    p {
      margin: 0;
      padding: 0;
    }

    table.wrapper {
      width: 100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    img.max-width {
      max-width: 100% !important;
    }

    .column.of-2 {
      width: 50%;
    }

    .column.of-3 {
      width: 33.333%;
    }

    .column.of-4 {
      width: 25%;
    }

    ul ul ul ul {
      list-style-type: disc !important;
    }

    ol ol {
      list-style-type: lower-roman !important;
    }

    ol ol ol {
      list-style-type: lower-latin !important;
    }

    ol ol ol ol {
      list-style-type: decimal !important;
    }

    @media screen and (max-width:480px) {

      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }

      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }

      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }

      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }

      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }

      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }

      .columns {
        width: 100% !important;
      }

      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
  <!--user entered Head Start--><!--End Head user entered-->
</head>

<body>
  <center class="wrapper" data-link-color="#A3F7DA"
    data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#fdfffe; background-color:#FFFFFF;">
    <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
        <tr>
          <td valign="top" bgcolor="#FFFFFF" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0"
              border="0">
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <table width="100%" cellpadding="0" cellspacing="0" border="0"
                          style="width:100%; max-width:600px;" align="center">
                          <tr>
                            <td role="modules-container"
                              style="padding:0px 0px 0px 0px; color:#fdfffe; text-align:left;" bgcolor="#000000"
                              width="100%" align="left">
                              <table class="module preheader preheader-hide" role="module" data-type="preheader"
                                border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                <tr>
                                  <td role="module-content">
                                    <p></p>
                                  </td>
                                </tr>
                              </table>
                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="e9050bd8-b332-4ba3-8695-6c952a2e3270">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 48px 0px;" role="module-content" bgcolor="">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="6a63e29b-db86-4273-b46f-27b9c2fbcc92">
                                <tbody>
                                  <tr>
                                    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top"
                                      align="center">
                                      <img class="max-width" border="0"
                                        style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:15% !important; width:15%; height:auto !important;"
                                        width="90" alt="" data-proportionally-constrained="true" data-responsive="true"
                                        src="http://cdn.mcauto-images-production.sendgrid.net/b899d1542fbbaf41/53a94b6b-1cbd-410a-9ace-7556169c3f96/145x103.png">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="d1a37337-01ec-4fbf-b9e3-a2dfd19ce538">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="a75f83dc-2d1f-402f-a285-f423890d9ef8" data-mc-module-version="2019-10-22">
                                <tbody>
                                  <tr>
                                    <td style="padding:18px 18px 18px 18px; line-height:22px; text-align:inherit;"
                                      height="100%" valign="top" bgcolor="" role="module-content">
                                      <div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="font-size: 24px"><strong>Seja bem-vindo ao Cruz Forum!
                                              😉</strong></span></div>
                                        <div style="font-family: inherit; text-align: center"><br></div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="color: #fdfffe; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space-collapse: preserve; text-wrap-mode: wrap; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 14px">Estamos
                                            felizes em ter você por aqui. Para acessar sua conta com segurança, basta
                                            clicar no botão abaixo:</span></div>
                                        <div></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="b43ae71a-1ccc-4aba-bfe9-61be50f203a3">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button"
                                data-type="button" role="module" style="table-layout:fixed;" width="100%"
                                data-muid="a1337fd7-883b-41fa-9fb2-5c35b3c62b1e">
                                <tbody>
                                  <tr>
                                    <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
                                      <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile"
                                        style="text-align:center;">
                                        <tbody>
                                          <tr>
                                            <td align="center" bgcolor="#002A25" class="inner-td"
                                              style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                              <a href="${url}"
                                                style="background-color:#002A25; border:0px solid #333333; border-color:#333333; border-radius:8px; border-width:0px; color:#ffffff; display:inline-block; font-size:16px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:18px 24px 18px 24px; text-align:center; text-decoration:none; border-style:solid;"
                                                target="_blank">Entrar na Aplicação</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="b68c0e2e-cde8-4bbe-8c01-2d55c583cc88">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 48px 0px;" role="module-content" bgcolor="">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="text" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="9f13c5cc-58d6-47b8-ad1d-fb274400a0a6" data-mc-module-version="2019-10-22">
                                <tbody>
                                  <tr>
                                    <td
                                      style="padding:18px 18px 18px 18px; line-height:22px; text-align:inherit; background-color:#0C0A09;"
                                      height="100%" valign="top" bgcolor="#0C0A09" role="module-content">
                                      <div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="font-size: 12px">Esse link é exclusivo para sua autenticação e expira
                                            após um período por questões de segurança. Se você não solicitou este
                                            acesso, pode simplesmente ignorar este e-mail com tranquilidade — nenhuma
                                            ação será realizada.</span></div>
                                        <div style="font-family: inherit; text-align: center"><br></div>
                                        <div style="font-family: inherit; text-align: center"><span
                                            style="font-size: 12px">Atenciosamente,<br>
                                          </span><span style="font-size: 12px"><strong>Equipe Cruz Forum</strong></span>
                                        </div>
                                        <div></div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table class="module" role="module" data-type="social" align="center" border="0"
                                cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="512628ec-4d8c-422f-a17f-d9b6158f9023">
                                <tbody>
                                  <tr>
                                    <td valign="top" style="padding:24px 0px 12px 0px; font-size:6px; line-height:10px;"
                                      align="center">
                                      <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
                                        <tbody>
                                          <tr align="center">
                                            <td style="padding: 0px 5px;" class="social-icon-column">
                                              <a role="social-icon-link"
                                                href="https://www.facebook.com/victorparanhoscosta/" target="_blank"
                                                alt="Facebook" title="Facebook"
                                                style="display:inline-block; background-color:#3B579D; height:21px; width:21px;">
                                                <img role="social-icon" alt="Facebook" title="Facebook"
                                                  src="https://mc.sendgrid.com/assets/social/white/facebook.png"
                                                  style="height:21px; width:21px;" height="21" width="21">
                                              </a>
                                            </td>
                                            <td style="padding: 0px 5px;" class="social-icon-column">
                                              <a role="social-icon-link"
                                                href="https://www.instagram.com/victorparanhos_94/" target="_blank"
                                                alt="Instagram" title="Instagram"
                                                style="display:inline-block; background-color:#C13584; height:21px; width:21px;">
                                                <img role="social-icon" alt="Instagram" title="Instagram"
                                                  src="https://mc.sendgrid.com/assets/social/white/instagram.png"
                                                  style="height:21px; width:21px;" height="21" width="21">
                                              </a>
                                            </td>
                                            <td style="padding: 0px 5px;" class="social-icon-column">
                                              <a role="social-icon-link"
                                                href="https://www.linkedin.com/in/victorparanhos94/" target="_blank"
                                                alt="LinkedIn" title="LinkedIn"
                                                style="display:inline-block; background-color:#0077B5; height:21px; width:21px;">
                                                <img role="social-icon" alt="LinkedIn" title="LinkedIn"
                                                  src="https://mc.sendgrid.com/assets/social/white/linkedin.png"
                                                  style="height:21px; width:21px;" height="21" width="21">
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe"
                                style="color:#FFFFFF; font-size:12px; line-height:20px; padding:16px 18px 16px 18px; text-align:Center;"
                                data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
                                <div class="Unsubscribe--addressLine">
                                  <p style="font-family:arial,helvetica,sans-serif; font-size:12px; line-height:20px;">
                                    <span class="Unsubscribe--senderCity">Cruz das Almas</span>, <span
                                      class="Unsubscribe--senderState">Bahia</span> <span
                                      class="Unsubscribe--senderZip">44380-000</span></p>
                                </div>

                              </div>
                              <table class="module" role="module" data-type="spacer" border="0" cellpadding="0"
                                cellspacing="0" width="100%" style="table-layout: fixed;"
                                data-muid="5db2547b-675d-43d5-9d87-bada6baea873">
                                <tbody>
                                  <tr>
                                    <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>

</html>
`
}

function text({ url }: { url: string }) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 30px auto;">
    <tr>
      <td align="center" bgcolor="#002A25" style="border-radius: 8px;">
        <a href="${url}" target="_blank" style="font-size: 16px; font-weight: bold; padding: 12px 24px; color: #FFFFFF; text-decoration: none; display: inline-block;">
          Entrar em Cruz Forum
        </a>
      </td>
    </tr>
  </table>`
}
