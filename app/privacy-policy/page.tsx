export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to MovieFlix. We respect your privacy and are committed to protecting your personal data. This
            privacy policy will inform you about how we look after your personal data when you visit our website and
            tell you about your privacy rights and how the law protects you.
          </p>
          <p>
            This privacy policy aims to give you information on how MovieFlix collects and processes your personal data
            through your use of this website, including any data you may provide through this website when you sign up
            for an account, subscribe to our service, or use our streaming features.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. The Data We Collect About You</h2>
          <p className="mb-4">
            Personal data, or personal information, means any information about an individual from which that person can
            be identified. It does not include data where the identity has been removed (anonymous data).
          </p>
          <p className="mb-4">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped
            together as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
            </li>
            <li>
              <strong>Contact Data</strong> includes email address and telephone numbers.
            </li>
            <li>
              <strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and
              version, time zone setting and location, browser plug-in types and versions, operating system and
              platform, and other technology on the devices you use to access this website.
            </li>
            <li>
              <strong>Profile Data</strong> includes your username and password, your interests, preferences, feedback
              and survey responses.
            </li>
            <li>
              <strong>Usage Data</strong> includes information about how you use our website, products and services,
              including viewing history.
            </li>
            <li>
              <strong>Marketing and Communications Data</strong> includes your preferences in receiving marketing from
              us and our third parties and your communication preferences.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Personal Data</h2>
          <p className="mb-4">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
            in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>
              Where it is necessary for our legitimate interests (or those of a third party) and your interests and
              fundamental rights do not override those interests.
            </li>
            <li>Where we need to comply with a legal obligation.</li>
          </ul>
          <p className="mt-4">
            Generally, we do not rely on consent as a legal basis for processing your personal data although we will get
            your consent before sending third party direct marketing communications to you via email or text message.
            You have the right to withdraw consent to marketing at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
          <p className="mb-4">
            We have put in place appropriate security measures to prevent your personal data from being accidentally
            lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your
            personal data to those employees, agents, contractors and other third parties who have a business need to
            know. They will only process your personal data on our instructions and they are subject to a duty of
            confidentiality.
          </p>
          <p>
            We have put in place procedures to deal with any suspected personal data breach and will notify you and any
            applicable regulator of a breach where we are legally required to do so.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Legal Rights</h2>
          <p className="mb-4">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data,
            including the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Request access</strong> to your personal data.
            </li>
            <li>
              <strong>Request correction</strong> of your personal data.
            </li>
            <li>
              <strong>Request erasure</strong> of your personal data.
            </li>
            <li>
              <strong>Object to processing</strong> of your personal data.
            </li>
            <li>
              <strong>Request restriction of processing</strong> your personal data.
            </li>
            <li>
              <strong>Request transfer</strong> of your personal data.
            </li>
            <li>
              <strong>Right to withdraw consent</strong>.
            </li>
          </ul>
          <p className="mt-4">If you wish to exercise any of the rights set out above, please contact us.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Changes to the Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new
            privacy policy on this page and updating the "last updated" date at the top of this privacy policy. You are
            advised to review this privacy policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
            <br />
            <a href="mailto:privacy@movieflix.com" className="text-primary hover:underline">
              privacy@movieflix.com
            </a>
          </p>
        </section>

        <div className="border-t pt-6 text-sm">
          <p>Last updated: March 13, 2025</p>
        </div>
      </div>
    </div>
  )
}

