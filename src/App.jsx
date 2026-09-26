import { useEffect, useState } from 'react';
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
  return <header className="site-header"><div className="container nav-wrap">
    <Link className="brand" href="/"><img src={logo} alt="A&A NexxGen" /></Link>
    <button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
     <nav className={`main-nav ${open ? 'open' : ''}`}>
        <Link className={itemClass('/')} href="/">Home</Link><Link className={itemClass('/about')} href="/about">About</Link><Link className={itemClass('/services')} href="/services">Services</Link><Link className={itemClass('/products')} href="/products">Products</Link><Link className={itemClass('/join-us')} href="/join-us">Join us</Link>
    </nav>
  </div></header>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div><Link className="brand" href="/"><img src={logo} alt="A&A NexxGen" /></Link><p>The next generation of global sourcing.</p></div><div><p className="footer-label">Explore</p><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/products">Products</Link><Link href="/join-us">Join us</Link></div><div><p className="footer-label">Get in touch</p><a href="mailto:sales@ananexxgen.com">sales@ananexxgen.com</a><a href="tel:+17324292328">1-732-429-2328</a><span>New Jersey, USA</span></div></div><div className="container copyright">© 2026 A&amp;A NexxGen <span>Built for better sourcing.</span></div></footer>;
}

const Button = ({ href = 'mailto:sales@ananexxgen.com', children, className = 'button-dark' }) => <Link className={`button ${className}`} href={href}>{children} <span>↗</span></Link>;
const Eyebrow = ({ children }) => <p className="eyebrow">{children}</p>;
const Process = () => <div className="process-grid"><div><span>01</span><h3>Discover</h3><p>We understand your product, market and commercial goals.</p></div><div><span>02</span><h3>Define</h3><p>We identify the right suppliers, specifications and path forward.</p></div><div><span>03</span><h3>Deliver</h3><p>We manage quality, logistics and communication through delivery.</p></div></div>;
const categories = [['card-house', 'Housewares'], ['card-garden', 'Garden furniture'], ['card-plastic', 'Plastic & general merchandise']];

const CategoryCards = ({ all = false }) => <div className="category-grid">{(all ? [...categories, ['card-house', 'Seasonal products'], ['card-garden', 'General merchandise'], ['card-plastic', 'Medical supplies']] : categories).map(([image, title], index) => <Link className={`category-card ${image}`} href="mailto:sales@ananexxgen.com" key={title}><span>0{index + 1}</span><h3>{title}</h3><b>{all ? 'Discuss your needs' : 'Explore'} <i>↗</i></b></Link>)}</div>;

function Home() {
  return <><div className="scroll-stage"><section className="hero"><div className="container hero-grid"><div className="hero-copy"><Eyebrow>Global sourcing, made personal</Eyebrow><h1>Better products.<br /><em>Better possibilities.</em></h1><p className="lead">We connect ambitious businesses with quality products, trusted suppliers and a simpler path from idea to delivery.</p><div className="actions"><Button>Start a project</Button><Link className="text-link" href="/about">Discover NexxGen <span>↗</span></Link></div><div className="hero-note"><strong>15+</strong><span>years of experience<br />in global sourcing</span></div></div><div className="hero-visual"><div className="hero-image" /><div className="floating-card"><span className="card-icon">✦</span><strong>From concept<br />to container</strong><small>One partner. Every step.</small></div></div></div></section><section className="intro section-pad"><div className="container intro-grid intro-feature"><Eyebrow>What we do</Eyebrow><div className="intro-copy"><h2>Global sourcing without the usual complexity.</h2><p>From supplier research and product development to quality assurance and shipping, A&amp;A NexxGen gives you personal support at every stage.</p><Link className="text-link" href="/services">Explore our services <span>↗</span></Link></div><figure className="intro-image"><img src="https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&amp;fit=crop&amp;w=1000&amp;q=85" alt="Workers organizing products in a modern warehouse" /><figcaption>From factory floor to final delivery</figcaption></figure></div></section></div><section className="category-section section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Our capabilities</Eyebrow><h2>Products with room to grow.</h2></div><Button href="/products" className="button-outline">View products</Button></div><CategoryCards /></div></section><section className="process section-pad"><div className="container"><Eyebrow>The NexxGen way</Eyebrow><h2>Simple by design.<br />Strong by execution.</h2><Process /></div></section><Cta /></>;
}

function InnerHero({ eyebrow, children, text }) { return <section className="hero inner-hero"><div className="container"><Eyebrow>{eyebrow}</Eyebrow><h1>{children}</h1><p className="lead">{text}</p></div></section>; }
function Cta() { return <section className="cta-band"><div className="container cta-content"><div><Eyebrow>Let’s make something work</Eyebrow><h2>Have a product in mind?</h2></div><Button className="button-light">Tell us about it</Button></div></section>; }

function About() { return <><div className="about-scroll-stage"><InnerHero eyebrow="Who we are" text="A&A NexxGen is a family-owned sourcing partner helping businesses find the right products, people and possibilities around the world.">Personal attention.<br /><em>Global reach.</em></InnerHero><section className="section-pad about-feature"><div className="container about-feature-grid"><Eyebrow>Why NexxGen</Eyebrow><div className="about-feature-copy"><h2>Relationships, not transactions.</h2><p>We put our experience and network behind every order, no matter the size. Our team works with qualified suppliers across key sourcing markets and stays close to your project from the first conversation to final delivery.</p><p>We help clients build better product mixes, manage quality and create long-term supply relationships.</p><Button>Work with us</Button></div></div></section></div><section className="process section-pad"><div className="container"><Eyebrow>Our process</Eyebrow><h2>Clear thinking.<br />Consistent delivery.</h2><Process /></div></section></>; }

const services = ['Comprehensive sourcing', 'Product consultancy', 'Private labeling', 'Quality assurance', 'Risk management', 'Logistics'];
const serviceImages = [
  ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85', 'Organized shipping cartons in a warehouse'],
  ['https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85', 'Team discussing a product plan'],
  ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85', 'Branded products ready for customers'],
  ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=85', 'Quality specialist working at a production line'],
  ['https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=85', 'Documents and planning for supplier risk'],
  ['https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=800&q=85', 'Shipping containers at a busy port'],
];
function Services() { return <><div className="scroll-stage"><InnerHero eyebrow="How we help" text="From supplier research to shipping, we make sourcing easier to manage and easier to trust.">One partner for<br /><em>every moving part.</em></InnerHero><section className="section-pad"><div className="container"><Eyebrow>Our services</Eyebrow><div className="process-grid service-grid">{services.map((service, index) => <div className="service-card" key={service}><img src={serviceImages[index][0]} alt={serviceImages[index][1]} loading="lazy" /><span>0{index + 1}</span><h3>{service}</h3><p>{['Find qualified suppliers and products that match your requirements.','Improve your product mix, pricing structure and market opportunity.','Develop your own brand through product, packaging and artwork support.','Supplier verification, factory audits, inspections and quality control.','Reduce surprises with documentation, supplier checks and project management.','Container supervision, consolidation, shipping and delivery support.'][index]}</p></div>)}</div></div></section></div><Cta /></>; }
function Products() {
  const [activeCategory, setActiveCategory] = useState('All products');
  const filterCategories = ['All products', ...new Set(catalogProducts.map((product) => product.category))];
  const visibleProducts = activeCategory === 'All products' ? catalogProducts : catalogProducts.filter((product) => product.category === activeCategory);
  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero"><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{catalogProducts.length}</strong> unique products</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters">{filterCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <a className="catalog-product-card" href={`${BASE}catalog-2022-products/${product.image}`} target="_blank" rel="noreferrer" key={`${product.name}-${product.details}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.details || 'Original catalog product specification.'}</span><b>Open product image <i>↗</i></b></div></a>)}</div></div></section></div><Cta /></>;
}
const jobs = [
  { title: 'Sourcing Coordinator', type: 'Full-time · New Jersey / Hybrid', text: 'Keep supplier conversations, product samples and timelines moving from first brief to final shipment.', points: ['Coordinate supplier and client updates', 'Track samples, specifications and deadlines', 'Support purchase orders and quality checks'] },
  { title: 'Product Development Associate', type: 'Full-time · Remote-friendly', text: 'Help shape practical, market-ready products across housewares, outdoor and general merchandise.', points: ['Research products and competitive pricing', 'Prepare product briefs and presentations', 'Partner with factories on packaging and details'] },
  { title: 'Quality Assurance Specialist', type: 'Full-time · New Jersey / Hybrid', text: 'Help make sure every product meets the right specification before it leaves the factory.', points: ['Review product specifications and samples', 'Coordinate inspections with suppliers', 'Document quality findings and follow-ups'] },
  { title: 'Global Logistics Coordinator', type: 'Full-time · Remote-friendly', text: 'Keep purchase orders, shipments and delivery timelines organized across international supply routes.', points: ['Track orders from booking to delivery', 'Coordinate freight and shipping documents', 'Keep clients updated on milestones'] },
];
function JoinUs() { return <><div className="scroll-stage"><section className="join-hero"><div className="container join-hero-grid"><div><Eyebrow>Build with us</Eyebrow><h1>Make good work<br /><em>move further.</em></h1><p>Bring curiosity, care and commercial thinking to a team making global sourcing feel more personal.</p></div><div className="join-hero-image"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Team collaborating around a table" /></div></div></section><section className="section-pad careers-intro"><div className="container intro-grid"><Eyebrow>Why NexxGen</Eyebrow><div><h2>Small team. Global work.</h2><p>We are always interested in meeting thoughtful people who enjoy solving practical problems, building relationships and seeing ideas become real products.</p><p>See an opening that sounds like you? Send your CV and a short note to <a href="mailto:sales@ananexxgen.com?subject=Join%20the%20NexxGen%20team">sales@ananexxgen.com</a>.</p></div></div></section></div><section className="section-pad jobs-section"><div className="container"><div className="section-heading"><div><Eyebrow>Current openings</Eyebrow><h2>Find your next<br /><em>good move.</em></h2></div><span className="catalog-2022-count">{jobs.length} open roles</span></div><div className="jobs-list">{jobs.map((job, index) => <article className="job-card" key={job.title}><div className="job-number">0{index + 1}</div><div className="job-main"><p className="job-type">{job.type}</p><h3>{job.title}</h3><p>{job.text}</p><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul><a className="text-link" href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>Apply for this role <span>↗</span></a></div></article>)}</div></div></section><Cta /></>; }

function App() {
  const [path, setPath] = useState(fromBase(window.location.pathname));
  useEffect(() => { const onPop = () => setPath(fromBase(window.location.pathname)); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
   const page = path === '/about' ? <About /> : path === '/services' ? <Services /> : path === '/products' ? <Products /> : path === '/join-us' ? <JoinUs /> : <Home />;
  useEffect(() => { document.title = `${path === '/' ? 'Global Sourcing' : path.slice(1).replace(/^[a-z]/, (letter) => letter.toUpperCase())} | A&A NexxGen`; }, [path]);
  return <><Header /><main>{page}</main><Footer /></>;
}

export default App;
