const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: build/index.html not found. Run react-scripts build first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Shared Nav & Footer templates
const navHtml = `
  <nav class="navbar navbar-expand-lg fixed-top scrolled" style="background-color: rgba(26, 42, 68, 0.95) !important;">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand d-flex align-items-center" href="/">
        <img src="/logo.1.png" alt="Vivante Logo" style="height: 60px; width: 60px; margin-right: 12px;" fetchpriority="high" decoding="async" />
        <span class="fw-bold text-white fs-4">Vivante Air Charters</span>
      </a>
      <div class="d-flex align-items-center gap-3">
        <a href="/#about" class="nav-link text-white px-2">About</a>
        <a href="/services" class="nav-link text-white px-2">Services</a>
        <a href="/fleet" class="nav-link text-white px-2">Fleet</a>
        <a href="/contact" class="nav-link text-white px-2">Contact</a>
        <a href="/login" class="btn btn-outline-light rounded-pill px-3">Login</a>
      </div>
    </div>
  </nav>
`;

const footerHtml = `
  <footer class="text-center py-4" style="background: #0C172B; color: white; border-top: 1px solid rgba(255, 255, 255, 0.1);">
    <div class="container">
      <p class="mb-0">© ${new Date().getFullYear()} Vivante Air Charters. All rights reserved.</p>
    </div>
  </footer>
`;

const routes = {
  '/': {
    title: 'Vivante Air Charters | Private Jet, Helicopter & Safari Charters in Kenya',
    body: `
      ${navHtml}
      <main>
        <section class="hero-section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(26, 42, 68, 0.8), rgba(0, 0, 0, 0.7)), url('/jet.jpeg') center/cover no-repeat; text-align: center; color: white; padding: 120px 20px;">
          <div class="container">
            <h1 class="display-3 fw-bold mb-4" style="text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);">Welcome to Vivante Air Charters</h1>
            <p class="lead mb-5 opacity-90" style="text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5); font-size: 1.4rem;">Every Journey, Refined With Precision.</p>
            <div class="d-flex justify-content-center gap-3">
              <a href="/services" class="btn btn-light btn-lg px-5 py-3 fw-semibold" style="color: #1A2A44;">Our Services</a>
              <a href="/fleet" class="btn btn-outline-light btn-lg px-5 py-3 fw-semibold">View Fleet</a>
            </div>
          </div>
        </section>

        <section id="about" class="py-5" style="background: #BCCEDA; color: #1A2A44; padding: 80px 20px;">
          <div class="container text-center">
            <h2 class="display-5 fw-bold mb-4">Vivante Air Charters</h2>
            <p class="lead mx-auto" style="max-width: 900px; line-height: 1.8;">
              At Vivante Air Charters, we make private air travel simple, personal, and accessible.
              Our mission is to bridge exclusivity and practicality, offering premium charters for both
              seasoned and first-time flyers who value comfort, safety, and time. We offer exclusive charter
              services ranging from helicopter transfers to regional jet flights, light aircrafts for those short
              bush hops, group air charters and air ambulance services when that minute matters. Every trip is tailored
              to your needs, built on transparency, reliability, and thoughtful service.
            </p>
          </div>
        </section>

        <section id="Features" class="py-5" style="background: #0C172B; color: white; padding: 80px 20px;">
          <div class="container">
            <h2 class="text-center display-5 fw-bold mb-5">Our Features & Capabilities</h2>
            <div class="row g-4 text-center">
              <div class="col-md-4">
                <div class="p-4" style="background: rgba(255, 255, 255, 0.08); border-radius: 16px;">
                  <h3 class="h4 fw-bold">Empty Legs</h3>
                  <p>Save up to 50% on one-way flights with our exclusive empty leg deals across East Africa.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4" style="background: rgba(255, 255, 255, 0.08); border-radius: 16px;">
                  <h3 class="h4 fw-bold">Aircraft Charters</h3>
                  <p>Light turbo props, luxury jets, air ambulance missions, and executive helicopter charters.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-4" style="background: rgba(255, 255, 255, 0.08); border-radius: 16px;">
                  <h3 class="h4 fw-bold">Concierge Tools</h3>
                  <p>Real-time flight coordination, in-flight gourmet catering, ground transfers, and VIP terminal handling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" class="py-5 text-center" style="background: #BCCEDA; color: #1A2A44; padding: 80px 20px;">
          <div class="container">
            <h2 class="display-5 fw-bold mb-5">Contact & Inquiries</h2>
            <div class="row g-4">
              <div class="col-md-4">
                <h3 class="h5 fw-bold">Address</h3>
                <p>Nairobi, Kenya</p>
              </div>
              <div class="col-md-4">
                <h3 class="h5 fw-bold">Email</h3>
                <p><a href="mailto:charters@vivanteair.com">charters@vivanteair.com</a><br/><a href="mailto:info@vivanteair.com">info@vivanteair.com</a></p>
              </div>
              <div class="col-md-4">
                <h3 class="h5 fw-bold">Phone / WhatsApp</h3>
                <p><a href="tel:+254758007505">+254 758-007-505</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      ${footerHtml}
    `
  },
  '/about': {
    title: 'About Vivante Air Charters | Premium Aviation in Kenya',
    body: `
      ${navHtml}
      <main style="padding-top: 100px; background: #0C172B; color: white; min-height: 80vh;">
        <div class="container py-5 text-center">
          <h1 class="display-4 fw-bold mb-4">About Vivante Air Charters</h1>
          <p class="lead mx-auto" style="max-width: 800px; line-height: 1.8;">
            Based in Nairobi, Kenya, Vivante Air Charters is dedicated to redefining private aviation across East and Central Africa.
            From VIP corporate charters and private safari lodge connections to emergency air ambulance transports,
            every flight is planned with meticulous attention to safety, discretion, and luxury.
          </p>
        </div>
      </main>
      ${footerHtml}
    `
  },
  '/fleet': {
    title: 'Private Fleet | Jets, Turboprops & Helicopters | Vivante Air',
    body: `
      ${navHtml}
      <main style="padding-top: 100px; background: #0C172B; color: white; min-height: 80vh;">
        <div class="container py-5 text-center">
          <h1 class="display-4 fw-bold mb-4">Our Aircraft Fleet</h1>
          <p class="lead mx-auto mb-5" style="max-width: 800px;">
            Explore our versatile fleet of business jets, turboprops, bush aircraft, and helicopters maintained to world-class aviation standards.
          </p>
          <div class="row g-4 text-start">
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Gulfstream G650</h3><p class="text-info">Long-Range Jet · 14 Passengers · 7,000 nm</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Cessna Citation XLS+</h3><p class="text-info">Mid-Size Jet · 8 Passengers · 2,100 nm</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Pilatus PC-12 NGX</h3><p class="text-info">Turboprop · 9 Passengers · 1,845 nm</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Cessna C208B Grand Caravan</h3><p class="text-info">Turboprop · 12 Passengers · 964 nm</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Airbus H125 & H130</h3><p class="text-info">Helicopter · VIP & Scenic Transfers</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Beechcraft King Air 350</h3><p class="text-info">Twin Turboprop · 11 Passengers · 1,700 nm</p></div></div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `
  },
  '/services': {
    title: 'Charter Services | Private Jets, Helicopters & Medevac | Vivante Air',
    body: `
      ${navHtml}
      <main style="padding-top: 100px; background: #0C172B; color: white; min-height: 80vh;">
        <div class="container py-5 text-center">
          <h1 class="display-4 fw-bold mb-4">Charter Services</h1>
          <p class="lead mx-auto mb-5" style="max-width: 800px;">
            Tailored aviation solutions designed around your schedule, destination, and comfort requirements.
          </p>
          <div class="row g-4 text-start">
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Executive / VIP Transport</h3><p>Discreet, luxurious private jet travel for executives and high-profile individuals.</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Helicopter Transfers</h3><p>Direct point-to-point connections, scenic transfers, and luxury lodge access.</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Air Ambulance</h3><p>24/7 dedicated medical evacuation with onboard ICU equipment and clinical staff.</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Safari Charters</h3><p>Curated aerial connections to Kenya's top game reserves and safari camps.</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Empty Legs</h3><p>Discounted repositioning flights available on selected routes across the continent.</p></div></div>
            <div class="col-md-4"><div class="p-4" style="background: rgba(255,255,255,0.08); border-radius: 16px;"><h3 class="h5 fw-bold">Cargo & Logistics</h3><p>Rapid dispatch cargo flights for urgent consignments and valuable cargo.</p></div></div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `
  },
  '/contact': {
    title: 'Contact Vivante Air Charters | Book Flight or Request Quote',
    body: `
      ${navHtml}
      <main style="padding-top: 100px; background: #0C172B; color: white; min-height: 80vh;">
        <div class="container py-5 text-center">
          <h1 class="display-4 fw-bold mb-4">Contact Vivante Air Charters</h1>
          <p class="lead mx-auto mb-4" style="max-width: 700px;">
            Our flight dispatch team is on standby 24/7 to plan your private charter.
          </p>
          <div class="row g-4 text-center mt-3">
            <div class="col-md-4"><h3 class="h5 fw-bold">Headquarters</h3><p>Nairobi, Kenya</p></div>
            <div class="col-md-4"><h3 class="h5 fw-bold">Telephone / WhatsApp</h3><p><a href="tel:+254758007505" style="color: #00d4ff;">+254 758-007-505</a></p></div>
            <div class="col-md-4"><h3 class="h5 fw-bold">Direct Email</h3><p><a href="mailto:charters@vivanteair.com" style="color: #00d4ff;">charters@vivanteair.com</a></p></div>
          </div>
        </div>
      </main>
      ${footerHtml}
    `
  }
};

for (const [route, config] of Object.entries(routes)) {
  let html = template;
  
  // Replace title if customized
  if (config.title) {
    html = html.replace(/<title>.*?<\/title>/, `<title>${config.title}</title>`);
  }

  // Pre-render content into root div
  const rootDivRegex = /<div id="root"><\/div>/;
  if (!rootDivRegex.test(html)) {
    console.warn(`Warning: Could not find <div id="root"></div> in template`);
  }
  
  html = html.replace(rootDivRegex, `<div id="root">${config.body}</div>`);

  if (route === '/') {
    fs.writeFileSync(TEMPLATE_PATH, html, 'utf8');
    console.log(`✓ Pre-rendered / -> build/index.html`);
  } else {
    const routeDir = path.join(BUILD_DIR, route.slice(1));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const filePath = path.join(routeDir, 'index.html');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Pre-rendered ${route} -> build${route}/index.html`);
  }
}

console.log('✅ Static pre-rendering completed successfully for all routes.');

