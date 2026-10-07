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
  const target = Array.isArray(children) && children[0]?.trim?.() === 'Discover NexxGen' ? '/products' : href;
  const internal = target.startsWith('/');
  return <a className={className} href={internal ? toBase(target) : target} onClick={internal ? (event) => { event.preventDefault(); navigate(target); } : undefined}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(false);
  const headerRef = useRef(null);
  const currentPath = fromBase(window.location.pathname);
  const itemClass = (path) => currentPath === path ? 'active' : '';
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const header = headerRef.current;
      const previousPointerEvents = header?.style.pointerEvents;
      if (header) header.style.pointerEvents = 'none';
      const target = document.elementFromPoint(window.innerWidth / 2, 70);
      if (header) header.style.pointerEvents = previousPointerEvents || '';
      const section = target?.closest('section');
      const color = section ? getComputedStyle(section).color : '';
      const match = color.match(/\d+/g);
      const brightness = match ? Number(match[0]) * .299 + Number(match[1]) * .587 + Number(match[2]) * .114 : 255;
      setLightSurface(brightness < 170);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (event) => { if (!event.target || !event.target.closest || !event.target.closest('.site-header')) setOpen(false); };
    const onKey = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);
  return <header ref={headerRef} className={`site-header ${open ? 'menu-open' : ''} ${scrolled ? 'scrolled' : ''} ${lightSurface ? 'light-surface' : ''}`}><div className="container nav-wrap">
     <Link className="brand" href="/" aria-label="A&A NexxGen home"><span className="brand-mark"><img src={logo} alt="" /></span><span className="brand-name">NEXXGEN</span></Link>
    <button className="menu-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
     <nav className={`main-nav ${open ? 'open' : ''}`} onClick={(event) => { if (event.target.closest('a')) setOpen(false); }}>
          <Link className={itemClass('/')} href="/">Home</Link><Link className={itemClass('/about')} href="/about">About</Link><Link className={itemClass('/services')} href="/services">Services</Link><Link className={itemClass('/products')} href="/products">Products</Link><Link className={itemClass('/join-us')} href="/join-us">Careers</Link>
     </nav><div className="header-tools" aria-label="Account tools"><span aria-hidden="true">♧</span><span aria-hidden="true">♙</span></div>
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
  else if (/wash cloth|hand towel|\bcloths?\b/i.test(name)) category = 'Wash Cloths';
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
}).filter((product) => ![
  '16 " RECHARGEABLE STAND FAN',
  '13.77 (DIA) X 10.83 Planter With Tray',
].includes(product.name) && ![
  'image314.jpeg',
  'image380.jpeg',
  'image414.jpeg',
  'image418.jpeg',
  'image462.jpeg',
  'image82.jpeg',
].includes(product.image) && !/KITCHEN TOWEL HALF STRIPE.*KITCHEN TOWEL/i.test(product.name));

const productFamilyName = (name) => name
  .replace(/^\d+\s*CT\s+/i, '')
  .replace(/^\d+\s*CUP\s+/i, '')
  .replace(/^(WHITE|BLUE|GREEN|RED)\s+TENT\b.*$/i, 'TENT')
  .replace(/^CAMPING CHAIR\s*-\s*(RED|BLUE|BLACK|GREEN)(?:\s*-\s*VARIANT\s*\d+)?$/i, 'CAMPING CHAIR')
  .replace(/^PLASTIC CHAIR\s*-\s*(WHITE|BEIGE|CHOCOLATE)$/i, 'PLASTIC CHAIR')
  .replace(/^REGULAR BEACH CHAIR\s+.+\s+FLAG$/i, 'REGULAR BEACH CHAIR')
  .replace(/^\d+\s*["']{1,2}\s*STAND FAN\s*-\s*\d+$/i, 'STAND FAN')
  .replace(/^\d+\s*["']{1,2}\s*INDUSTRIAL\s+(?:STAND|WALL)\s+FAN.*$/i, 'INDUSTRIAL FAN')
  .replace(/^(?:\d+\s*LBS\s*)+EPSOM SALT.*$/i, 'EPSOM SALT')
  .replace(/^.*RUBBING ALCOHOL.*$/i, 'RUBBING ALCOHOL')
  .replace(/^ALCOHOL\s*-\s*VARIANT.*$/i, 'RUBBING ALCOHOL')
  .replace(/^.*PLANTER.*$/i, 'PLANTERS')
  .replace(/^.*MOP.*$/i, 'MOPS')
  .replace(/^.*BATH TOWEL.*$/i, 'BATH TOWELS')
  .replace(/^.*KITCHEN TOWEL.*$/i, 'KITCHEN TOWELS')
  .replace(/^.*HAND TOWEL.*$/i, 'HAND TOWELS')
  .replace(/^.*WASH CLOTH.*$/i, 'WASH CLOTHS')
  .replace(/^.*CLOTHS.*$/i, 'WASH CLOTHS')
  .replace(/\s*-\s*VARIANT\s+\d+$/i, '')
  .replace(/\s*-\s*(BLUE|RED|CYAN)$/i, '')
  .replace(/\s+\d+(?:\.\d+)?\s*[xX×]\s*\d+(?:\.\d+)?\s*(?:CM|INCH)?$/i, '')
  .trim();

const groupedCatalogProducts = Object.values(normalizedCatalogProducts.reduce((groups, product) => {
  const key = `${product.category}:${productFamilyName(product.name)}`;
  if (!groups[key]) groups[key] = { ...product, names: [], detailsList: [], variants: [] };
  groups[key].variants.push(product);
  if (!groups[key].names.includes(product.name)) groups[key].names.push(product.name);
  if (product.details && !groups[key].detailsList.includes(product.details)) groups[key].detailsList.push(product.details);
  return groups;
}, {})).map((product) => ({
  ...product,
  name: productFamilyName(product.names[0]),
  details: product.detailsList.join(' | '),
}));

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

 function About() { return <><div className="about-scroll-stage"><InnerHero eyebrow="Who we are" text="A&A NexxGen is a family-owned sourcing partner helping businesses find the right products, people and possibilities around the world.">Personal attention.<br /><em>Global reach.</em></InnerHero><section className="section-pad about-feature"><div className="container about-feature-grid"><Eyebrow>Why NexxGen</Eyebrow><div className="about-feature-copy"><h2>Relationships, not transactions.</h2><p>We put our experience and network behind every order, no matter the size. Our team works with qualified suppliers across key sourcing markets and stays close to your project from the first conversation to final delivery.</p><p>We help clients build better product mixes, manage quality and create long-term supply relationships.</p><Button>Work with us</Button></div></div></section></div><section className="about-copy-page section-pad"><div className="container"><h1>About us</h1><div className="about-copy-rule" /><div className="about-copy-text"><p>We are A &amp; A NexxGen and we are here to help you source the highest quality products for the best possible price from around the globe. We have over 15 years of experience in global sourcing and we believe in putting our 100% behind every order for every client, no matter the size. We are in the business of long-term, mutually beneficial relationships, not just sourcing products.</p><p>We are a family owned firm, committed to providing our clients the best services in the market. We are a small firm, but we have worked extremely hard to establish a strong network of vendors from across the globe, and we provide our clients personalized support.</p><p>A &amp; A makes sure that we do our homework for every single order and ethically source the highest quality products. But we do not just stop at that, we want to help your business grow and we are here to help you identify the hottest items on the market for your business. We will provide you consultation on your product mix and pricing structure to help your business benefit on an ongoing basis from a relationship with us.</p><p>We have a wide range of products and services available. Please feel free to contact us for more details or browse through our website for further insight.</p></div></div></section></>; }

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
function ProductsPage() {
  const filterCategories = [...new Set(groupedCatalogProducts.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllFilters, setShowAllFilters] = useState(false);
  const visibleProducts = activeCategory === 'All'
    ? groupedCatalogProducts
    : groupedCatalogProducts.filter((product) => product.category === activeCategory);
  const visibleCategories = showAllFilters ? filterCategories : filterCategories.slice(0, 3);

  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero catalog-hero-centered" style={{ backgroundImage: `linear-gradient(90deg,rgba(240,243,231,.94),rgba(240,243,231,.72)), url(${BASE}tr.png)` }}><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{groupedCatalogProducts.length}</strong> unique products</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters"><button className={activeCategory === 'All' ? 'selected' : ''} onClick={() => setActiveCategory('All')}>All products</button>{visibleCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}{filterCategories.length > 3 && <button className="filter-more" type="button" onClick={() => setShowAllFilters(!showAllFilters)}>{showAllFilters ? 'See less' : 'See more'}</button>}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <a className="catalog-product-card" href={`${BASE}catalog-2022-products/${product.image}`} target="_blank" rel="noreferrer" key={`${product.name}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.details || 'Original catalog product specification.'}</span><b>Open product image <i>↗</i></b></div></a>)}</div></div></section></div><Cta /></>;
}

function ProductsCatalogPage() {
  const filterCategories = [...new Set(groupedCatalogProducts.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const visibleProducts = activeCategory === 'All' ? groupedCatalogProducts : groupedCatalogProducts.filter((product) => product.category === activeCategory);
  const visibleCategories = showAllFilters ? filterCategories : filterCategories.slice(0, 3);

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedProduct(null); };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedProduct]);

  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(240,243,231,.76),rgba(240,243,231,.34)), url(${BASE}tr.png)` }}><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{groupedCatalogProducts.length}</strong> unique products</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters"><button className={activeCategory === 'All' ? 'selected' : ''} onClick={() => setActiveCategory('All')}>All products</button>{visibleCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}{filterCategories.length > 3 && <button className="filter-more" type="button" onClick={() => setShowAllFilters(!showAllFilters)}>{showAllFilters ? 'See less' : 'See more'}</button>}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <article className="catalog-product-card" role="button" tabIndex="0" onClick={() => setSelectedProduct(product)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedProduct(product); }} key={`${product.name}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.variants.length} options available</span></div></article>)}</div></div></section></div>{selectedProduct && <div className="product-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title"><button className="product-modal-close" type="button" aria-label="Close product options" onClick={() => setSelectedProduct(null)}>×</button><p className="eyebrow">{selectedProduct.category}</p><h2 id="product-modal-title">{selectedProduct.name}</h2><div className="product-variants">{selectedProduct.variants.map((variant) => <article key={`${variant.name}-${variant.image}`}><img src={`${BASE}catalog-2022-products/${variant.image}`} alt="" /><div><h3>{variant.name}</h3><p>{variant.details}</p></div></article>)}</div></section></div>}</>;
}

function LegacyProductsDetailsPage() {
  const filterCategories = [...new Set(groupedCatalogProducts.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllFilters, setShowAllFilters] = useState(false);
  const visibleProducts = activeCategory === 'All' ? groupedCatalogProducts : groupedCatalogProducts.filter((product) => product.category === activeCategory);
  const visibleCategories = showAllFilters ? filterCategories : filterCategories.slice(0, 3);

  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(240,243,231,.76),rgba(240,243,231,.34)), url(${BASE}tr.png)` }}><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{groupedCatalogProducts.length}</strong> unique products</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters"><button className={activeCategory === 'All' ? 'selected' : ''} onClick={() => setActiveCategory('All')}>All products</button>{visibleCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}{filterCategories.length > 3 && <button className="filter-more" type="button" onClick={() => setShowAllFilters(!showAllFilters)}>{showAllFilters ? 'See less' : 'See more'}</button>}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <article className="catalog-product-card product-detail-card" role="button" tabIndex="0" onClick={() => navigate(`/products/${encodeURIComponent(product.image)}`)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') navigate(`/products/${encodeURIComponent(product.image)}`); }} key={`${product.name}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3></div></article>)}</div></div></section></div></>;
}

const towelCategories = new Set(['Bath Towels', 'Wash Cloths', 'Kitchen Towel']);
const towelProducts = groupedCatalogProducts.filter((product) => towelCategories.has(product.category));
const combinedTowelProduct = {
  ...towelProducts[0],
  category: 'Towels',
  name: 'Towels',
  details: 'Bath towels, wash cloths and kitchen towels.',
  image: 'image378.png',
  variants: towelProducts.flatMap((product) => product.variants).sort((a, b) => Number(b.image === 'image378.png') - Number(a.image === 'image378.png')),
};

function ProductsDetailsPage() {
  const nonTowelProducts = groupedCatalogProducts.filter((product) => !towelCategories.has(product.category));
  const displayProducts = [...nonTowelProducts, combinedTowelProduct];
  const filterCategories = [...new Set(displayProducts.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [showTowelGallery, setShowTowelGallery] = useState(false);
  const visibleProducts = activeCategory === 'All'
    ? displayProducts
    : displayProducts.filter((product) => product.category === activeCategory);
  const visibleCategories = showAllFilters ? filterCategories : filterCategories.slice(0, 3);
  const towelGalleryImages = [...new Map(combinedTowelProduct.variants.map((variant) => [variant.image, variant])).values()];

  return <><div className="scroll-stage catalog-scroll-stage"><section className="catalog-2022-hero" style={{ backgroundImage: `linear-gradient(90deg,rgba(240,243,231,.76),rgba(240,243,231,.34)), url(${BASE}tr.png)` }}><div className="container catalog-2022-hero-grid"><div><Eyebrow>Product catalog</Eyebrow><h1>Products made<br /><em>to move.</em></h1><p className="lead">Explore our product range with specifications taken from the original NexxGen catalog.</p><div className="catalog-2022-stats"><span><strong>{displayProducts.length}</strong> product families</span><span><strong>100%</strong> catalog sourced</span><span><strong>MOQ</strong> details included</span></div></div></div></section><section className="catalog-2022-library section-pad"><div className="container"><div className="section-heading"><div><Eyebrow>Product range</Eyebrow><h2>Find the right fit.</h2></div><span className="catalog-2022-count">Showing {visibleProducts.length} products</span></div><div className="catalog-product-filters"><button className={activeCategory === 'All' ? 'selected' : ''} onClick={() => setActiveCategory('All')}>All products</button>{visibleCategories.map((category) => <button className={activeCategory === category ? 'selected' : ''} onClick={() => { setActiveCategory(category); setShowTowelGallery(false); }} key={category}>{category}</button>)}{filterCategories.length > 3 && <button className="filter-more" type="button" onClick={() => setShowAllFilters(!showAllFilters)}>{showAllFilters ? 'See less' : 'See more'}</button>}</div><div className="catalog-product-grid">{visibleProducts.map((product, index) => <article className={`catalog-product-card product-detail-card ${product.category === 'Towels' ? 'towels-product-card' : ''}`} role="button" tabIndex="0" onClick={() => product.category === 'Towels' ? setShowTowelGallery(!showTowelGallery) : navigate(`/products/${encodeURIComponent(product.image)}`)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') product.category === 'Towels' ? setShowTowelGallery(!showTowelGallery) : navigate(`/products/${encodeURIComponent(product.image)}`); }} key={`${product.name}-${product.image}`}><div className="catalog-product-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="catalog-product-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.details}</span><b>{product.category === 'Towels' ? (showTowelGallery ? 'Hide towel gallery' : 'View towel gallery') : 'View product details'} <i>↗</i></b></div></article>)}</div>{showTowelGallery && activeCategory !== 'Towels' && <section className="towels-gallery" aria-label="Towel gallery"><div className="towels-gallery-heading"><div><Eyebrow>Towel collection</Eyebrow><h2>All towel options</h2></div><button type="button" onClick={() => setShowTowelGallery(false)}>Close gallery</button></div><div className="towels-gallery-grid">{towelGalleryImages.map((variant) => <figure key={variant.image}><img src={`${BASE}catalog-2022-products/${variant.image}`} alt={variant.name} loading="lazy" /><figcaption>{variant.name}</figcaption></figure>)}</div></section>}</div></section></div></>;
}

function StoreProductDetailPage() {
  const image = decodeURIComponent(fromBase(window.location.pathname).split('/')[2] || '');
  const product = groupedCatalogProducts.find((item) => item.image === image);
  const [expandedVariant, setExpandedVariant] = useState(null);
  if (!product) return <section className="section-pad"><div className="container"><h1>Product not found</h1><Link className="text-link" href="/products">Back to products <span>↗</span></Link></div></section>;
  return <section className="product-detail-page section-pad"><div className="container"><Link className="text-link" href="/products">← Back to products</Link><div className="product-detail-layout"><div className="product-detail-main-image"><img src={`${BASE}catalog-2022-products/${product.image}`} alt={product.name} /></div><div><Eyebrow>{product.category}</Eyebrow><h1>{product.name}</h1><div className="product-detail-variants">{product.variants.map((variant, index) => <article key={`${variant.name}-${variant.image}`}><div className="variant-heading"><h2>{variant.name}</h2><button type="button" onClick={() => setExpandedVariant(expandedVariant === index ? null : index)}>{expandedVariant === index ? 'Hide details' : 'View details'}</button></div>{expandedVariant === index && <p>{variant.details}</p>}</article>)}</div></div></div></div></section>;
}

function LegacyStoreProductPage() {
  const image = decodeURIComponent(fromBase(window.location.pathname).split('/')[2] || '');
  const product = groupedCatalogProducts.find((item) => item.image === image);
  const [selectedVariant, setSelectedVariant] = useState(0);
  useEffect(() => {
    const breadcrumb = document.querySelector('.store-breadcrumb .container');
    if (!breadcrumb || breadcrumb.querySelector('.store-back-button')) return undefined;
    const button = document.createElement('a');
    button.className = 'store-back-button';
    button.href = toBase('/products');
    button.textContent = '← Back';
    breadcrumb.prepend(button);
    return () => button.remove();
  }, []);
  if (!product) return <section className="section-pad"><div className="container"><h1>Product not found</h1><Link className="text-link" href="/products">Back to products <span>↗</span></Link></div></section>;
  const variant = product.variants[selectedVariant] || product.variants[0];
  return <section className="store-product-page"><div className="store-breadcrumb"><div className="container"><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><b>{product.category}</b></div></div><div className="container store-product-main"><div className="store-gallery"><div className="store-main-image"><img src={`${BASE}catalog-2022-products/${variant.image}`} alt={variant.name} /></div><div className="store-thumbnails">{product.variants.map((item, index) => <button className={selectedVariant === index ? 'selected' : ''} type="button" onClick={() => setSelectedVariant(index)} key={`${item.name}-${item.image}`}><img src={`${BASE}catalog-2022-products/${item.image}`} alt={item.name} /></button>)}</div></div><div className="store-product-info"><p className="store-sku">{product.category} / Product details</p><h1>{product.name}</h1><p className="store-summary">Multiple sizes and packing specifications are available for this product family.</p><div className="store-quote-box"><strong>Request pricing</strong><span>Contact us for MOQ, availability and shipping details.</span></div><div className="store-variant-picker"><h2>Available options</h2>{product.variants.map((item, index) => <button className={selectedVariant === index ? 'selected' : ''} type="button" onClick={() => setSelectedVariant(index)} key={`${item.name}-${item.image}`}><span>{item.name}</span><b>{selectedVariant === index ? 'Selected' : 'View option'}</b></button>)}</div><a className="store-contact-button" href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Product inquiry: ${product.name}`)}`}>Contact us about this product <span>↗</span></a></div></div><div className="container store-product-description"><h2>Product details</h2><p>{variant.details}</p><div className="store-detail-columns"><div><h3>Specifications</h3><p>Product category: {product.category}</p><p>Packaging and MOQ details available on request.</p></div><div><h3>Need a custom assortment?</h3><p>Tell us which sizes, quantities and delivery requirements you need. Our sourcing team will help identify the right option.</p></div></div></div></section>;
}

function StoreProductPage() {
  const image = decodeURIComponent(fromBase(window.location.pathname).split('/')[2] || '');
  const matchedProduct = groupedCatalogProducts.find((item) => item.image === image) || (() => {
    const rawProduct = catalogProducts.find((item) => item.image === image);
    return rawProduct ? { name: rawProduct.name, category: rawProduct.category, image: rawProduct.image } : undefined;
  })();
  const isTowel = towelCategories.has(matchedProduct?.category) || /towel|cloth/i.test(`${matchedProduct?.name || ''} ${matchedProduct?.category || ''}`);
  const product = isTowel ? combinedTowelProduct : matchedProduct;
  const [selectedVariant, setSelectedVariant] = useState(0);
  const galleryImages = isTowel
    ? [...new Map(combinedTowelProduct.variants.map((variant) => [variant.image, variant])).values()]
    : [];

  if (!product) return <section className="section-pad"><div className="container"><h1>Product not found</h1><Link className="text-link" href="/products">Back to products <span>↗</span></Link></div></section>;
  const variant = product.variants[selectedVariant] || product.variants[0];

  return <section className="store-product-page"><div className="store-breadcrumb"><div className="container"><Link className="store-back-button" href="/products">← Back</Link><Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><b>{product.category}</b></div></div><div className="container store-product-main"><div className="store-gallery"><div className="store-main-image"><img src={`${BASE}catalog-2022-products/${variant.image}`} alt={variant.name} /></div><div className="store-thumbnails">{product.variants.map((item, index) => <button className={selectedVariant === index ? 'selected' : ''} type="button" onClick={() => setSelectedVariant(index)} key={`${item.name}-${item.image}`}><img src={`${BASE}catalog-2022-products/${item.image}`} alt={item.name} /></button>)}</div></div><div className="store-product-info"><p className="store-sku">{product.category} / Product details</p><h1>{product.name}</h1><p className="store-summary">Multiple sizes and packing specifications are available for this product family.</p><div className="store-quote-box"><strong>Request pricing</strong><span>Contact us for MOQ, availability and shipping details.</span></div><div className="store-variant-picker"><h2>Available options</h2>{product.variants.map((item, index) => <button className={selectedVariant === index ? 'selected' : ''} type="button" onClick={() => setSelectedVariant(index)} key={`${item.name}-${item.image}`}><span>{item.name}</span><b>{selectedVariant === index ? 'Selected' : 'View option'}</b></button>)}</div><a className="store-contact-button" href={`mailto:sales@ananexxgen.com?subject=${encodeURIComponent(`Product inquiry: ${product.name}`)}`}>Contact us about this product <span>↗</span></a></div></div><div className="container store-product-description"><h2>Product details</h2><p>{variant.details}</p>{isTowel && <section className="towel-detail-gallery"><div className="towel-detail-gallery-heading"><Eyebrow>Complete collection</Eyebrow><h2>All towel options</h2></div><div className="towel-detail-gallery-grid">{galleryImages.map((item) => <figure key={item.image}><img src={`${BASE}catalog-2022-products/${item.image}`} alt={item.name} loading="lazy" /><figcaption>{item.name}</figcaption></figure>)}</div></section>}</div></section>;
}

const fpAndADetails = {
  experience: '3–5 years in financial analysis',
  whoWeAre: 'A&A Nexxgen is a leading wholesale distributor of general merchandise, headquartered in Piscataway, New Jersey. For more than 15 years, we have helped retailers and wholesalers across the country source high-quality products from around the globe at the best possible price. Our core strength is identifying qualified suppliers based on each client\'s specific needs and requirements, and we have built a strong network of vendors across key sourcing regions worldwide. We are a family-owned firm and a small, close-knit team, so every client receives personalized support. We do our homework on every order, source products efficiently, and put our full effort behind each one, no matter the size. Beyond fulfilling orders, we help our clients grow by identifying the products in highest demand for their business. We are in the business of long-term, mutually beneficial relationships, not just moving product.',
  overview: 'As our FP&A Analyst, you will serve as a key financial partner to the business, helping translate day-to-day sales, purchasing, and operational activity into clear, forward-looking financial plans. You will build and refine budgets and forecasts, understand what the numbers are saying about performance, pricing, and profitability, and work closely with Sales, Purchasing, and Accounting to turn that insight into reporting and recommendations leadership can act on.',
  whyUs: 'At A&A Nexxgen, you will work directly with our founder, an industry veteran with over 25 years of experience building and running distribution businesses. You will work on real problems with real consequences, see the impact of your work quickly, and have the freedom to bring ideas to the table and take ownership of your work.',
  closing: 'If you are a motivated, detail-oriented finance professional looking to grow with a company that puts its full effort behind every relationship, we would love to hear from you. Please submit your resume along with a brief note on your relevant experience.',
  description: 'A&A Nexxgen is a leading wholesale distributor of general merchandise, headquartered in Piscataway, New Jersey. For more than 15 years, we have helped retailers and wholesalers across the country source high-quality products from around the globe at the best possible price. As our FP&A Analyst, you will translate sales, purchasing and operational activity into clear financial plans, forecasts, reporting and recommendations for leadership. You will work closely with Sales, Purchasing and Accounting and become one of the people who understands the business best, from pricing and procurement to cash flow.',
  requirements: ["Bachelor's degree in Accounting, Finance, or a related field is required.", '3-5 years of experience in financial analysis or pricing analysis.', 'Strong proficiency in Excel, including financial modeling and scenario analysis.', 'Solid understanding of margin analysis, pricing structures, and profitability drivers.', 'Excellent analytical and problem-solving skills, with high attention to detail.', 'Hands-on experience building financial models and working with forecasting, budgeting, and variance analysis.', 'Strong written and verbal communication skills, with the ability to collaborate across departments.', 'Comfortable managing multiple priorities in a fast-paced, growing organization.', "Master's degree in Finance or an MBA is preferred."],
  responsibilities: ['Support the annual budgeting process and prepare periodic forecasts based on business trends and historical performance.', 'Analyze financial and operational data to identify trends, risks, and opportunities that inform business decisions.', 'Build and maintain financial models to support planning, pricing, and profitability analysis.', 'Evaluate profitability by customer, product line, and sales channel.', 'Identify and recommend cost-saving opportunities across sourcing, logistics, and overhead.', 'Conduct variance analysis comparing actual results to budget and prior periods.', 'Prepare monthly, quarterly, and ad hoc financial reports and dashboards for leadership.', 'Monitor cash flow and key liquidity metrics to support financial planning.', 'Partner with Sales, Operations, and Accounting to gather data and align on assumptions.', 'Assist with financial evaluation of new initiatives, product launches, or business opportunities.', 'Continuously identify opportunities to improve financial processes, reporting efficiency, and data accuracy.'],
};
const staffAccountantDetails = {
  experience: '2-4 years in accounting or bookkeeping',
  whoWeAre: fpAndADetails.whoWeAre,
  overview: 'As our Staff Accountant/Bookkeeper, you will be the person keeping the financial engine of the business running smoothly day to day. You will manage the detailed, ongoing work of recording transactions, reconciling accounts, and keeping our books accurate and current, so that everyone from the founder to the FP&A Analyst can trust the numbers they are working with. This role blends accounts payable, accounts receivable, reconciliations, close activities, and ad hoc requests.',
  whyUs: 'At A&A Nexxgen, you will work closely with our founder, an industry veteran with over 25 years of experience, rather than getting lost in a large accounting department. You will see firsthand how a distribution business actually runs, get exposure to real vendor relationships and cash flow decisions, and have the freedom to suggest better ways of doing things.',
  closing: 'If you are a detail-oriented accounting professional who enjoys keeping the books tight and the numbers accurate, we would love to hear from you. Please submit your resume along with a brief note on your relevant experience.',
  description: 'A&A Nexxgen is a leading wholesale distributor of general merchandise, headquartered in Piscataway, New Jersey. As our Staff Accountant/Bookkeeper, you will keep the financial engine running smoothly by recording transactions, reconciling accounts, maintaining accurate books, and supporting close activities. You will be a dependable point of contact for invoices, payments and financial recordkeeping, with direct exposure to vendor relationships, cash flow decisions and operational challenges.',
  requirements: ["Associate's or Bachelor's degree in Accounting, Finance, or a related field, or equivalent practical experience.", '2-4 years of bookkeeping or staff accounting experience, ideally within a distribution, import, or retail environment.', 'Proficiency in QuickBooks or similar accounting software and Microsoft Excel.', 'Solid understanding of accounts payable, accounts receivable, and general ledger processes.', 'Strong attention to detail and organizational skills, with the ability to manage multiple deadlines.', 'Good communication skills and the ability to work well across departments.'],
  responsibilities: ['Manage day-to-day bookkeeping, including processing accounts payable and accounts receivable.', 'Perform regular bank and credit card reconciliations.', 'Assist with month-end and year-end close, including journal entries and account reconciliations.', 'Maintain the general ledger and ensure accurate, up-to-date financial records.', 'Process vendor invoices and customer payments, and monitor aging reports.', 'Support payroll processing and related recordkeeping.', 'Prepare and file sales tax returns as required.', 'Support the FP&A Analyst with data pulls and financial reporting as needed.', 'Maintain organized, audit-ready financial documentation.'],
};
const financeInternDetails = {
  experience: 'None required - open to students and recent graduates',
  whoWeAre: fpAndADetails.whoWeAre,
  overview: 'As our Finance/Accounting Intern, you will get a genuine, hands-on introduction to finance and accounting inside a real distribution business. You will support our FP&A Analyst and Staff Accountant/Bookkeeper with data entry, basic analysis, reconciliations, and recordkeeping, while also taking on ad hoc projects from the founder. Because we are a small team, you will get exposure to purchasing, inventory, and vendor coordination too.',
  whyUs: 'Interning at A&A Nexxgen means learning directly from our founder, an industry veteran with over 25 years of experience running a distribution business. You will work on real tasks with real impact, not busy work, and have the freedom to ask questions, offer ideas, and get involved beyond your core responsibilities.',
  closing: 'This role is ideal for someone who wants broad, real-world exposure to how a distribution business runs financially and operationally. Please submit your resume along with a brief note on why you are interested.',
  description: 'A&A Nexxgen is a leading wholesale distributor of general merchandise, headquartered in Piscataway, New Jersey. As our Finance/Accounting Intern, you will get a hands-on introduction to finance and accounting inside a real distribution business. You will support the FP&A Analyst and Staff Accountant/Bookkeeper with data entry, basic analysis, reconciliations and recordkeeping, while also getting exposure to purchasing, inventory and vendor coordination.',
  requirements: ['Currently pursuing or recently completed a degree in Accounting, Finance, Business Administration, or a related field.', 'Strong interest in learning the finance and operations side of a distribution business.', 'Proficient in Microsoft Excel; familiarity with QuickBooks or similar software is a plus.', 'Highly organized, detail-oriented, and comfortable wearing multiple hats.', 'Strong communication skills and a proactive, can-do attitude.', 'Able to work remotely with a reliable internet connection.'],
  responsibilities: ['Support the FP&A Analyst with data entry, report preparation, and basic financial analysis tasks.', 'Assist the Staff Accountant/Bookkeeper with invoice processing, reconciliations, and recordkeeping.', 'Help maintain and organize financial and operational documents.', 'Take on ad hoc projects and tasks assigned directly by the founder.', 'Provide general administrative and operational support as needed.', 'Assist with special projects related to purchasing, inventory tracking, or vendor coordination.'],
};
fpAndADetails.description = `Who Are We: ${fpAndADetails.whoWeAre}\n\nPosition Overview: ${fpAndADetails.overview}\n\nWhy A&A Nexxgen?: ${fpAndADetails.whyUs}`;
staffAccountantDetails.description = `Who Are We: ${staffAccountantDetails.whoWeAre}\n\nPosition Overview: ${staffAccountantDetails.overview}\n\nWhy A&A Nexxgen?: ${staffAccountantDetails.whyUs}`;
financeInternDetails.description = `Who Are We: ${financeInternDetails.whoWeAre}\n\nPosition Overview: ${financeInternDetails.overview}\n\nWhy A&A Nexxgen?: ${financeInternDetails.whyUs}`;
const jobs = [
  { title: 'Financial Planning & Analysis Analyst (FP&A Analyst)', location: 'Remote', type: 'Full-Time', pay: '$90K – $110K / year', details: fpAndADetails },
  { title: 'Staff Accountant / Bookkeeper', location: 'Remote', type: 'Full-Time', pay: '$65K – $85K / year', details: staffAccountantDetails },
  { title: 'Finance/Accounting Intern', location: 'Remote', type: 'Internship', pay: '$20 – $25 / hour', details: financeInternDetails },
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
   const page = path === '/about' ? <><About /><WhyChooseSection /></> : path === '/services' ? <Services /> : path.startsWith('/products/') ? <StoreProductPage /> : path === '/products' ? <ProductsDetailsPage /> : path === '/seasonal-products' ? <SeasonalProducts /> : path === '/join-us' ? <JoinUs /> : <Home />;
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
    useEffect(() => {
      if (path !== '/services') return undefined;
      const cards = [...document.querySelectorAll('.service-card')];
      if (!cards.length) return undefined;
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting)), { threshold: 0.2 });
      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }, [path]);
   return <><Header /><main>{page}</main><Footer /></>;
}

 function WhyChooseSection() {
   return <section className="about-why section-pad"><div className="container about-why-container"><div className="about-why-grid"><div className="about-why-image"><img src="/wd.png" alt="Global sourcing team illustration" /></div><div className="about-why-copy"><h2>Why Choose A &amp; A NexxGen?</h2><div className="about-copy-rule" /><ul>{whyChoosePoints.map((point) => <li key={point}>{point}</li>)}</ul></div></div></div></section>;
 }

 export default App;
