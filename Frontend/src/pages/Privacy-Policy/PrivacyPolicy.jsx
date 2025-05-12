import React from 'react';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'information-collection', title: 'Information We Collect' },
  { id: 'information-use', title: 'How We Use Your Information' },
  { id: 'information-sharing', title: 'Information Sharing and Disclosure' },
  { id: 'cookies', title: 'Cookies and Similar Technologies' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'user-rights', title: 'Your Rights and Choices' },
  { id: 'international-transfers', title: 'International Data Transfers' },
  { id: 'children', title: "Children's Privacy" },
  { id: 'changes', title: 'Changes to This Privacy Policy' },
  { id: 'contact', title: 'Contact Us' }
];

const PrivacyHeader = ({ lastUpdated, version }) => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-50 mb-6">Privacy Policy</h1>
      <div className="bg-gray-100 border border-lightPrimary_grays_darker rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-footer_text_light mb-1">
            Last updated: <span className="font-medium text-gray-800">{lastUpdated}</span>
          </p>
          <p className="text-footer_text_light">
            Version: <span className="font-medium text-gray-800">{version}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* <button className="px-4 py-2 text-sm bg-white text-blackColor border border-lightPrimary_grays hover:bg-lightPrimary_grays_darker transition-colors mr-3">
            Download PDF
          </button>
          <button className="px-4 py-2 text-sm bg-white text-blackColor border border-lightPrimary_grays hover:bg-lightPrimary_grays_darker transition-colors">
            Print
          </button> */}
        </div>
      </div>
    </div>
  );
};

const PrivacySection = ({ id, title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-bold text-blackColor">{title}</h2>
        <button className="text-footer_text hover:text-primary transition-colors md:hidden">
          {isOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100'
      }`}>
        <div className="prose prose-gray max-w-none text-footer_text_light">
          {children}
        </div>
      </div>
    </section>
  );
};

const TableOfContents = ({ sections }) => {
  const [activeSection, setActiveSection] = React.useState('');
  const [isSticky, setIsSticky] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 250);
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`hidden lg:block ${isSticky ? 'sticky top-32 self-start transition-all duration-300' : ''}`}>
      <div className="bg-gray-50 rounded-lg p-6 border border-lightPrimary_grays w-64">
        <h3 className="text-lg font-semibold text-blackColor mb-4">Table of Contents</h3>
        <nav>
          <ul className="space-y-3">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full px-3 py-2 rounded-md transition-colors text-sm ${
                    activeSection === section.id
                      ? 'bg-primary bg-opacity-20  text-primary font-medium'
                      : 'text-footer_text hover:text-primary'
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <PrivacyHeader lastUpdated="May 15, 2025" version="1.2" />
        
        <div className="lg:flex lg:gap-12 relative">
          <div className="lg:flex-1">
            <PrivacySection id="introduction" title="Introduction">
              <p>
                Welcome to Filog ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our mobile application, or interact with our services.
              </p>
              <p>
                By accessing or using our service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
              </p>
            </PrivacySection>
            
            <PrivacySection id="information-collection" title="Information We Collect">
              <h3 className="text-blackColor font-semibold text-xl mb-4">Personal Information You Provide</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Register for an account</li>
                <li>Create or publish blog content</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact our support team</li>
                <li>Participate in surveys or promotions</li>
                <li>Comment on blog posts</li>
              </ul>
              
              <h3 className="text-blackColor font-semibold text-xl mb-4">Information Collected Automatically</h3>
              <p>
                When you access our services, we may automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-5">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Time zone and location</li>
                <li>Pages visited and time spent on pages</li>
                <li>Unique device identifiers</li>
              </ul>
            </PrivacySection>

            <PrivacySection id="information-use" title="How We Use Your Information">
              <p>We use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process and fulfill your requests</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Respond to your comments and questions</li>
                <li>Provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Protect against harmful or illegal activity</li>
              </ul>
            </PrivacySection>
            
            <PrivacySection id="information-sharing" title="Information Sharing and Disclosure">
              <p>We may share your information in the following circumstances:</p>
              
              <h3>With Service Providers</h3>
              <p>
                We may share your information with third-party vendors, service providers, and contractors who perform services on our behalf, such as hosting providers, analytics companies, and email service providers.
              </p>
              
              <h3>For Legal Reasons</h3>
              <p>
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
              </p>
              
              <h3>Business Transfers</h3>
              <p>
                If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
              </p>
              
              <h3>With Your Consent</h3>
              <p>
                We may share your information with third parties when you have given us your consent to do so.
              </p>
            </PrivacySection>
            
            <PrivacySection id="cookies" title="Cookies and Similar Technologies">
              <p>
                We use cookies and similar tracking technologies to collect and use information about you and your interaction with our services. Cookies are small data files that are placed on your device when you visit a website, which allow us to collect information about your device identifiers, IP address, web browsers used to access the services, pages or features viewed, time spent on pages, and how you interact with our services.
              </p>
              
              <p>We use the following types of cookies:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Necessary for the basic functionality of our website.</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
                <li><strong>Preference Cookies:</strong> Enable our website to remember your preferences and settings.</li>
                <li><strong>Marketing Cookies:</strong> Used to track visitors across websites to display relevant advertisements.</li>
              </ul>
              
              <p>
                You can manage cookie preferences through your browser settings. Please note that removing or blocking certain cookies may impact your experience on our website.
              </p>
            </PrivacySection>
            
            <PrivacySection id="data-security" title="Data Security">
              <p>
                We have implemented appropriate technical and organizational measures designed to protect the security of any personal information we process. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
              
              <p>
                We maintain security safeguards that include:
              </p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection and security practices</li>
                <li>Regular reviews of our information collection, storage, and processing practices</li>
              </ul>
            </PrivacySection>
            
            <PrivacySection id="user-rights" title="Your Rights and Choices">
              <p>Depending on your location, you may have certain rights regarding your personal information:</p>
              
              <ul>
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Rectification:</strong> You can ask us to correct or update inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> You can ask us to delete your personal information in certain circumstances.</li>
                <li><strong>Restriction:</strong> You can ask us to limit how we use your personal information.</li>
                <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
                <li><strong>Objection:</strong> You can object to our processing of your personal information in certain circumstances.</li>
              </ul>
              
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </PrivacySection>
            
            <PrivacySection id="international-transfers" title="International Data Transfers">
              <p>
                Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
              </p>
              
              <p>
                When we transfer your information to other countries, we will take appropriate measures to ensure that your personal information remains protected in accordance with this Privacy Policy and applicable law.
              </p>
            </PrivacySection>
            
            <PrivacySection id="children" title="Children's Privacy">
              <p>
                Our services are not directed to children under the age of 16, and we do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will take steps to delete such information.
              </p>
            </PrivacySection>
            
            <PrivacySection id="changes" title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
              </p>
            </PrivacySection>
    
            <PrivacySection id="contact" title="Contact Us">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              
              <p className="my-4">
                Email: filogteam@gmail.com<br />
              </p>
              
              <div className="mt-8 p-6 bg-primary bg-opacity-10 rounded-lg border border-primary border-opacity-20">
                <h3 className="text-lg font-semibold text-primary mb-3">Need More Help?</h3>
                <p className="text-footer_text_light mb-4">
                  Our privacy team is dedicated to addressing your concerns and ensuring your data is protected.
                </p>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary_darkMode transition-colors">
                  Contact Privacy Team
                </button>
              </div>
            </PrivacySection>
          </div>
          
          <TableOfContents sections={sections} />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;