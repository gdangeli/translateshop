// Email service using Resend
import { Resend } from 'resend';

const ADMIN_EMAIL = 'g.dangeli@leadpoint.ch';
const FROM_EMAIL = 'TranslateShop <noreply@translateshop.ch>';

// Lazy initialization to avoid build errors
let resendInstance: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const resend = getResend();
  
  if (!resend) {
    console.error('RESEND_API_KEY not configured');
    return { success: false, error: 'Email not configured' };
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

// Admin notification: New user registered
export async function notifyNewUserRegistration(user: {
  email: string;
  companyName?: string;
}) {
  const subject = `🆕 Neuer User: ${user.email}`;
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">🆕 Neuer TranslateShop User</h2>
      <p>Ein neuer User hat sich registriert:</p>
      <table style="border-collapse: collapse; width: 100%;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">E-Mail:</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${user.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Firma:</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${user.companyName || '-'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Zeitpunkt:</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${new Date().toLocaleString('de-CH')}</td>
        </tr>
      </table>
      <p style="margin-top: 20px;">
        <a href="https://translateshop.ch/admin" style="background: #dc2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
          Dashboard öffnen
        </a>
      </p>
    </div>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
    text: `Neuer TranslateShop User: ${user.email} (${user.companyName || 'keine Firma'})`,
  });
}

// Onboarding email to new user
export async function sendWelcomeEmail(user: {
  email: string;
  companyName?: string;
}) {
  const subject = 'Willkommen bei TranslateShop.ch! 🌐';
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #1e293b;">🌐 TranslateShop<span style="color: #dc2626;">.ch</span></h1>
      </div>
      
      <h2>Willkommen${user.companyName ? `, ${user.companyName}` : ''}! 👋</h2>
      
      <p>Schön, dass Sie dabei sind! Mit TranslateShop erreichen Sie ab sofort alle 4 Sprachregionen der Schweiz.</p>
      
      <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <h3 style="margin-top: 0;">🎁 Ihr Startguthaben</h3>
        <p style="font-size: 24px; font-weight: bold; color: #dc2626; margin: 10px 0;">50 Credits geschenkt!</p>
        <p style="margin-bottom: 0; color: #64748b;">Damit können Sie ca. 15-17 Produkte in alle Sprachen übersetzen.</p>
      </div>
      
      <h3>So starten Sie in 3 Schritten:</h3>
      <ol style="line-height: 1.8;">
        <li><strong>CSV exportieren</strong> – Laden Sie Ihre Produkte aus Ihrem Shop-System herunter</li>
        <li><strong>Hochladen & übersetzen</strong> – Wählen Sie die Branche und Tonalität für beste Ergebnisse</li>
        <li><strong>CSV importieren</strong> – Laden Sie die übersetzten Produkte in Ihren Shop</li>
      </ol>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://translateshop.ch/dashboard" style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
          Jetzt loslegen →
        </a>
      </div>
      
      <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0;">
        <strong>💡 Tipp:</strong> Wählen Sie unter "Übersetzungs-Einstellungen" Ihre Branche und ob Sie Kunden duzen oder siezen. Das verbessert die Übersetzungsqualität deutlich!
      </div>
      
      <p>Bei Fragen antworten Sie einfach auf diese E-Mail.</p>
      
      <p>Viel Erfolg!<br>Ihr TranslateShop-Team 🇨🇭</p>
      
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
      
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">
        TranslateShop.ch – KI-Übersetzungen für Schweizer Online-Shops<br>
        <a href="https://translateshop.ch/datenschutz" style="color: #94a3b8;">Datenschutz</a> · 
        <a href="https://translateshop.ch/impressum" style="color: #94a3b8;">Impressum</a>
      </p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
    text: `Willkommen bei TranslateShop.ch! Sie haben 50 Credits geschenkt bekommen. Starten Sie jetzt: https://translateshop.ch/dashboard`,
  });
}

// Reminder email for users who haven't uploaded yet (for future use)
export async function sendReminderEmail(user: {
  email: string;
  companyName?: string;
}) {
  const subject = 'Ihre 50 Gratis-Credits warten! 🎁';
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #1e293b;">🌐 TranslateShop<span style="color: #dc2626;">.ch</span></h1>
      </div>
      
      <h2>Hallo${user.companyName ? ` ${user.companyName}` : ''}! 👋</h2>
      
      <p>Sie haben sich vor ein paar Tagen bei TranslateShop registriert, aber noch keine Produkte übersetzt.</p>
      
      <p><strong>Ihre 50 Gratis-Credits warten auf Sie!</strong></p>
      
      <p>Damit können Sie ca. 15-17 Produkte in Deutsch, Französisch, Italienisch und Englisch übersetzen – und so 60% mehr Schweizer Kunden erreichen.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://translateshop.ch/dashboard" style="background: #dc2626; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
          Jetzt erste Produkte übersetzen →
        </a>
      </div>
      
      <p>Brauchen Sie Hilfe beim Export aus Ihrem Shop-System? Antworten Sie einfach auf diese E-Mail!</p>
      
      <p>Beste Grüsse<br>Ihr TranslateShop-Team 🇨🇭</p>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
}
