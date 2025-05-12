import React from 'react';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'eligibility', title: 'Eligibility' },
  { id: 'account', title: 'Account Registration' },
  { id: 'content', title: 'User Content' },
  { id: 'restrictions', title: 'Prohibited Activities' },
  { id: 'intellectual-property', title: 'Intellectual Property Rights' },
  { id: 'termination', title: 'Termination' },
  { id: 'disclaimer', title: 'Disclaimers' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'disputes', title: 'Dispute Resolution' }
];

const TermsHeader = ({ lastUpdated, version }) => {
  return (
    <div className="mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-50 mb-6">Terms of Service</h1>
      <div className="bg-gray-100 dark:bg-darkPrimary_grays dark:border-darkPrimary border border-lightPrimary_grays_darker rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-footer_text_light dark:text-gray-400 mb-1">
            Last updated: <span className="font-medium dark:text-gray-300 text-gray-800">{lastUpdated}</span>
          </p>
          <p className="text-footer_text_light dark:text-gray-400">
            Version: <span className="font-medium text-gray-800 dark:text-gray-300">{version}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          {/* <button className="px-4 py-2 text-sm bg-white text-gray-800 border border-lightPrimary_grays hover:bg-lightPrimary_grays_darker transition-colors mr-3">
            Download PDF
          </button>
          <button className="px-4 py-2 text-sm bg-white text-gray-800 border border-lightPrimary_grays hover:bg-lightPrimary_grays_darker transition-colors">
            Print
          </button> */}
        </div>
      </div>
    </div>
  );
};

const TermsSection = ({ id, title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <div 
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
        <button className="text-footer_text hover:text-primary transition-colors md:hidden">
          {isOpen ? '▼' : '▲'}
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[1000px] md:opacity-100'
      }`}>
        <div className="prose prose-gray max-w-none text-footer_text_light dark:text-gray-400">
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
      <div className="bg-gray-50 dark:bg-darkPrimary_grays rounded-lg p-6 border border-lightPrimary_grays dark:border-darkPrimary_grays w-64">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Table of Contents</h3>
        <nav>
          <ul className="space-y-3">
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left w-full px-3 py-2 rounded-md transition-colors text-sm ${
                    activeSection === section.id
                      ? 'bg-primary bg-opacity-20 text-primary dark:text-primary_darkMode font-medium'
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

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <TermsHeader lastUpdated="May 15, 2025" version="1.2" />
        
        <div className="lg:flex lg:gap-12 relative">
          <div className="lg:flex-1">
            <TermsSection id="acceptance" title="Acceptance of Terms">
              <p className="text-gray-800 dark:text-gray-50">
                Welcome to Filog. By accessing or using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
              </p>
            </TermsSection>
            
            <TermsSection id="changes" title="Changes to Terms">
              <p className="text-gray-800 dark:text-gray-50">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any changes by updating the "Last Updated" date at the top of these Terms.
              </p>
              <p className="text-gray-800 dark:text-gray-50">
                Your continued use of our services following the posting of any changes constitutes acceptance of those changes.
              </p>
            </TermsSection>
            
            <TermsSection id="eligibility" title="Eligibility">
              <p>
                You must be at least 16 years old to use our services. By agreeing to these Terms, you represent and warrant that:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>You are at least 16 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You are not barred from using our services under any applicable law</li>
                <li>You will comply with these Terms and all applicable laws and regulations</li>
              </ul>
            </TermsSection>
            
            <TermsSection id="account" title="Account Registration">
              <p>
                To access certain features of our services, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-5 mb-6">
                <li>Provide accurate and complete information</li>
                <li>Maintain and update your information</li>
                <li>Keep your account credentials secure</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p>
                You are responsible for all activities that occur under your account.
              </p>
            </TermsSection>

            <TermsSection id="content" title="User Content">
              <h3 className="text-800 dark:text-gray-100 font-semibold text-xl mb-4">Content Ownership</h3>
              <p>
                You retain ownership of any content you post on our platform. However, by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display your content.
              </p>
              
              <h3 className="text-800 dark:text-gray-100 font-semibold text-xl mb-4 mt-6">Content Guidelines</h3>
              <p>
                All content must comply with our content guidelines and:
              </p>
              <ul className="list-disc pl-5">
                <li>Be accurate and original</li>
                <li>Respect intellectual property rights</li>
                <li>Not be harmful or offensive</li>
                <li>Not contain malicious code or spam</li>
              </ul>
            </TermsSection>

            <TermsSection id="disputes" title="Dispute Resolution">
              <p>
                If you have any concerns or disputes about our services, please contact us first:
              </p>
              
              <p className="my-4">
                <strong className="text-800 dark:text-gray-100">Filog Legal Team</strong><br />
                Email: filogteam@gmail.com<br />
              </p>
              
              
            </TermsSection>
          </div>
          
          <TableOfContents sections={sections} />
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;