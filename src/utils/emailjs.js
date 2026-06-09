import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function sendContactEmail({ name, phone, subject, message, email }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      email_subject: `New Contact Message from ${name} — ${subject}`,
      email_body: `New contact form submission on AgroCare website.

Name: ${name}
Phone: ${phone}  
Subject: ${subject}

Message:
${message}

---
Reply to this email to respond to customer.`,
      reply_to: email || phone,
      from_name: name,
    },
    PUBLIC_KEY
  );
}

export function sendEnquiryEmail({ name, phone, subject, message, email, category }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      email_subject: `New Enquiry — ${subject} from ${name}`,
      email_body: `New product enquiry on AgroCare website.

Name: ${name}
Phone: ${phone}
Subject: ${subject}
Category: ${category}

Message:
${message}

---
WhatsApp customer: https://wa.me/${phone}`,
      reply_to: email || phone,
      from_name: name,
    },
    PUBLIC_KEY
  );
}

export function sendComplaintEmail({ name, phone, subject, message, email }) {
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      email_subject: `⚠️ COMPLAINT — ${subject} from ${name}`,
      email_body: `COMPLAINT submitted on AgroCare website.

Name: ${name}
Phone: ${phone}
Subject: ${subject}

Complaint:
${message}

---
PLEASE RESPOND WITHIN 48 HOURS.
WhatsApp customer: https://wa.me/${phone}`,
      reply_to: email || phone,
      from_name: name,
    },
    PUBLIC_KEY
  );
}
