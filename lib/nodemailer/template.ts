export const WELCOME_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>Welcome to Stocksy</title>
<style>
  body {
    margin: 0;
    padding: 0;
    background-color: #0b0b0c;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    color: #e5e7eb;
  }

  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #111214;
    border: 1px solid #1f2937;
    border-radius: 10px;
    overflow: hidden;
  }

  .header {
    padding: 40px 40px 20px 40px;
    text-align: center;
  }

  .header img {
    width: 160px;
    height: auto;
    display: inline-block;
  }

  .hero {
    text-align: center;
    padding: 0 40px 20px 40px;
  }

  .hero img {
    width: 100%;
    max-width: 520px;
    border-radius: 12px;
    border: 1px solid #27272a;
  }

  .content {
    padding: 40px;
  }

  h1 {
    font-size: 26px;
    color: #facc15;
    font-weight: 600;
    margin: 0 0 20px 0;
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #d1d5db;
    margin-bottom: 20px;
  }

  ul {
    padding-left: 20px;
    color: #d1d5db;
  }

  li {
    margin-bottom: 10px;
  }

  .button {
    display: block;
    width: fit-content;
    margin: 40px auto;
    background: linear-gradient(135deg, #facc15, #eab308);
    color: #000;
    padding: 14px 32px;
    text-decoration: none;
    font-weight: 600;
    border-radius: 8px;
    font-size: 16px;
  }

  .footer {
    font-size: 13px;
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .footer a {
    color: #d1d5db;
    text-decoration: underline;
  }

  @media only screen and (max-width: 600px) {
    .content {
      padding: 24px;
    }
    h1 {
      font-size: 22px;
    }
    p, li {
      font-size: 14px;
    }
  }
</style>
</head>
<body>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 40px 15px;">
        <div class="email-container">

          <!-- Header -->
          <div class="header">
            <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
          </div>

          <!-- Hero image -->
          <div class="hero">
            <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515542/dashboard-preview1_kjkidm.png" alt="Stocksy Dashboard Preview" />
          </div>

          <!-- Content -->
          <div class="content">
            <h1>Welcome aboard, {{name}} 👋</h1>
            <p>
              Thanks for joining <strong>Stocksy</strong> — your personalized stock-tracking and market insights hub.
              We’re thrilled to have you on board!
            </p>

            <p>Here’s how you can get started right away:</p>
            <ul>
              <li>Add your favorite stocks to your Watchlist.</li>
              <li>Set up alerts for price and volume changes.</li>
              <li>Track trends, insights, and real-time data all in one place.</li>
            </ul>

            <p>
              Stocksy keeps you ahead with curated market updates and powerful analytics — helping you make smarter investment decisions every day.
            </p>

            <a href="https://stocksy-coral.vercel.app/" class="button">Go to Dashboard</a>

            <p style="text-align:center; color:#9ca3af; font-size:14px;">
              Need help? <a href="mailto:support@stocksy.com">Contact support</a>
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <a href="#">Unsubscribe</a> | <a href="https://stocksy-coral.vercel.app/">Visit Stocksy</a><br />
            © ${new Date().getFullYear()} Stocksy. All rights reserved.
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const NEWS_SUMMARY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="dark light" />
    <meta name="supported-color-schemes" content="dark light" />
    <title>Market News Summary Today</title>
    <style type="text/css">
        /* Consistent Base Styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #050505; /* Dark background */
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #d1d5db; /* Light text color by default */
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #141414; /* Darker container background */
            border-radius: 8px;
            border: 1px solid #30333A;
            overflow: hidden;
        }

        .header {
            padding: 40px 40px 20px 40px;
            text-align: center;
        }

        .header img {
            width: 160px;
            height: auto;
            display: inline-block;
        }
        
        /* H1 Style for consistency (Yellow/Gold color) */
        h1 {
            margin: 0 0 20px 0; 
            font-size: 26px; /* Adjusted to 26px for better consistency with other H1s */
            font-weight: 600; 
            color: #facc15; /* Using the standard Stocksy yellow */
            line-height: 1.2;
        }

        /* Paragraph style for injected content */
        p {
            font-size: 16px; 
            line-height: 1.6; 
            color: #d1d5db; /* Default light text for content */
            margin-bottom: 20px;
        }


        /* Dark mode styles (ensuring compatibility) */
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #141414 !important;
                border: 1px solid #30333A !important;
            }
            .content-text {
                color: #d1d5db !important;
            }
        }
        
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 0 !important;
            }
            .mobile-padding {
                padding: 24px !important;
            }
            .mobile-title {
                font-size: 22px !important;
            }
            .mobile-text {
                font-size: 14px !important;
            }
            .mobile-outer-padding {
                padding: 20px 10px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" class="mobile-outer-padding" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="email-container" style="max-width: 600px; background-color: #141414; border-radius: 8px; border: 1px solid #30333A;">
                    
                    <tr>
                        <td align="center">
                            <div class="header">
                                <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="mobile-padding" style="padding: 40px;">
                            
                            <h1 class="mobile-title" style="margin: 0 0 20px 0; font-size: 26px; font-weight: 600; color: #facc15; line-height: 1.2;">
                                Market News Summary Today
                            </h1>
                            
                            <!-- Date is styled slightly muted -->
                            <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 14px; line-height: 1.4; color: #9ca3af;">
                                {{date}}
                            </p>
                            
                            <!-- Injected News Content starts here. Assumes newsContent is well-formed HTML (e.g., <p> tags) -->
                            <div class="content-text" style="color: #d1d5db;">
                                {{newsContent}}
                            </div>
                            <!-- Injected News Content ends here -->

                            <div style="text-align: center; margin: 40px 0 0 0; border-top: 1px solid #30333A; padding-top: 20px;">
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5; color: #9ca3af !important;">
                                    You're receiving this because you subscribed to Stocksy news updates.
                                </p>
                                <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.5;">
                                    <!-- Using standard placeholder # for unsubscribe link as is common practice -->
                                    <a href="#" style="color: #d1d5db !important; text-decoration: underline;">Unsubscribe</a> | 
                                    <!-- Fixed URL to be consistent with common use -->
                                    <a href="https://stocksy-coral.vercel.app/" style="color: #d1d5db !important; text-decoration: underline;">Visit Stocksy</a>
                                </p>
                                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #9ca3af !important;">
                                    © 2025 Stocksy
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const STOCK_ALERT_UPPER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>🚀 Stocksy Alert: {{symbol}} Hit Upper Target</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at top, #0d0d0d, #000);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f5f5f5;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 600px;
      margin: 60px auto;
      background: rgba(20, 20, 20, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(0, 255, 153, 0.15);
      backdrop-filter: blur(20px);
    }

    .header {
      text-align: center;
      padding: 50px 30px 20px;
      position: relative;
      background: linear-gradient(135deg, #121212 0%, #0b0b0b 100%);
    }

    .header::before {
      content: "";
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%);
      z-index: 0;
    }

    .header img {
      width: 160px;
      height: auto;
      z-index: 1;
      position: relative;
    }

    .alert-banner {
      text-align: center;
      padding: 10px 30px 30px;
      z-index: 1;
      position: relative;
    }

    .alert-banner h1 {
      font-size: 28px;
      margin: 0 0 8px;
      color: #10b981;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .alert-banner p {
      margin: 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .content {
      padding: 40px 40px 20px;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 28px 24px;
      text-align: center;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);
    }

    .card h2 {
      font-size: 30px;
      margin: 0 0 6px;
      color: #ffffff;
      font-weight: 700;
    }

    .card p {
      font-size: 16px;
      margin: 0 0 20px;
      color: #a1a1aa;
    }

    .price {
      font-size: 42px;
      color: #22c55e;
      font-weight: 800;
      text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
      margin: 0;
    }

    .info {
      border-left: 3px solid #22c55e;
      padding: 16px 20px;
      margin-bottom: 28px;
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
    }

    .info h3 {
      margin: 0 0 10px;
      color: #f5f5f5;
      font-size: 17px;
      font-weight: 600;
    }

    .info p {
      margin: 4px 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .highlight {
      text-align: center;
      padding: 20px 25px;
      border-radius: 12px;
      background: linear-gradient(145deg, rgba(34,197,94,0.15), rgba(255,255,255,0.02));
      border: 1px solid rgba(34,197,94,0.3);
      margin-bottom: 35px;
    }

    .highlight h3 {
      color: #E8BA40;
      font-size: 18px;
      margin: 0 0 10px;
    }

    .highlight p {
      color: #d1d5db;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }

    .cta {
      text-align: center;
      margin-bottom: 40px;
    }

    .cta a {
      display: inline-block;
      background: linear-gradient(90deg, #E8BA40, #FFD76E);
      color: #000;
      padding: 16px 36px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .cta a:hover {
      background: linear-gradient(90deg, #FFD76E, #E8BA40);
      transform: translateY(-1px);
    }

    .footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 30px 40px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
    }

    .footer a {
      color: #9ca3af;
      text-decoration: underline;
      margin: 0 6px;
    }

    @media (max-width: 600px) {
      .container { margin: 0; border-radius: 0; }
      .content { padding: 24px 20px; }
      .price { font-size: 34px; }
      .alert-banner h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
    </div>

    <div class="alert-banner">
      <h1>Target Reached 🚀</h1>
      <p>{{timestamp}}</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>{{symbol}}</h2>
        <p>{{company}}</p>
        <p class="price">{{currentPrice}}</p>
      </div>

      <div class="info">
        <h3>Alert Details</h3>
        <p><strong>Target Price:</strong> {{targetPrice}}</p>
        <p><strong>Trigger:</strong> Exceeded your upper threshold of {{targetPrice}}</p>
      </div>

      <div class="highlight">
        <h3>💡 Market Insight</h3>
        <p>{{symbol}} has crossed your upper target. Review your position — it could be a strategic time to rebalance or take profits.</p>
      </div>

      <div class="cta">
        <a href="https://stocksy-coral.vercel.app/watchlist">Open Dashboard</a>
      </div>

      <div class="footer">
        <p>You’re receiving this because you subscribed to Stocksy alerts.</p>
        <p><a href="#">Unsubscribe</a> | <a href="https://stocksy-coral.vercel.app/">Visit Stocksy</a></p>
        <p>© 2025 Stocksy</p>
      </div>
    </div>
  </div>
</body>
</html>`;

export const STOCK_ALERT_LOWER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>📉 Stocksy Alert: {{symbol}} Hit Lower Target</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at top, #0d0d0d, #000);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f5f5f5;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 600px;
      margin: 60px auto;
      background: rgba(20, 20, 20, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(239, 68, 68, 0.15);
      backdrop-filter: blur(20px);
    }

    .header {
      text-align: center;
      padding: 50px 30px 20px;
      position: relative;
      background: linear-gradient(135deg, #121212 0%, #0b0b0b 100%);
    }

    .header::before {
      content: "";
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(239,68,68,0.25), transparent 70%);
      z-index: 0;
    }

    .header img {
      width: 160px;
      height: auto;
      z-index: 1;
      position: relative;
    }

    .alert-banner {
      text-align: center;
      padding: 10px 30px 30px;
      z-index: 1;
      position: relative;
    }

    .alert-banner h1 {
      font-size: 28px;
      margin: 0 0 8px;
      color: #ef4444;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .alert-banner p {
      margin: 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .content {
      padding: 40px 40px 20px;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 28px 24px;
      text-align: center;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);
    }

    .card h2 {
      font-size: 30px;
      margin: 0 0 6px;
      color: #ffffff;
      font-weight: 700;
    }

    .card p {
      font-size: 16px;
      margin: 0 0 20px;
      color: #a1a1aa;
    }

    .price {
      font-size: 42px;
      color: #ef4444;
      font-weight: 800;
      text-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
      margin: 0;
    }

    .info {
      border-left: 3px solid #ef4444;
      padding: 16px 20px;
      margin-bottom: 28px;
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
    }

    .info h3 {
      margin: 0 0 10px;
      color: #f5f5f5;
      font-size: 17px;
      font-weight: 600;
    }

    .info p {
      margin: 4px 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .highlight {
      text-align: center;
      padding: 20px 25px;
      border-radius: 12px;
      background: linear-gradient(145deg, rgba(239,68,68,0.15), rgba(255,255,255,0.02));
      border: 1px solid rgba(239,68,68,0.3);
      margin-bottom: 35px;
    }

    .highlight h3 {
      color: #E8BA40;
      font-size: 18px;
      margin: 0 0 10px;
    }

    .highlight p {
      color: #d1d5db;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }

    .cta {
      text-align: center;
      margin-bottom: 40px;
    }

    .cta a {
      display: inline-block;
      background: linear-gradient(90deg, #E8BA40, #FFD76E);
      color: #000;
      padding: 16px 36px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .cta a:hover {
      background: linear-gradient(90deg, #FFD76E, #E8BA40);
      transform: translateY(-1px);
    }

    .footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 30px 40px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
    }

    .footer a {
      color: #9ca3af;
      text-decoration: underline;
      margin: 0 6px;
    }

    @media (max-width: 600px) {
      .container { margin: 0; border-radius: 0; }
      .content { padding: 24px 20px; }
      .price { font-size: 34px; }
      .alert-banner h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
    </div>

    <div class="alert-banner">
      <h1>Price Dropped 📉</h1>
      <p>{{timestamp}}</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>{{symbol}}</h2>
        <p>{{company}}</p>
        <p class="price">{{currentPrice}}</p>
      </div>

      <div class="info">
        <h3>Alert Details</h3>
        <p><strong>Target Price:</strong> {{targetPrice}}</p>
        <p><strong>Trigger:</strong> Fell below your lower threshold of {{targetPrice}}</p>
      </div>

      <div class="highlight">
        <h3>💡 Opportunity Insight</h3>
        <p>{{symbol}} has dropped below your target. This could be a potential entry opportunity if you believe in its long-term value.</p>
      </div>

      <div class="cta">
        <a href="https://stocksy-coral.vercel.app/watchlist">Open Dashboard</a>
      </div>

      <div class="footer">
        <p>You’re receiving this because you subscribed to Stocksy alerts.</p>
        <p><a href="#">Unsubscribe</a> | <a href="https://stocksy-coral.vercel.app/">Visit Stocksy</a></p>
        <p>© 2025 Stocksy</p>
      </div>
    </div>
  </div>
</body>
</html>`;

export const VOLUME_ALERT_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>📊 Stocksy Alert: {{symbol}} Volume Spike</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: radial-gradient(circle at top, #0d0d0d, #000);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #f5f5f5;
      -webkit-font-smoothing: antialiased;
    }

    .container {
      max-width: 600px;
      margin: 60px auto;
      background: rgba(20, 20, 20, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 0 60px rgba(139, 92, 246, 0.2);
      backdrop-filter: blur(20px);
    }

    .header {
      text-align: center;
      padding: 50px 30px 20px;
      position: relative;
      background: linear-gradient(135deg, #121212 0%, #0b0b0b 100%);
    }

    .header::before {
      content: "";
      position: absolute;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 240px;
      height: 240px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139,92,246,0.25), transparent 70%);
      z-index: 0;
    }

    .header img {
      width: 160px;
      height: auto;
      z-index: 1;
      position: relative;
    }

    .alert-banner {
      text-align: center;
      padding: 10px 30px 30px;
      z-index: 1;
      position: relative;
    }

    .alert-banner h1 {
      font-size: 28px;
      margin: 0 0 8px;
      color: #8b5cf6;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .alert-banner p {
      margin: 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .content {
      padding: 40px 40px 20px;
    }

    .card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 14px;
      padding: 28px 24px;
      text-align: center;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.02);
    }

    .card h2 {
      font-size: 30px;
      margin: 0 0 6px;
      color: #ffffff;
      font-weight: 700;
    }

    .card p {
      font-size: 16px;
      margin: 0 0 10px;
      color: #a1a1aa;
    }

    .volume {
      font-size: 42px;
      color: #8b5cf6;
      font-weight: 800;
      text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
      margin: 0;
    }

    .price {
      font-size: 18px;
      color: {{priceColor}};
      font-weight: 600;
      margin: 4px 0 0 0;
    }

    .info {
      border-left: 3px solid #8b5cf6;
      padding: 16px 20px;
      margin-bottom: 28px;
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
    }

    .info h3 {
      margin: 0 0 10px;
      color: #f5f5f5;
      font-size: 17px;
      font-weight: 600;
    }

    .info p {
      margin: 4px 0;
      color: #9ca3af;
      font-size: 15px;
    }

    .highlight {
      text-align: center;
      padding: 20px 25px;
      border-radius: 12px;
      background: linear-gradient(145deg, rgba(139,92,246,0.15), rgba(255,255,255,0.02));
      border: 1px solid rgba(139,92,246,0.3);
      margin-bottom: 35px;
    }

    .highlight h3 {
      color: #E8BA40;
      font-size: 18px;
      margin: 0 0 10px;
    }

    .highlight p {
      color: #d1d5db;
      font-size: 15px;
      line-height: 1.6;
      margin: 0;
    }

    .cta {
      text-align: center;
      margin-bottom: 40px;
    }

    .cta a {
      display: inline-block;
      background: linear-gradient(90deg, #E8BA40, #FFD76E);
      color: #000;
      padding: 16px 36px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .cta a:hover {
      background: linear-gradient(90deg, #FFD76E, #E8BA40);
      transform: translateY(-1px);
    }

    .footer {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 30px 40px;
      text-align: center;
      color: #6b7280;
      font-size: 13px;
    }

    .footer a {
      color: #9ca3af;
      text-decoration: underline;
      margin: 0 6px;
    }

    @media (max-width: 600px) {
      .container { margin: 0; border-radius: 0; }
      .content { padding: 24px 20px; }
      .volume { font-size: 34px; }
      .alert-banner h1 { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
    </div>

    <div class="alert-banner">
      <h1>📊 Volume Alert Triggered</h1>
      <p>{{timestamp}}</p>
    </div>

    <div class="content">
      <div class="card">
        <h2>{{symbol}}</h2>
        <p>{{company}}</p>
        <p class="volume">{{currentVolume}}M</p>
        <p class="price">{{currentPrice}} ({{changeDirection}}{{changePercent}}%)</p>
      </div>

      <div class="info">
        <h3>Spike Details</h3>
        <p><strong>Trigger:</strong> {{alertMessage}}</p>
        <p><strong>Average Volume:</strong> {{averageVolume}}M shares</p>
        <p><strong>Spike Detected:</strong> {{volumeSpike}}</p>
      </div>

      <div class="highlight">
        <h3>💡 Market Insight</h3>
        <p>High trading volume indicates strong market interest or major events. Monitor the sentiment and news around {{symbol}} to act strategically.</p>
      </div>

      <div class="cta">
        <a href="https://stocksy-coral.vercel.app/watchlist">Open Dashboard</a>
      </div>

      <div class="footer">
        <p>You’re receiving this because you subscribed to Stocksy alerts.</p>
        <p><a href="#">Unsubscribe</a> | <a href="https://stocksy-coral.vercel.app/">Visit Stocksy</a></p>
        <p>© 2025 Stocksy</p>
      </div>
    </div>
  </div>
</body>
</html>`;

export const INACTIVE_USER_REMINDER_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>We Miss You! Your Market Insights Await</title>
<style type="text/css">
  /* Base Styles from WELCOME_EMAIL_TEMPLATE */
  body {
    margin: 0;
    padding: 0;
    background-color: #0b0b0c; /* Dark background */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    color: #e5e7eb; /* Light text color */
  }

  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background-color: #111214; /* Darker container background */
    border: 1px solid #1f2937;
    border-radius: 10px;
    overflow: hidden;
  }

  .header {
    padding: 40px 40px 20px 40px;
    text-align: center;
  }

  .header img {
    width: 160px;
    height: auto;
    display: inline-block;
  }

  .content {
    padding: 40px;
  }

  h1 {
    font-size: 26px;
    color: #facc15; /* Yellow heading color from Welcome email */
    font-weight: 600;
    margin: 0 0 20px 0;
    /* Removed background-clip text gradient for consistency with Welcome H1 */
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
    color: #E8BA40; /* Yellow for sub-heading */
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #d1d5db;
    margin-bottom: 20px;
  }

  .button {
    display: block;
    width: fit-content;
    margin: 40px auto;
    background: linear-gradient(135deg, #facc15, #eab308); /* Yellow Gradient Button */
    color: #000;
    padding: 14px 32px;
    text-decoration: none;
    font-weight: 600;
    border-radius: 8px;
    font-size: 16px;
    text-align: center; /* Ensure centering on smaller devices */
  }

  .footer {
    font-size: 13px;
    text-align: center;
    padding: 40px 20px;
    color: #9ca3af;
  }

  .footer a {
    color: #d1d5db;
    text-decoration: underline;
  }

  /* Specific styles for INACTIVE_USER_REMINDER_EMAIL_TEMPLATE content */
  .info-box {
    background-color: #050505;
    border: 1px solid #374151;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
  }

  .info-box p {
    font-size: 14px;
    color: #ccdadc;
    margin: 0;
  }

  .content p:last-of-type {
    margin-bottom: 40px; /* Adjust spacing before button */
  }

  /* Media Queries from WELCOME_EMAIL_TEMPLATE */
  @media only screen and (max-width: 600px) {
    .content {
      padding: 24px;
    }
    h1 {
      font-size: 22px;
    }
    p, li {
      font-size: 14px;
    }
    .button {
        width: 100%;
        box-sizing: border-box; /* Ensures padding is included in the width */
    }
  }
</style>
</head>
<body>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
        <tr>
            <td align="center" style="padding: 40px 15px;">
                <div class="email-container">

                    <div class="header">
                        <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo" />
                    </div>

                    <div class="content">
                        <h1>We Miss You, {{name}}!</h1>
                        
                        <p>
                            We noticed you haven't visited <strong>Stocksy</strong> in a while. The markets have been moving, and there might be some opportunities you don't want to miss!
                        </p>

                        <div class="info-box">
                            <h3>Market Update</h3>
                            <p>
                                Markets have been active lately! Major indices have seen significant movements, and there might be opportunities in your tracked stocks that you don't want to miss.
                            </p>
                        </div>
                        
                        <p>
                            Your watchlists are still active and ready to help you stay on top of your investments. Don't let market opportunities pass you by!
                        </p>
                        
                        <a href="{{dashboardUrl}}" class="button">Return to Dashboard</a>

                        <p style="text-align:center; color:#9ca3af; font-size:14px;">
                            For any queries? 
                            <br>
                            <a href="mailto:support@somashekar528234@gmail.com">Reply to this email</a>.
                        </p>
                    </div>

                    <div class="footer">
                        <a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="https://stocksy-coral.vercel.app/">Visit Stocksy</a><br />
                        © 2025 Stocksy. All rights reserved.
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const RESET_PASSWORD_EMAIL_TEMPLATE = `
  <div style="font-family:sans-serif;padding:20px">
    <h2>Reset your password</h2>
    <p>Click the link below to set a new password:</p>
    <a href="{{url}}" style="color:#2563eb">Reset Password</a>
  </div>
`;

export const BUY_ORDER_PIN_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Buy Order Verification PIN</title>
  <style>
    body { margin:0; padding:0; background:radial-gradient(circle at top,#0d0d0d,#000); font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#f5f5f5; -webkit-font-smoothing:antialiased; }
    .container { max-width:600px; margin:60px auto; background:rgba(20,20,20,.95); border:1px solid rgba(255,255,255,.05); border-radius:20px; overflow:hidden; backdrop-filter:blur(20px); }
    .header { text-align:center; padding:50px 30px 20px; background:linear-gradient(135deg,#121212 0%,#0b0b0b 100%); }
    .header img { width:160px; height:auto; }
    .section-title { text-align:center; padding:10px 30px 20px; }
    .section-title h1 { font-size:28px; margin:0 0 6px; color:#E8BA40; font-weight:700; }
    .section-title p { margin:0; color:#9ca3af; font-size:15px; }
    .content { padding:40px 40px 20px; }
    .otp-box { text-align:center; padding:32px 24px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:14px; backdrop-filter:blur(12px); margin-bottom:30px; }
    .otp-label { font-size:16px; color:#a1a1aa; margin-bottom:12px; }
    .otp-value { font-size:42px; font-weight:800; color:#E8BA40; margin:0; letter-spacing:6px; }
    .info { border-left:3px solid #E8BA40; padding:16px 20px; margin-bottom:28px; background:rgba(255,255,255,.02); border-radius:8px; }
    .info h3 { margin:0 0 10px; color:#f5f5f5; font-size:17px; font-weight:600; }
    .info p { margin:4px 0; color:#9ca3af; font-size:15px; line-height:1.5; }
    .cta { text-align:center; margin-bottom:40px; }
    .cta a { display:inline-block; background:linear-gradient(90deg,#E8BA40,#FFD76E); color:#000; padding:16px 36px; border-radius:10px; font-weight:700; font-size:16px; text-decoration:none; transition:all .3s ease; }
    .cta a:hover { background:linear-gradient(90deg,#FFD76E,#E8BA40); transform:translateY(-1px); }
    .footer { border-top:1px solid rgba(255,255,255,.08); padding:30px 40px; text-align:center; color:#6b7280; font-size:13px; }
    .footer a { color:#9ca3af; text-decoration:underline; margin:0 6px; }
    @media (max-width:600px){ .container{margin:0;border-radius:0;} .content{padding:24px 20px;} .otp-value{font-size:34px;letter-spacing:4px;} .section-title h1{font-size:24px;} }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo"/>
    </div>

    <div class="section-title">
      <h1>Buy Order Verification</h1>
      <p>{{timestamp}}</p>
    </div>

    <div class="content">
      <div class="otp-box">
        <div class="otp-label">Your verification PIN</div>
        <div class="otp-value">{{pin}}</div>
      </div>

      <div class="info">
        <h3>Details</h3>
        <p><strong>Type:</strong> Buy</p>
        <p><strong>Symbol:</strong> {{symbol}}</p>
        <p><strong>Quantity:</strong> {{qty}}</p>
        <p><strong>Price:</strong> {{price}}</p>
        <p>Valid for {{ttl}} minutes.</p>
      </div>

      <div class="cta">
        <a href="https://stocksy-coral.vercel.app/orders">Return to Order</a>
      </div>

      <div class="footer">
        <p>This message was generated for buy order verification.</p>
        <p><a href="https://stocksy-coral.vercel.app/">Stocksy</a></p>
        <p>© 2025 Stocksy</p>
      </div>
    </div>
  </div>
</body>
</html>`;

export const SELL_ORDER_PIN_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sell Order Verification PIN</title>
  <style>
    body { margin:0; padding:0; background:radial-gradient(circle at top,#0d0d0d,#000); font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; color:#f5f5f5; -webkit-font-smoothing:antialiased; }
    .container { max-width:600px; margin:60px auto; background:rgba(20,20,20,.95); border:1px solid rgba(255,255,255,.05); border-radius:20px; overflow:hidden; backdrop-filter:blur(20px); }
    .header { text-align:center; padding:50px 30px 20px; background:linear-gradient(135deg,#121212 0%,#0b0b0b 100%); }
    .header img { width:160px; height:auto; }
    .section-title { text-align:center; padding:10px 30px 20px; }
    .section-title h1 { font-size:28px; margin:0 0 6px; color:#E8BA40; font-weight:700; }
    .section-title p { margin:0; color:#9ca3af; font-size:15px; }
    .content { padding:40px 40px 20px; }
    .otp-box { text-align:center; padding:32px 24px; background:rgba(255,255,255,.03); border:1px solid rgba(255,255,255,.06); border-radius:14px; backdrop-filter:blur(12px); margin-bottom:30px; }
    .otp-label { font-size:16px; color:#a1a1aa; margin-bottom:12px; }
    .otp-value { font-size:42px; font-weight:800; color:#E8BA40; margin:0; letter-spacing:6px; }
    .info { border-left:3px solid #E8BA40; padding:16px 20px; margin-bottom:28px; background:rgba(255,255,255,.02); border-radius:8px; }
    .info h3 { margin:0 0 10px; color:#f5f5f5; font-size:17px; font-weight:600; }
    .info p { margin:4px 0; color:#9ca3af; font-size:15px; line-height:1.5; }
    .cta { text-align:center; margin-bottom:40px; }
    .cta a { display:inline-block; background:linear-gradient(90deg,#E8BA40,#FFD76E); color:#000; padding:16px 36px; border-radius:10px; font-weight:700; font-size:16px; text-decoration:none; transition:all .3s ease; }
    .cta a:hover { background:linear-gradient(90deg,#FFD76E,#E8BA40); transform:translateY(-1px); }
    .footer { border-top:1px solid rgba(255,255,255,.08); padding:30px 40px; text-align:center; color:#6b7280; font-size:13px; }
    .footer a { color:#9ca3af; text-decoration:underline; margin:0 6px; }
    @media (max-width:600px){ .container{margin:0;border-radius:0;} .content{padding:24px 20px;} .otp-value{font-size:34px;letter-spacing:4px;} .section-title h1{font-size:24px;} }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://res.cloudinary.com/dbjgmxt8h/image/upload/v1762515151/stocksy_logo1_jmbh8c.png" alt="Stocksy Logo"/>
    </div>

    <div class="section-title">
      <h1>Sell Order Verification</h1>
      <p>{{timestamp}}</p>
    </div>

    <div class="content">
      <div class="otp-box">
        <div class="otp-label">Your verification PIN</div>
        <div class="otp-value">{{pin}}</div>
      </div>

      <div class="info">
        <h3>Details</h3>
        <p><strong>Type:</strong> Sell</p>
        <p><strong>Symbol:</strong> {{symbol}}</p>
        <p><strong>Quantity:</strong> {{qty}}</p>
        <p><strong>Price:</strong> {{price}}</p>
        <p>Valid for {{ttl}} minutes.</p>
      </div>

      <div class="cta">
        <a href="https://stocksy-coral.vercel.app/orders">Return to Order</a>
      </div>

      <div class="footer">
        <p>This message was generated for sell order verification.</p>
        <p><a href="https://stocksy-coral.vercel.app/">Stocksy</a></p>
        <p>© 2025 Stocksy</p>
      </div>
    </div>
  </div>
</body>
</html>`;
