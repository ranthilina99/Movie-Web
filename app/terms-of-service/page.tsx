export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to MovieFlix. These terms and conditions outline the rules and regulations for the use of
            MovieFlix's Website and Services.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
            MovieFlix's website if you do not accept all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. License to Use</h2>
          <p className="mb-4">
            Unless otherwise stated, MovieFlix and/or its licensors own the intellectual property rights for all
            material on MovieFlix. All intellectual property rights are reserved. You may view and/or print pages from
            the website for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>Redistribute content from MovieFlix (unless content is specifically made for redistribution)</li>
            <li>
              Use this website to copy, store, host, transmit, send, use, publish or distribute any material which
              consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit
              or other malicious computer software
            </li>
            <li>
              Conduct any systematic or automated data collection activities on or in relation to this website without
              MovieFlix's express written consent
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Subscription and Payments</h2>
          <p className="mb-4">
            Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring
            and periodic basis (such as monthly or annually), depending on the type of subscription plan you select when
            purchasing the subscription.
          </p>
          <p className="mb-4">
            At the end of each period, your subscription will automatically renew under the exact same conditions unless
            you cancel it or MovieFlix cancels it. You may cancel your subscription either through your online account
            management page or by contacting MovieFlix customer support team.
          </p>
          <p>
            A valid payment method, including credit card, is required to process the payment for your subscription. You
            shall provide MovieFlix with accurate and complete billing information including full name, address, state,
            zip code, telephone number, and valid payment method information. By submitting such payment information,
            you automatically authorize MovieFlix to charge all subscription fees incurred through your account to any
            such payment instruments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you guarantee that the information you provide us is accurate, complete,
            and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate
            termination of your account on the service.
          </p>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account and password, including but not
            limited to the restriction of access to your computer and/or account. You agree to accept responsibility for
            any and all activities or actions that occur under your account and/or password, whether your password is
            with our service or a third-party service. You must notify us immediately upon becoming aware of any breach
            of security or unauthorized use of your account.
          </p>
          <p>
            We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our
            sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Content Usage and Restrictions</h2>
          <p className="mb-4">
            Our service allows you to stream movies, TV shows, and other content ("Content"). The Content is owned by
            MovieFlix or its licensors and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-4">
            You are granted a limited, non-exclusive, non-transferable license to access and view the Content for your
            personal, non-commercial use solely in connection with your use of the service. You agree not to download,
            copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any Content
            for any other purpose without the prior written consent of MovieFlix or the respective licensors of the
            Content.
          </p>
          <p>
            MovieFlix reserves the right to terminate or restrict your access to the service if you violate these Terms
            or are engaged in illegal or fraudulent use of the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            In no event shall MovieFlix, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access
            to or use of or inability to access or use the service; (ii) any conduct or content of any third party on
            the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of
            your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other
            legal theory, whether or not we have been informed of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion. By continuing to access or use our service after
            any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new
            terms, you are no longer authorized to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            <a href="mailto:legal@movieflix.com" className="text-primary hover:underline">
              legal@movieflix.com
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

