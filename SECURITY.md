# Security Policy

## Project: MindForge — Online Tutor Booking Platform

MindForge is committed to ensuring the security and privacy of its users, including students, tutors, and administrators. We value the contributions of security researchers and community members in helping us improve our platform.

---

## Supported Versions

We actively maintain and support the latest production version of MindForge.

| Version         | Supported          |
|----------------|--------------------|
| `main` (latest) | ✅ Yes             |
| older releases  | ❌ No              |

---

## Reporting a Vulnerability

If you discover a security vulnerability in MindForge:

- **Please DO NOT create a public issue.**
- Email us directly at **studyatmindforge@gmail.com** with the following:
  - Description of the vulnerability
  - Steps to reproduce
  - Impact assessment
  - Suggested fix (if possible)

We will respond within **3 business days** and aim to resolve verified vulnerabilities within **7–14 business days** depending on severity.

---

## Responsible Disclosure Guidelines

We request that you:

- Give us a reasonable time to investigate and patch the issue before disclosing it publicly.
- Avoid accessing or modifying data belonging to other users.
- Avoid actions that could degrade the MindForge platform or compromise user privacy during your testing.

---

## Security Measures Implemented

- **Authentication**: Firebase Authentication (Google sign-in, role-based access).
- **Database**: MongoDB Atlas secured with IP whitelisting and access control.
- **HTTPS**: All web traffic is encrypted via SSL/TLS.
- **Input Validation**: Sanitization on both frontend and backend to prevent injection attacks.
- **Payment Security**: Stripe is used for secure payments; no sensitive card data is stored on our servers.
- **Environment Variables**: Secrets (e.g., API keys, DB URIs) are stored in `.env` files and never committed to the repo.
- **Regular Audits**: Dependencies and configurations are reviewed periodically for known vulnerabilities.

---

## Tools & Libraries Used

- [Firebase Authentication](https://firebase.google.com/products/auth)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Stripe Payments](https://stripe.com/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [Vercel](https://vercel.com/) / [Render](https://render.com/) (for deployment)

---

## Acknowledgements

We welcome and appreciate responsible security disclosures that help protect our users. Thank you for contributing to a safer online education experience.

— MindForge Team
