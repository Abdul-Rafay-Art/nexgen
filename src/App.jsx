import { useEffect, useRef, useState } from 'react';
import catalogProducts from './catalogProducts.json';

const logo = 'https://nexxgenhome.com/wp-content/uploads/2022/02/cropped-NEXXGEN-LOGO-V-RGB_site_logo.png';

const BASE = import.meta.env.BASE_URL;

function toBase(path) {
  return path === '/' ? BASE : BASE.replace(/\/$/, '') + path;
}

function fromBase(pathname) {
  const prefix = BASE.replace(/\/$/, '');
  if (!pathname.startsWith(prefix)) return pathname;
  const path = pathname.slice(prefix.length);
  return path === '' || path === '/' ? '/' : path;
}

function navigate(path) {
  window.history.pushState({}, '', toBase(path));
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function Link({ href, children, className = '' }) {
  const internal = href.startsWith('/');
  return <a className={className} href={internal ? toBase(href) : href} onClick={internal ? (event) => { event.preventDefault(); navigate(href); } : undefined}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const currentPath = fromBase(window.location.pathname);
  const itemClass = (path) => currentPath === path ? 'active' : '';
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => { if (!event.target || !event.target.closest || !event.target.closest('.site-header')) setOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return <header className={`site-header ${open ? 'menu-open' : ''}`}><div className="container nav-wrap">
    <Link className="brand" href="/"><img src={logo} alt="A&A NexxGen" /></Link>
    <button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
     <nav className={`main-nav ${open ? 'open' : ''}`} onClick={(event) => { if (event.target.closest('a')) setOpen(false); }}>
         <Link className={itemClass('/')} href="/">Home</Link><Link className={itemClass('/about')} href="/about">About</Link><Link className={itemClass('/services')} href="/services">Services</Link><Link className={itemClass('/products')} href="/products">Products</Link><Link className={itemClass('/join-us')} href="/join-us">Careers</Link>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="brand" href="/"><img src={logo} alt="A&A NexxGen" /></Link><p>The next generation of global sourcing.</p></div><div><p className="footer-label">Explore</p><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/products">Products</Link><Link href="/join-us">Careers</Link></div><div><p className="footer-label">Get in touch</p><a href="mailto:sales@ananexxgen.com">sales@ananexxgen.com</a><a href="tel:+17324292328">1-732-429-2328</a><span>New Jersey, USA</span></div></div><div className="container copyright">© 2026 A&amp;A NexxGen <span>Built for better sourcing.</span></div></footer>;
}

const Button = ({ href = 'mailto:sales@ananexxgen.com', children, className = 'button-dark' }) => <Link className={`button ${className}`} href={href}>{children} <span>↗</span></Link>;
const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;
const Process = () => <div className="process-grid"><div><span>01</span><h3>Discover</h3><p>We understand your product, market and commercial goals.</p></div><div><span>02</span><h3>Define</h3><p>We identify the right suppliers, specifications and path forward.</p></div><div><span>03</span><h3>Deliver</h3><p>We manage quality, logistics and communication through delivery.</p></div></div>;
const categories = [['card-house', 'Housewares'], ['card-garden', 'Garden furniture'], ['card-plastic', 'Plastic & general merchandise'], ['card-seasonal', 'Seasonal Product']];

const imageOverrides = {
  'WHITE TENT 8"X8" TOP, 10"X10" BOTTOM': 'image115.png',
  'BLUE TENT 8"X8" TOP, 10"X10" BOTTOM': 'image116.png',
  'GREEN TENT 8"X8" TOP, 10"X10" BOTTOM': 'image117.png',
  '12 " RECHARGEABLE FAN': 'image144.png',
  '12\'\' TABLE FAN- 1': 'image143.png',
  '16 " RECHARGEABLE STAND FAN': 'image146.png',
  '16" STAND FAN - 1': 'image149.jpeg',
  '18\'\' STAND FAN- 1': 'image149.jpeg',
  'ALCOHOL - Variant 5': 'image196.jpeg',
  '20" BOX FAN - 1': 'image154.png',
  '9" WINDOW FAN DOUBLE- 1': 'image155.png',
  '32" TOWER FAN- 1': 'image144.png',
  '18" INDUSTRIAL STAND FAN (COPPER)': 'image156.png',
  '18" INDUSTRIAL WALL FAN (COPPER)': 'image161.png',
  '1LBS EPSOM SALT - Variant 2': 'image176.png',
};

const planterImages = ['image307.png', 'image308.png', 'image309.png', 'image314.jpeg', 'image315.png', 'image326.png', 'image346.jpeg', 'image348.jpeg'];
const towelImages = ['image352.png', 'image353.png', 'image355.png', 'image370.png', 'image372.png', 'image375.png', 'image377.png', 'image378.png', 'image379.png', 'image380.jpeg', 'image383.png', 'image386.png', 'image414.jpeg', 'image418.jpeg'];
const broomImages = ['image225.png', 'image226.png', 'image227.png'];
const mopImages = ['image215.png', 'image216.jpeg', 'image217.jpeg'];
let planterImageIndex = 0;
let towelImageIndex = 0;
let broomImageIndex = 0;
let mopImageIndex = 0;

const normalizedCatalogProducts = catalogProducts.map((product) => {
  const name = product.name.trim().replace(/\s+/g, ' ');
  let category = product.category;
  if (/bar mop/i.test(name)) category = 'Bar Mops';
  else if (/\bmop\b/i.test(name)) category = 'Mops';
  else if (/kitchen towel|dish cloth/i.test(name)) category = 'Kitchen Towel';
  else if (/wash cloth|hand towel/i.test(name)) category = 'Wash Cloths';
  else if (/bath towel/i.test(name)) category = 'Bath Towels';
  else if (/planter/i.test(name)) category = 'Planters';
  let image = category === 'Rubbing Alcohol' ? 'image196.jpeg' : imageOverrides[name] || product.image;
  if (category === 'Planters') image = planterImages[planterImageIndex++ % planterImages.length];
  if (category === 'Bath Towels' || category === 'Wash Cloths' || category === 'Kitchen Towel') image = towelImages[towelImageIndex++ % towelImages.length];
  if (category === 'Brooms') image = broomImages[broomImageIndex++ % broomImages.length];
  if (category === 'Mops') image = mopImages[mopImageIndex++ % mopImages.length];
  return {
    ...product,
    name,
    category,
    details: product.details?.trim() || 'Specifications available on request.',
    image,
  };
});

const CategoryCards = ({ all = false }) => <><div className="category-grid">{(all ? [...categories, ['card-house', 'Seasonal products'], ['card-garden', 'General merchandise'], ['card-plastic', 'Medical supplies']] : categories).map(([image, title], index) => <Link className={`category-card ${image}`} href={image === 'card-seasonal' ? '/seasonal-products' : '/products'} key={title}><span>0{index + 1}</span><h3>{title}</h3><b>{all ? 'Discuss your needs' : 'Explore'} <i>↗</i></b></Link>)}</div><section className="home-vision-mission"><div className="container"><div className="home-vision-cards"><article><h2>Our Vision</h2><div className="home-section-rule" /><p>To make global sourcing simpler, more accessible, and more innovative for businesses worldwide.</p><span>✧</span></article><article><h2>Our Mission</h2><div className="home-section-rule" /><p>To connect businesses with reliable suppliers, quality products, and personal support from sourcing to delivery.</p><span>✧</span></article></div></div></section></>;

function Home() {
  return <><div className="scroll-stage"><section className="hero"><div className="container hero-grid"><div className="hero-copy"><Eyebrow>Global sourcing, made personal</Eyebrow><h1>Better products.<br /><em>Better possibilities.</em></h1><p className="lead">We connect ambitious businesses with quality products, trusted suppliers and a simpler path from idea to delivery.</p><div className="actions"><Button>Start a project</Button><Link className="text-link" href="/about">Discover NexxGen <span>↗</span></Link></div><div className="hero-note"><strong>15+</strong><span>years of experience<br />in global sourcing</span></div></div><div className="hero-visual"><div className="hero-image" /><div className="floating-card"><span className="card-icon">✦</span><strong>From concept<br />to container</strong><small>One partner. Every step.</small></div></div></div></section><section className="intro section-pad"><div className="container intro-grid intro-feature"><Eyebrow>What we do</Eyebrow><div className="intro-copy"><h2>Global sourcing without the usual complexity.</h2><p>From supplier research and product development to quality assurance and shipping, A&amp;A NexxGen gives you personal support at every stage.</p><Link className="text-link" href="/services">Explore our services <span>↗</span></Link></div><figure className="intro-image"><img src="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Workers organizing products in a modern warehouse" /><figcaption>From factory floor to final delivery</figcaption></figure></div></section></div><section className="category-section section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Our capabilities</Eyebrow><h2>Products with room to grow.</h2></div><Button href="/products" className="button-outline">View products</Button></div><CategoryCards /></div></section><section className="process section-pad"><div className="container"><Eyebrow>The NexxGen way</Eyebrow><h2>Simple by design.<br />Strong by execution.</h2><Process /></div></section><Cta /></>;
}

const seasonalImages = ['image1.jpeg','image10.jpeg','image11.jpeg','image12.jpeg','image13.jpeg','image14.jpeg','image15.jpeg','image16.jpeg','image17.jpeg','image18.jpeg','image19.jpeg','image2.jpeg','image20.jpeg','image21.jpeg','image22.jpeg','image23.jpeg','image24.jpeg','image25.jpeg','image26.jpeg','image27.jpeg','image28.png','image29.jpeg','image3.jpeg','image30.jpeg','image31.jpeg','image32.jpeg','image33.jpeg','image34.jpeg','image35.jpeg','image36.jpeg','image37.jpeg','image38.jpeg','image39.jpeg','image4.png','image40.jpeg','image41.png','image42.png','image43.jpeg','image44.jpeg','image45.jpeg','image46.jpeg','image47.jpeg','image48.jpeg','image49.jpeg','image5.jpeg','image50.jpeg','image53.jpeg','image6.jpeg','image61.jpeg','image64.jpeg','image67.jpeg','image7.jpeg','image70.jpeg','image73.jpeg','image76.jpeg','image8.jpeg','image9.jpeg'];

function SeasonalProducts() {
  return <section className="seasonal-page section-pad"><div className="container"><div className="seasonal-heading"><Eyebrow>Seasonal collection</Eyebrow><h1>Seasonal Product</h1></div><div className="seasonal-gallery">{seasonalImages.map((image) => <img key={image} src={`${BASE}seasonal-options/${image}`} alt="Seasonal product" loading="lazy" />)}</div></div></section>;
}

function InnerHero({ eyebrow, children, text, style, className = '' }) { return <section className={`hero inner-hero ${className}`} style={style}><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{children}</h1><p className="lead">{text}</p></div></section>; }
function Cta() { return <section className="cta-band"><div className="container cta-content"><div><Eyebrow>Let’s make something work</Eyebrow><h2>Have a product in mind?</h2></div><Button className="button-light">Tell us about it</Button></div></section>; }

const whyChoosePoints = [
  "Our core function is to identify qualified suppliers, based on the client's needs and technical requirements.",
  'We focus on sustainable product offerings.',
  'We have existing sourcing and production presence in key low-cost and duty-free countries around the globe.',
  'We provide highly competitive product prices and service fees.',
  'We work to get clients the best price for whatever product they need and meet quality standards.',
  'We ensure the factory or supplier can produce and deliver the product in a timely manner. We have knowledge of multiple languages, as well as local business customs and norms. We can manage multiple projects at one time.',
  'We create long-term, stable, and valuable relationships with supplier and clients.',
  'We assess the needs of our clients and find factories and suppliers that can best meet their needs, ultimately resulting in a purchase order.',
  'We can help with factory audits, quality inspections, contracts management, quality assurance, and day-to-day administration.',
];
function About() { return <><div className="about-scroll-stage"><InnerHero eyebrow="Who we are" text="A&A NexxGen is a family-owned sourcing partner helping businesses find the right products, people and possibilities around the world.">Personal attention.<br /><em>Global reach.</em></InnerHero><section className="section-pad about-feature"><div className="container about-feature-grid"><Eyebrow>Why NexxGen</Eyebrow><div className="about-feature-copy"><h2>Relationships, not transactions.</h2><p>We put our experience and network behind every order, no matter the size. Our team works with qualified suppliers across key sourcing markets and stays close to your project from the first conversation to final delivery.</p><p>We help clients build better product mixes, manage quality and create long-term supply relationships.</p><Button>Work with us</Button></div></div></section></div><section className="about-copy-page section-pad"><div className="container"><h1>About us</h1><div className="about-copy-rule" /><div className="about-copy-text"><p>We are A &amp; A NexxGen and we are here to help you source the highest quality products for the best possible price from around the globe. We have over 15 years of experience in global sourcing and we believe in putting our 100% behind every order for every client, no matter the size. We are in the business of long-term, mutually beneficial relationships, not just sourcing products.</p><p>We are a family owned firm, committed to providing our clients the best services in the market. We are a small firm, but we have worked extremely hard to establish a strong network of vendors from across the globe, and we provide our clients personalized support.</p><p>A &amp; A makes sure that we do our homework for every single order and ethically source the highest quality products. But we do not just stop at that, we want to help your business grow and we are here to help you identify the hottest items on the market for your business. We will provide you consultation on your product mix and pricing structure to help your business benefit on an ongoing basis from a relationship with us.</p><p>We have a wide range of products and services available. Please feel free to contact us for more details or browse through our website for further insight.</p></div></div></section><section className="about-why section-pad"><div className="container about-why-grid"><div className="about-why-image"><img src={`${BASE}12.jpg`} alt="A&A NexxGen sourcing team collaborating" /></div><div className="about-why-copy"><h2>Why Choose A &amp; A NexxGen?</h2><div className="about-copy-rule" /><ul>{whyChoosePoints.map((point) => <li key={point}>{point}</li>)}</ul></div></div></section></>; }

const services = ['Comprehensive sourcing', 'Product consultancy', 'Private labeling', 'Quality assurance', 'Risk management', 'Logistics'];
const serviceImages = [
  ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85', 'Organized shipping cartons in a warehouse'],
  ['https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85', 'Team discussing a product plan'],
  ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85', 'Branded products ready for customers'],
  ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=85', 'Quality specialist working at a production line'],
  ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=85', 'Documents and planning for supplier risk'],
  ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=85', 'Shipping containers at a busy port'],
];
function Services() { return <><div className="scroll-stage"><InnerHero eyebrow="How we help" className="services-hero" text="From supplier research to shipping, we make sourcing easier to manage and easier to trust.">One partner for<br /><em>every moving part.</em></InnerHero><section className="section-pad"><div className="container"><Eyebrow>Our services</Eyebrow><div className="process-grid service-grid">{services.map((service, index) => <div className="service-card" key={service}><img src={serviceImages[index][0]} alt={serviceImages[index][1]} loading="lazy" /><span>0{index + 1}</span><h3>{service}</h3><p>{['Find qualified suppliers and products that match your requirements.','Improve your product mix, pricing structure and market opportunity.','Develop your own brand through product, packaging and artwork support.','Supplier verification, factory audits, inspections and quality control.','Reduce surprises with documentation, supplier checks and project management.','Container supervision, consolidation, shipping and delivery support.'][index]}</p></div>)}</div></div></section></div><Cta /></>; }
function Products() {
  const filterCategories = [...new Set(normalizedCatalogProducts.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState(filterCategories[0]);
  const visibleProducts = normalizedCatalogProducts.filter((product) => product.category === activeCategory);
  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(240,243,231,.94) 0%,rgba(240,243,231,.82) 45%,rgba(240,243,231,.45) 100%), url(${BASE}tr.png)`, backgroundPosition: 'center,center', backgroundSize: 'auto,cover', backgroundRepeat: 'no-repeat,no-repeat' }}><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{catalogProducts.length}</strong> unique products</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters">{filterCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <a className="catalog-product-card" href={`${BASE}catalog-2022-products/${product.image}`} target="_blank" rel="noreferrer" key={`${product.name}-${product.details}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.details || 'Original catalog product specification.'}</span><b>Open product image <i>↗</i></b></div></a>)}</div></div></section></div><Cta /></>;
}
const fpAndADetails = {
  experience: '3–5 years in financial analysis',
  description: 'A&A Nexxgen is a family-owned wholesale distributor of general merchandise headquartered in Piscataway, New Jersey. For more than 15 years, we have helped retailers and wholesalers source quality products from around the globe at the best possible price. This role supports planning, pricing, profitability and financial decision-making across the business.',
  requirements: ["Bachelor's degree in Accounting, Finance, or a related field is required.", '3–5 years of experience in financial analysis or pricing analysis.', 'Strong proficiency in Excel, including financial modeling and scenario analysis.', 'Solid understanding of margin analysis, pricing structures, and profitability drivers.', 'Excellent analytical and problem-solving skills with high attention to detail.', 'Hands-on experience with forecasting, budgeting, variance analysis and financial models.', 'Strong written and verbal communication skills.', 'Master’s degree in Finance or an MBA is preferred.'],
  responsibilities: ['Support annual budgeting and periodic forecasts based on business trends and historical performance.', 'Analyze financial and operational data to identify trends, risks and opportunities.', 'Build and maintain financial models for planning, pricing and profitability analysis.', 'Evaluate profitability by customer, product line and sales channel.', 'Identify cost-saving opportunities across sourcing, logistics and overhead.', 'Conduct variance analysis against budgets and prior periods.', 'Prepare monthly, quarterly and ad hoc reports and dashboards for leadership.', 'Monitor cash flow and key liquidity metrics.', 'Partner with Sales, Operations and Accounting teams on financial assumptions.', 'Evaluate new initiatives, product launches and business opportunities.'],
};
const jobs = [
  { title: 'Financial Planning & Analysis Analyst (FP&A Analyst)', location: 'Remote', type: 'Full-Time', pay: '$90K – $110K / year', details: fpAndADetails },
  { title: 'Staff Accountant / Bookkeeper', location: 'Remote', type: 'Full-Time', pay: '$65K – $85K / year' },
  { title: 'Finance/Accounting Intern', location: 'Remote', type: 'Internship', pay: '$20 – $25 / hour' },
];
function JoinUs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const benefitsRef = useRef(null);
  const positionsRef = useRef(null);
  const resumeInputRef = useRef(null);
  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const resume = { name: file.name, type: file.type, size: file.size };
    setSelectedResume(resume);
    const reader = new FileReader();
    reader.onload = () => sessionStorage.setItem('uploadedResume', JSON.stringify({ ...resume, data: reader.result }));
    reader.readAsDataURL(file);
  };
  const removeResume = () => {
    setSelectedResume(null);
    sessionStorage.removeItem('uploadedResume');
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };
  useEffect(() => {
    if (!selectedJob) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedJob(null); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedJob]);
  useEffect(() => {
    const target = benefitsRef.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => target.classList.toggle('is-visible', entry.isIntersecting), { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const target = positionsRef.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => target.classList.toggle('is-visible', entry.isIntersecting), { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <>
    <section className="careers-reference-hero"><div className="container"><h1>Careers at A&amp;A Nexxgen</h1><p>Join a growing distribution company built on long-term relationships.</p><p>We are a family-owned distributor of general merchandise, and we are always looking for talented people who care about doing great work. Explore our current openings below.</p></div></section>
    <section className="careers-reference-benefits section-pad"><div className="container"><h2>Why Work With Us</h2><div className="careers-benefit-grid" ref={benefitsRef}><article><h3>Close-Knit Team</h3><p>Work directly with the founder and a small team where your contribution is visible.</p></article><article><h3>Room to Grow</h3><p>Take on broad responsibilities and build real experience across the business.</p></article><article><h3>Remote Flexibility</h3><p>Our open roles are remote, so you can do your best work from anywhere.</p></article></div></div></section>
     <section className="careers-reference-positions section-pad"><div className="container"><h2>Open Positions</h2><div className="positions-table" ref={positionsRef}><div className="position-row position-heading"><strong>Position</strong><strong>Location</strong><strong>Type</strong><strong>Pay</strong><strong>Apply</strong></div>{jobs.map((job) => <div className="position-row" key={job.title}><strong>{job.title}</strong><span>{job.location}</span><span>{job.type}</span><span>{job.pay}</span><div className="position-actions"><button type="button" onClick={() => setSelectedJob(job)}>View &amp; Apply</button></div></div>)}</div></div></section>
    <section className="careers-apply-image"><img src={`${BASE}careers-apply.png`} alt="How to apply information" /></section>
     {selectedJob && <div className="job-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedJob(null); }}><section className="job-modal" role="dialog" aria-modal="true" aria-labelledby="job-modal-title"><button className="job-modal-close" type="button" aria-label="Close job details" onClick={() => setSelectedJob(null)}>×</button><p className="job-modal-meta">{selectedJob.location} · {selectedJob.type} · {selectedJob.pay}</p><h2 id="job-modal-title">{selectedJob.title}</h2>{selectedJob.details ? <><p><strong>Experience:</strong> {selectedJob.details.experience}</p><h3>Job Description</h3><p>{selectedJob.details.description}</p><h3>Requirements</h3><ul>{selectedJob.details.requirements.map((item) => <li key={item}>{item}</li>)}</ul><h3>Key Responsibilities</h3><ul>{selectedJob.details.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></> : <p>Full details for this role are available during the application process.</p>}<label className="resume-upload"><span>Upload your resume</span><input ref={resumeInputRef} type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />{selectedResume ? <small>{selectedResume.name} <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); removeResume(); }}>Remove</button></small> : <small>PDF, DOC, or DOCX</small>}</label><a className="button button-dark" href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Application: ${selectedJob.title}`)}&body=${encodeURIComponent(`Hello,\n\nI would like to apply for the ${selectedJob.title} position.${selectedResume ? `\n\nResume uploaded: ${selectedResume.name}` : ''}\n\nThank you.`)}`}>Apply Now <span>↗</span></a></section></div>}
  </>;
}

function LegacyJoinUs() {
  const benefitsRef = useRef(null);
  useEffect(() => {
    const target = benefitsRef.current;
    if (!target) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      target.classList.toggle('is-visible', entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  return <>
    <section className="careers-reference-hero"><div className="container"><h1>Careers at A&amp;A Nexxgen</h1><p>Join a growing distribution company built on long-term relationships.</p><p>We are a family-owned distributor of general merchandise, and we are always looking for talented people who care about doing great work. Explore our current openings below.</p></div></section>
    <section className="careers-reference-benefits section-pad"><div className="container"><h2>Why Work With Us</h2><div className="careers-benefit-grid" ref={benefitsRef}><article><h3>Close-Knit Team</h3><p>Work directly with the founder and a small team where your contribution is visible.</p></article><article><h3>Room to Grow</h3><p>Take on broad responsibilities and build real experience across the business.</p></article><article><h3>Remote Flexibility</h3><p>Our open roles are remote, so you can do your best work from anywhere.</p></article></div></div></section>
    <section className="careers-reference-positions section-pad"><div className="container"><h2>Open Positions</h2><div className="positions-table"><div className="position-row position-heading"><strong>Position</strong><strong>Location</strong><strong>Type</strong><strong>Pay</strong><strong>Apply</strong></div>{jobs.map((job) => <div className="position-row" key={job.title}><strong>{job.title}</strong><span>{job.location}</span><span>{job.type}</span><span>{job.pay}</span><a href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>View &amp; Apply</a></div>)}</div></div></section>
    <section className="careers-reference-apply section-pad"><div className="container"><h2>How to Apply</h2><p>Click “View &amp; Apply” on any position above or email your resume and a short note about your experience to <a href="mailto:sales@ananexxgen.com">sales@ananexxgen.com</a>.</p><p>We will review every application and will be in touch if there is a fit.</p></div></section>
  </>;
}

function OldJoinUs() { return <><div className="scroll-stage"><section className="join-hero"><div className="container join-hero-grid"><div><Eyebrow>Build with us</Eyebrow><h1>Make good work<br /><em>move further.</em></h1><p>Bring curiosity, care and commercial thinking to a team making global sourcing feel more personal.</p></div><div className="join-hero-image"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Team collaborating around a table" /></div></div></section><section className="section-pad careers-intro"><div className="container intro-grid"><Eyebrow>Why NexxGen</Eyebrow><div><h2>Small team. Global work.</h2><p>We are always interested in meeting thoughtful people who enjoy solving practical problems, building relationships and seeing ideas become real products.</p><p>See an opening that sounds like you? Send your CV and a short note to <a href="mailto:sales@ananexxgen.com?subject=Join%20the%20NexxGen%20team">sales@ananexxgen.com</a>.</p></div></div></section></div><section className="section-pad jobs-section"><div className="container"><div className="section-heading"><div><Eyebrow>Current openings</Eyebrow><h2>Find your next<br /><em>good move.</em></h2></div><span className="catalog-2022-count">{jobs.length} open roles</span></div><div className="jobs-list">{jobs.map((job, index) => <article className="job-card" key={job.title}><div className="job-number">0{index + 1}</div><div className="job-main"><p className="job-type">{job.type}</p><h3>{job.title}</h3><p>{job.text}</p><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul><a className="text-link" href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>Apply for this role <span>↗</span></a></div></article>)}</div></div></section><Cta /></>; }

function App() {
  const [path, setPath] = useState(fromBase(window.location.pathname));
  useEffect(() => { const onPop = () => setPath(fromBase(window.location.pathname)); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
   const page = path === '/about' ? <About /> : path === '/services' ? <Services /> : path === '/products' ? <Products /> : path === '/seasonal-products' ? <SeasonalProducts /> : path === '/join-us' ? <JoinUs /> : <Home />;
   useEffect(() => { document.title = `${path === '/' ? 'Global Sourcing' : path.slice(1).replace(/^[a-z]/, (letter) => letter.toUpperCase())} | A&A NexxGen`; }, [path]);
   useEffect(() => {
     if (path !== '/about') return undefined;
     const image = document.querySelector('.about-why-image img');
     if (!image) return undefined;
     const iframe = document.createElement('iframe');
     iframe.src = 'https://lottie.host/embed/6bc23c0a-7a80-4f2e-ae90-ab1517cbed52/NDZJLxlenf.lottie';
     iframe.title = 'A&A NexxGen global sourcing animation';
     iframe.loading = 'lazy';
     image.replaceWith(iframe);
     return undefined;
   }, [path]);
   useEffect(() => {
     if (path !== '/about') return undefined;
     const target = document.querySelector('.about-feature-grid');
     if (!target) return undefined;
     const observer = new IntersectionObserver(([entry]) => target.classList.toggle('is-visible', entry.isIntersecting), { threshold: 0.2 });
     observer.observe(target);
     return () => observer.disconnect();
   }, [path]);
   useEffect(() => {
     if (path !== '/') return undefined;
     const target = document.querySelector('.scroll-stage>.intro .intro-feature');
     if (!target) return undefined;
     const observer = new IntersectionObserver(([entry]) => target.classList.toggle('is-visible', entry.isIntersecting), { threshold: 0.2 });
     observer.observe(target);
     return () => observer.disconnect();
   }, [path]);
  return <><Header /><main>{page}</main><Footer /></>;
}

export default App;
