import React from "react";
import "./termsofservice.css";

const TermsOfService = () => {
  return (
    <div className="terms-container">
      <h1>Terms of Service</h1>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Soltra, you agree to be bound by these Terms of Service. 
          If you do not agree to all terms, do not use the website.
        </p>
      </section>

      <section>
        <h2>2. User Accounts</h2>
        <p>
          You must provide accurate and complete information when creating an account.
          You are responsible for maintaining the confidentiality of your login credentials.
        </p>
      </section>

      <section>
        <h2>3. Use of the Service</h2>
        <p>
          You agree not to misuse the service or help anyone else do so. This includes but is not limited to:
        </p>
        <ul>
          <li>Attempting unauthorized access</li>
          <li>Disrupting or compromising the integrity of the platform</li>
          <li>Violating applicable laws</li>
        </ul>
      </section>

      <section>
        <h2>4. Purchases and Payments</h2>
        <p>
          All purchases are subject to our pricing and refund policy. Soltra is not responsible for payment processing errors caused by third-party services.
        </p>
      </section>

      <section>
        <h2>5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate accounts that violate our terms, without prior notice.
        </p>
      </section>

      <section>
        <h2>6. Changes to Terms</h2>
        <p>
          We may update these Terms of Service from time to time. Continued use of Soltra constitutes acceptance of any revised terms.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>
          If you have any questions, feel free to contact our support team at support@soltra.com.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;