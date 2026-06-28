// Premium Button Ripple Effect
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.primary-btn, .secondary-btn');
  if (!btn) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  ripple.style.left = (e.clientX - rect.left) + 'px';
  ripple.style.top = (e.clientY - rect.top) + 'px';
  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// Modal accessibility polish: focus trap and ESC close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
    document.body.style.overflow = '';
  }
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal') && e.target.classList.contains('show')) {
    e.target.classList.remove('show');
    document.body.style.overflow = '';
  }
});
console.log('TOD Project loaded');

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav');
  if(menuBtn){
    menuBtn.addEventListener('click', ()=>{
      nav.classList.toggle('show');
      menuBtn.classList.toggle('open');
    });
  }

  // Close nav when a link is clicked (mobile)
  nav?.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A'){
      nav.classList.remove('show');
      menuBtn?.classList.remove('open');
    }
  });

  // Modal helpers
  window.openModal = (id)=>{
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.add('show');
    const focusable = modal.querySelector('button, [href], input, textarea, select');
    focusable?.focus();
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = (id)=>{
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  // Close modals on overlay click or Escape
  document.addEventListener('click', (e)=>{
    const modal = e.target.closest('.modal');
    if(modal && e.target === modal && modal.id !== 'categorySelectionModal'){
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal.show').forEach(m=>m.classList.remove('show'));
      document.body.style.overflow = '';
    }
  });

  const serviceMap = {
    'Web Development': {
      description: 'E-commerce, brand websites, and SaaS portals.',
      starting: '₦750,000'
    },
    'App Development': {
      description: 'Mobile apps, launch-ready experiences, and API support.',
      starting: '₦1,050,000'
    },
    'Graphic Design': {
      description: 'Flyer design, print-ready visuals and delivery options.',
      starting: '₦5,000'
    }
  };

  // design categories for Graphic Design
  const designCategories = [
    { name: 'Church Flyer', description: 'Elegant church event flyers with soulful typography.', price: '₦5,000', delivery: '1–3 days', thumb: 'thumb-church-flyer.svg' },
    { name: 'Business Flyer', description: 'Professional business promotions with clean layouts.', price: '₦5,500', delivery: '1–3 days', thumb: 'thumb-business-flyer.svg' },
    { name: 'Event Flyer', description: 'Bold event flyers designed to fill every room.', price: '₦5,500', delivery: '1–3 days', thumb: 'thumb-event-flyer.svg' },
    { name: 'Promo Flyer', description: 'High-converting promo visuals with sharp hierarchy.', price: '₦5,500', delivery: '1–3 days', thumb: 'thumb-promo-flyer.svg' },
    { name: 'Birthday Flyer', description: 'Bright and joyful birthday designs for parties.', price: '₦5,000', delivery: '1–3 days', thumb: 'thumb-birthday-flyer.svg' },
    { name: 'Banner Design', description: 'Large-format banners for digital or print display.', price: '₦6,000', delivery: '2–4 days', thumb: 'thumb-banner-design.svg' },
    { name: 'Frame Design', description: 'Modern frame-style visuals for highlights and promotions.', price: '₦5,200', delivery: '1–3 days', thumb: 'thumb-frame-design.svg' },
    { name: 'Book Cover', description: 'Premium book cover concepts with strong visual impact.', price: '₦8,000', delivery: '2–4 days', thumb: 'thumb-book-cover.svg' },
    { name: 'Jotter Design', description: 'Stylish jotter and notebook layouts for modern brands.', price: '₦6,000', delivery: '2–4 days', thumb: 'thumb-jotter-design.svg' },
    { name: 'Social Media Post', description: 'Engaging social media visuals designed for shares.', price: '₦4,500', delivery: '1–2 days', thumb: 'thumb-social-media-post.svg' },
    { name: 'Logo Design', description: 'Memorable logo concepts with brand-first thinking.', price: '₦10,000', delivery: '2–3 days', thumb: 'thumb-logo-design.svg' },
    { name: 'ID Card', description: 'Smart ID card designs for uniforms and events.', price: '₦5,000', delivery: '1–2 days', thumb: 'thumb-id-card.svg' },
    { name: 'Sticker Design', description: 'Sticker and label designs that pop in stores.', price: '₦4,000', delivery: '1–2 days', thumb: 'thumb-sticker-design.svg' },
    { name: 'Invitation Card', description: 'Elegant invitation layouts for special occasions.', price: '₦6,500', delivery: '2–4 days', thumb: 'thumb-invitation-card.svg' },
    { name: 'Packaging Design', description: 'Premium packaging concepts for memorable unboxing.', price: '₦9,000', delivery: '3–5 days', thumb: 'thumb-packaging-design.svg' },
    { name: 'Website UI Design', description: 'Pixel-perfect website UI design with polished screens.', price: '₦35,000', delivery: '4–7 days', thumb: 'thumb-website-ui-design.svg' },
    { name: 'App UI Design', description: 'Modern, user-first app screen designs for mobile.', price: '₦35,000', delivery: '4–7 days', thumb: 'thumb-app-ui-design.svg' }
  ];

  const webCategories = [
    { name: 'Business Website', description: 'A polished website for brands that need credibility and conversions.', price: '₦950,000', delivery: '3–4 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Responsive pages', 'SEO foundation', 'Contact form', 'Speed optimized'] },
    { name: 'Portfolio Website', description: 'A sharp and personal portfolio to showcase your best work.', price: '₦780,000', delivery: '2–3 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Visual storytelling', 'Showcase layouts', 'Case studies', 'CMS ready'] },
    { name: 'School Website', description: 'A professional school portal with enrollment and news updates.', price: '₦1,100,000', delivery: '4–5 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Admissions page', 'Announcements', 'Staff profiles', 'Event calendar'] },
    { name: 'Church Website', description: 'A welcoming online presence for ministries and church communities.', price: '₦980,000', delivery: '3–4 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Sermon archives', 'Event signups', 'Donation support', 'Community news'] },
    { name: 'E-commerce Website', description: 'A premium storefront built for sales, trust, and fast checkout.', price: '₦1,450,000', delivery: '5–6 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Product catalog', 'Checkout flow', 'Inventory management', 'Analytics'] },
    { name: 'Dashboard System', description: 'A data-driven dashboard for internal teams and operations.', price: '₦1,250,000', delivery: '4–5 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Insights widgets', 'User roles', 'Filters', 'Reports'] },
    { name: 'SaaS Platform', description: 'A scalable SaaS product experience designed to convert users.', price: '₦1,950,000', delivery: '6–8 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Subscription billing', 'User onboarding', 'Product analytics', 'Admin panel'] },
    { name: 'Landing Page', description: 'A high-converting landing page crafted for campaigns.', price: '₦650,000', delivery: '2–3 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Hero section', 'Trust signals', 'Actionable CTA', 'Performance focused'] },
    { name: 'Blog Website', description: 'A modern blog platform for storytelling and editorial content.', price: '₦850,000', delivery: '3–4 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Author profiles', 'Post layouts', 'SEO-ready structure', 'Content editor'] },
    { name: 'Booking System', description: 'A bookings experience for appointments, reservations, and services.', price: '₦1,300,000', delivery: '5–6 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Calendar booking', 'Notifications', 'Admin dashboard', 'Availability rules'] },
    { name: 'Real Estate Website', description: 'A polished property showcase with search and listings.', price: '₦1,400,000', delivery: '5–6 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Property search', 'Agent profiles', 'Map view', 'Lead capture'] },
    { name: 'Company Website', description: 'A strong corporate website for executive and investor audiences.', price: '₦980,000', delivery: '3–4 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Leadership pages', 'Services', 'Case studies', 'Contact forms'] },
    { name: 'Logistics Website', description: 'A logistics platform for shipments, tracking, and operations.', price: '₦1,550,000', delivery: '6–7 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Tracking', 'Shipment dashboard', 'Client portal', 'API intake'] },
    { name: 'Hospital Website', description: 'A trusted healthcare website for clinics and hospitals.', price: '₦1,400,000', delivery: '5–6 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Appointment booking', 'Specialist profiles', 'Patient resources', 'Secure forms'] },
    { name: 'Educational Platform', description: 'A learning portal for courses, students, and content.', price: '₦1,850,000', delivery: '6–8 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Course catalog', 'Student accounts', 'Progress tracking', 'Content CMS'] },
    { name: 'Custom Web App', description: 'A custom app built to solve a specific business problem.', price: '₦1,950,000', delivery: '6–8 weeks', thumb: 'thumb-website-ui-design.svg', highlights: ['Custom workflows', 'API integrations', 'Admin tools', 'Secure architecture'] },
    { name: 'Others', description: 'A tailored web product that does not fit a predefined category.', price: 'Custom', delivery: 'By proposal', thumb: 'thumb-website-ui-design.svg', highlights: ['Discovery session', 'Custom scope', 'Flexible delivery', 'Premium support'] }
  ];

  const appCategories = [
    { name: 'Business App', description: 'A professional app for teams, clients, and business operations.', price: '₦1,250,000', delivery: '4–5 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Authentication', 'Dashboard overview', 'Push notifications', 'Reporting'] },
    { name: 'E-commerce App', description: 'A premium mobile storefront for browsing, cart, and checkout.', price: '₦1,550,000', delivery: '5–6 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Product catalog', 'Payments', 'User wallet', 'Order tracking'] },
    { name: 'School App', description: 'A school app for students, teachers, and parent engagement.', price: '₦1,300,000', delivery: '4–6 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Attendance', 'Assignments', 'Notifications', 'Student profiles'] },
    { name: 'Church App', description: 'A community app for worship, events, giving, and content.', price: '₦1,150,000', delivery: '4–5 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Sermon feed', 'Giving', 'Event signup', 'Prayer wall'] },
    { name: 'Delivery App', description: 'A fast and modern delivery experience for couriers and customers.', price: '₦1,450,000', delivery: '5–6 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Live tracking', 'Route optimization', 'In-app chat', 'Delivery history'] },
    { name: 'Booking App', description: 'A polished booking app for appointments, reservations, and services.', price: '₦1,250,000', delivery: '4–5 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Calendar booking', 'Reminders', 'Payments', 'Availability'] },
    { name: 'Social Media App', description: 'An engaging social app for sharing, messaging, and communities.', price: '₦1,650,000', delivery: '6–7 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Feeds', 'Messaging', 'Profiles', 'Notifications'] },
    { name: 'Health App', description: 'A smart health app for tracking wellness, fitness, and telecare.', price: '₦1,450,000', delivery: '5–6 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Health data', 'Reminders', 'Charts', 'Secure records'] },
    { name: 'Finance App', description: 'A secure finance app for payments, budgets, and analytics.', price: '₦1,550,000', delivery: '5–7 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Wallet', 'Transactions', 'Analytics', 'Security'] },
    { name: 'Chat App', description: 'A modern chat app with messaging, groups, and media sharing.', price: '₦1,400,000', delivery: '5–6 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Realtime chat', 'Groups', 'Media sharing', 'Presence'] },
    { name: 'Learning App', description: 'A learning app for courses, lessons, and progress tracking.', price: '₦1,500,000', delivery: '5–7 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Curriculum', 'Progress', 'Quizzes', 'Offline access'] },
    { name: 'Portfolio App', description: 'A slick mobile portfolio to showcase your work and brand.', price: '₦1,050,000', delivery: '3–4 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Projects gallery', 'Animated sections', 'Contact CTA', 'Brand story'] },
    { name: 'Streaming App', description: 'A premium streaming experience for audio and video content.', price: '₦1,750,000', delivery: '6–8 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Media playback', 'Library', 'Subscriptions', 'Search'] },
    { name: 'POS App', description: 'A point-of-sale app for retail, orders, and payment processing.', price: '₦1,500,000', delivery: '5–7 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Sales', 'Inventory', 'Receipts', 'Reports'] },
    { name: 'Admin Dashboard App', description: 'A mobile admin control center for operations and analytics.', price: '₦1,650,000', delivery: '6–7 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Metrics', 'User roles', 'Alerts', 'Task management'] },
    { name: 'AI App', description: 'A next-gen AI-powered mobile app with smart automation and insights.', price: '₦1,850,000', delivery: '6–8 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['AI assistant', 'Recommendations', 'Data insights', 'Smart workflows'] },
    { name: 'Custom Mobile App', description: 'A custom-built mobile product that matches your exact vision.', price: '₦1,950,000', delivery: '6–8 weeks', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Custom UI', 'Native features', 'Integrations', 'Scalable architecture'] },
    { name: 'Others', description: 'A custom mobile app project that falls outside standard categories.', price: 'Custom', delivery: 'By proposal', thumb: 'thumb-app-ui-design.svg', mobilePreview: 'mockup.svg', highlights: ['Discovery session', 'Custom scope', 'Flexible delivery', 'Premium support'] }
  ];

  let selectedCategory = null;
  let currentService = 'Web Development';

  const graphicPricing = {
    complexity: { Basic: 5000, Standard: 12000, Premium: 20000 },
    printing: { None: 0, 'A4 paper': 500, '4x4 inches': 1200, 'A3 paper': 800 },
    delivery: { Digital: 0, PrintDelivery: 1500, PrintPickup: 500 }
  };

  const dashboardOrders = [];
  let selectedOrderId = null;
  let currentWizardStep = 1;

  const getEl = (id) => document.getElementById(id);

  const formatNaira = (value) => {
    const number = Number(value || 0);
    if(Number.isNaN(number)) return value;
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(number);
  };

  const getCurrentCategories = () => currentService === 'Web Development'
    ? webCategories
    : currentService === 'App Development'
      ? appCategories
      : designCategories;
  const getCategoryDetails = (name) => getCurrentCategories().find(c => c.name === name) || getCurrentCategories()[0] || null;

  // Multi-step wizard functions
  const updateWizardProgress = (step) => {
    const progressPercent = (step / 4) * 100;
    const progressBar = getEl('wizardProgressBar');
    if(progressBar) progressBar.style.width = progressPercent + '%';
  };

  const showWizardStep = (step) => {
    const allSteps = document.querySelectorAll('.wizard-step');
    const allIndicators = document.querySelectorAll('.step-indicator');
    allSteps.forEach(s => s.classList.toggle('hide', Number(s.dataset.step) !== step));
    allIndicators.forEach(i => i.classList.toggle('active', Number(i.dataset.step) === step));
    
    // Show/hide service-specific contact forms on Step 3
    if(step === 3){
      document.querySelectorAll('.web-contact').forEach(el => el.classList.toggle('hide', currentService !== 'Web Development'));
      document.querySelectorAll('.app-contact').forEach(el => el.classList.toggle('hide', currentService !== 'App Development'));
      document.querySelectorAll('.design-contact').forEach(el => el.classList.toggle('hide', currentService !== 'Graphic Design'));
    }
    
    updateWizardProgress(step);
    currentWizardStep = step;
    // Scroll to top of modal
    const modal = getEl('serviceModal');
    if(modal) modal.scrollTop = 0;
  };

  window.nextWizardStep = () => {
    console.log('nextWizardStep called, currentStep:', currentWizardStep);
    if(currentWizardStep < 4) {
      showWizardStep(currentWizardStep + 1);
      updateOrderSummary();
    }
  };

  window.prevWizardStep = () => {
    console.log('prevWizardStep called, currentStep:', currentWizardStep);
    if(currentWizardStep > 1) {
      showWizardStep(currentWizardStep - 1);
    }
  };

  const setGraphicOrderVisibility = (visible) => {
    const panel = getEl('graphicOrderPanel');
    const planGrid = getEl('planGrid');
    if(!panel || !planGrid) return;
    panel.classList.toggle('hide', !visible);
    planGrid.classList.toggle('hide', visible);
    if(visible) {
      currentWizardStep = 1;
      showWizardStep(1);
    }
  };

  // render category cards inside #categoryGrid
  const renderCategoryGrid = () => {
    const grid = getEl('categoryGrid');
    if(!grid) return;
    grid.innerHTML = '';
    getCurrentCategories().forEach(cat => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'category-card';
      card.classList.toggle('selected', selectedCategory === cat.name);
      const img = document.createElement('img');
      img.src = `images/${cat.thumb}`;
      img.alt = cat.name;
      img.loading = 'lazy';
      img.width = 320;
      img.height = 200;
      const wrap = document.createElement('div');
      card.setAttribute('aria-label', cat.name);
      const h = document.createElement('h4'); h.textContent = cat.name;
      const p = document.createElement('p'); p.textContent = cat.description;
      const stats = document.createElement('div');
      stats.className = 'category-card-meta';
      stats.innerHTML = `<span>${cat.delivery}</span><strong>${cat.price}</strong>`;
      const details = document.createElement('div');
      details.className = 'card-details';
      const highlights = (cat.highlights || []).slice(0, 3).map(feature => `<li>${feature}</li>`).join('');
      if(highlights){
        details.innerHTML = `<strong>Highlights</strong><ul>${highlights}</ul>`;
      }
      wrap.appendChild(h); wrap.appendChild(p); wrap.appendChild(stats); wrap.appendChild(details);
      card.appendChild(img); card.appendChild(wrap);
      card.addEventListener('click', ()=> selectCategory(cat.name));
      grid.appendChild(card);
    });
    // add Others card
    const others = document.createElement('button');
    others.type = 'button'; others.className = 'category-card';
    others.innerHTML = `<img src="images/mockup.svg" alt="Others"/><div><h4>Others</h4><p>Didn't find your category? Request a custom quote.</p></div>`;
    others.addEventListener('click', ()=> openModal('otherContactModal'));
    grid.appendChild(others);
  };

  const updatePreviewCard = (details) => {
    if(!details) return;
    getEl('categoryPreviewImage').src = `images/${details.thumb}`;
    getEl('categoryPreviewName').textContent = details.name;
    getEl('categoryPreviewDesc').textContent = details.description;
    getEl('categoryDeliveryTime').textContent = details.delivery;
    getEl('categoryStartingPrice').textContent = details.price;
    const mobilePreview = getEl('categoryPreviewMobile');
    if(mobilePreview){
      mobilePreview.src = `images/${details.mobilePreview || 'service-app.svg'}`;
    }
  };

  const renderCategorySelectionGrid = () => {
    const grid = getEl('categorySelectionGrid');
    if(!grid) return;
    grid.innerHTML = '';
    getCurrentCategories().forEach(cat => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'category-selection-item';
      const img = document.createElement('img');
      img.src = `images/${cat.thumb}`;
      img.alt = cat.name;
      img.loading = 'lazy';
      const h = document.createElement('h4'); h.textContent = cat.name;
      const p = document.createElement('p'); p.textContent = cat.description;
      const meta = document.createElement('div');
      meta.className = 'category-selection-meta';
      meta.innerHTML = `<span>📅 ${cat.delivery}</span><span><strong>${cat.price}</strong></span>`;
      item.appendChild(img);
      item.appendChild(h);
      item.appendChild(p);
      item.appendChild(meta);
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        selectedCategory = cat.name;
        const details = getCategoryDetails(selectedCategory);
        updatePreviewCard(details);
        updateOrderSummary();
        getEl('previewNextBtn').disabled = false;
        closeModal('categorySelectionModal');
        if(currentWizardStep === 1){
          showWizardStep(2);
        }
      });
      grid.appendChild(item);
    });
    // Add Contact for Custom Requests
    const contact = document.createElement('button');
    contact.type = 'button';
    contact.className = 'category-selection-item';
    contact.innerHTML = `<img src="images/mockup.svg" alt="Contact"/><h4>Custom Request</h4><p>Don't see your design type? Let's discuss your custom project.</p><div class="category-selection-meta"><span>📞 Get in touch</span></div>`;
    contact.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal('categorySelectionModal');
      openModal('otherContactModal');
    });
    grid.appendChild(contact);
  };

  getEl('openCategorySelector')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Opening category selector');
    renderCategorySelectionGrid();
    openModal('categorySelectionModal');
  });

  const updateDeliveryAddressVisibility = () => {
    const deliveryOption = getEl('deliveryOption').value;
    const addressField = getEl('deliveryAddressField');
    if(!addressField) return;
    addressField.classList.toggle('hide', deliveryOption === 'Digital');
  };

  const getGraphicPriceValues = () => {
    const complexity = getEl('designComplexity').value;
    const printSize = getEl('printSize').value;
    const quantity = Number(getEl('quantity').value) || 1;
    const deliveryOption = getEl('deliveryOption').value;
    const designPrice = graphicPricing.complexity[complexity] || 0;
    const printingUnit = graphicPricing.printing[printSize] || 0;
    const printingCost = printSize === 'None' ? 0 : printingUnit * quantity;
    const quantityTotal = designPrice * quantity;
    const deliveryFee = deliveryOption === 'Digital' ? 0 : graphicPricing.delivery[deliveryOption];
    const finalTotal = quantityTotal + printingCost + deliveryFee;
    return { designPrice, printingCost, quantityTotal, deliveryFee, finalTotal, quantity, complexity, printSize, deliveryOption };
  };

  const getAppPriceValues = () => {
    const details = getCategoryDetails(selectedCategory);
    const basePrice = Number((details.price || '').replace(/[^0-9]/g, '')) || 0;
    const screens = getEl('appScreens').value;
    const complexity = getEl('appComplexity').value;
    const platform = getEl('appPlatform').value;
    const features = Array.from(document.querySelectorAll('#appFeatureList input[type="checkbox"]:checked')).map(i => i.value);
    const screenMultiplier = screens === '10' ? 1.15 : screens === '15' ? 1.3 : screens === 'Custom' ? 1.45 : 1;
    const complexityMultiplier = complexity === 'Growth' ? 1.12 : complexity === 'Enterprise' ? 1.22 : 1;
    const platformMultiplier = platform === 'iOS + Android' ? 1.18 : platform === 'Cross-platform' ? 1.12 : 1;
    const featureCost = features.length * 30000;
    const finalTotal = Math.max(basePrice * screenMultiplier * complexityMultiplier * platformMultiplier + featureCost, basePrice);
    return { basePrice, finalTotal, screens, complexity, platform, features, featureCost };
  };

  const getWebPriceValues = () => {
    const details = getCategoryDetails(selectedCategory);
    const basePrice = Number((details.price || '').replace(/[^0-9]/g, '')) || 0;
    const pages = getEl('webPages').value;
    const timeline = getEl('webTimeline').value;
    const scope = getEl('webScope').value;
    const features = Array.from(document.querySelectorAll('#webFeatureList input[type="checkbox"]:checked')).map(i => i.value);
    const pageMultiplier = pages === '10' ? 1.15 : pages === '15' ? 1.3 : pages === 'Custom' ? 1.45 : 1;
    const timelineMultiplier = timeline === '4-5 weeks' ? 1.08 : timeline === '6-8 weeks' ? 1.18 : 1;
    const featureCost = features.length * 25000;
    const finalTotal = Math.max(basePrice * pageMultiplier * timelineMultiplier + featureCost, basePrice);
    return { basePrice, finalTotal, pages, timeline, scope, features, featureCost };
  };

  const updateOrderSummary = () => {
    const priceLabel = getEl('priceLabel');
    if(priceLabel){
      priceLabel.textContent = currentService === 'App Development' ? 'Project price' : currentService === 'Web Development' ? 'Development price' : 'Design price';
    }
    if(currentService === 'Web Development'){
      const values = getWebPriceValues();
      getEl('designPrice').textContent = formatNaira(values.basePrice);
      getEl('printingCost').textContent = formatNaira(values.featureCost);
      getEl('quantityTotal').textContent = formatNaira(values.finalTotal);
      getEl('deliveryFee').textContent = formatNaira(0);
      getEl('finalTotal').textContent = formatNaira(values.finalTotal);
      getEl('selectedPlanName').textContent = selectedCategory || 'Web Project';
      getEl('selectedPlanPrice').textContent = formatNaira(values.finalTotal);
      getEl('reviewCategory').textContent = selectedCategory || 'Business Website';
      getEl('reviewComplexity').textContent = values.scope;
      getEl('reviewFormat').textContent = `${values.pages} pages`;
      getEl('reviewQuantity').textContent = 1;
      getEl('reviewPrinting').textContent = values.features.length ? values.features.join(', ') : 'CMS editing';
      getEl('reviewDelivery').textContent = values.timeline;
      getEl('reviewTimeline').textContent = values.timeline;
      getEl('reviewHighlights').textContent = values.features.length ? values.features.join(', ') : 'Responsive UI';
      document.querySelectorAll('.web-only').forEach(el => el.classList.remove('hide'));
      document.querySelectorAll('.app-only').forEach(el => el.classList.add('hide'));
      getEl('reviewFormatItem')?.classList.remove('hide');
      document.querySelectorAll('.design-only').forEach(el => el.classList.add('hide'));
      updateDeliveryAddressVisibility();
      return;
    }

    if(currentService === 'App Development'){
      const values = getAppPriceValues();
      getEl('designPrice').textContent = formatNaira(values.basePrice);
      getEl('printingCost').textContent = formatNaira(values.featureCost);
      getEl('quantityTotal').textContent = formatNaira(values.finalTotal);
      getEl('deliveryFee').textContent = formatNaira(0);
      getEl('finalTotal').textContent = formatNaira(values.finalTotal);
      getEl('selectedPlanName').textContent = selectedCategory || 'Mobile App';
      getEl('selectedPlanPrice').textContent = formatNaira(values.finalTotal);
      getEl('reviewCategory').textContent = selectedCategory || 'Business App';
      getEl('reviewComplexity').textContent = values.complexity;
      getEl('reviewFormat').textContent = values.platform;
      getEl('reviewQuantity').textContent = values.screens;
      getEl('reviewPlatform').textContent = values.platform;
      getEl('reviewScreens').textContent = values.screens;
      getEl('reviewFeatures').textContent = values.features.length ? values.features.join(', ') : 'Core mobile features';
      getEl('reviewPrinting').textContent = values.features.length ? values.features.join(', ') : 'Push notifications';
      getEl('reviewDelivery').textContent = getCategoryDetails(selectedCategory)?.delivery || '5–6 weeks';
      getEl('reviewTimeline').textContent = getCategoryDetails(selectedCategory)?.delivery || '5–6 weeks';
      document.querySelectorAll('.app-only').forEach(el => el.classList.remove('hide'));
      document.querySelectorAll('.web-only').forEach(el => el.classList.add('hide'));
      getEl('reviewFormatItem')?.classList.add('hide');
      document.querySelectorAll('.design-only').forEach(el => el.classList.add('hide'));
      return;
    }

    const values = getGraphicPriceValues();
    getEl('designPrice').textContent = formatNaira(values.designPrice);
    getEl('printingCost').textContent = formatNaira(values.printingCost);
    getEl('quantityTotal').textContent = formatNaira(values.quantityTotal);
    getEl('deliveryFee').textContent = formatNaira(values.deliveryFee);
    getEl('finalTotal').textContent = formatNaira(values.finalTotal);
    getEl('selectedPlanName').textContent = `${getEl('designComplexity').value} Flyer`;
    getEl('selectedPlanPrice').textContent = formatNaira(values.finalTotal);
    updateDeliveryAddressVisibility();
    if(getEl('reviewCategory')) {
      getEl('reviewCategory').textContent = selectedCategory || 'Church Flyer';
      getEl('reviewComplexity').textContent = getEl('designComplexity').value;
      getEl('reviewFormat').textContent = getEl('deliveryFormat').value;
      getEl('reviewQuantity').textContent = values.quantity;
      const printText = getEl('printSize').value === 'None' ? 'Digital only' : getEl('printSize').value;
      getEl('reviewPrinting').textContent = printText;
      getEl('reviewDelivery').textContent = getEl('deliveryOption').value;
      getEl('reviewFormatItem')?.classList.remove('hide');
      document.querySelectorAll('.web-only').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.design-only').forEach(el => el.classList.remove('hide'));
    }
  };

  const validateOrderForm = () => {
    if(currentService === 'Web Development'){
      return ['webBusinessName','webEmail','webDescriptionInstructions'].every(id => {
        const el = getEl(id);
        return el && el.value.trim().length > 0;
      });
    }
    if(currentService === 'App Development'){
      return ['appBusinessName','appEmail','appDescriptionInstructions'].every(id => {
        const el = getEl(id);
        return el && el.value.trim().length > 0;
      });
    }
    const required = ['phoneNumber','whatsappNumber','emailAddress','designInstructions'];
    const deliveryOption = getEl('deliveryOption')?.value;
    if(deliveryOption !== 'Digital'){ required.push('deliveryAddress'); }
    return required.every(id => {
      const el = getEl(id);
      return el && el.value.trim().length > 0;
    });
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(/ /g, '-');
  };

  const selectDashboardOrder = (orderId) => {
    selectedOrderId = orderId;
    renderDashboard();
  };

  const createDashboardOrder = (details) => {
    const order = {
      id: `ODN-${String(dashboardOrders.length + 1).padStart(3, '0')}`,
      service: currentService,
      title: currentService === 'Web Development' ? `${selectedCategory || 'Web Project'}` : `${details.complexity} Flyer`,
      status: 'Pending',
      type: currentService === 'Web Development' ? selectedCategory || 'Web Project' : details.flyerType,
      quantity: currentService === 'Web Development' ? 1 : details.quantity,
      total: formatNaira(details.finalTotal),
      invoice: '',
      files: currentService === 'Web Development' ? ['project-brief.pdf','site-specs.pdf'] : ['design-preview.png','final-delivery.pdf'],
      notifications: ['WhatsApp notification sent', 'Email confirmation sent'],
      progress: ['Pending', 'In Progress', 'Delivered'],
      details
    };
    order.invoice = currentService === 'Web Development' ? `web-${order.id}-invoice.pdf` : `${details.quantity}-flyer-invoice.pdf`;
    dashboardOrders.unshift(order);
    selectedOrderId = order.id;
    renderDashboard();
  };

  const renderDashboard = () => {
    const list = getEl('orderItems');
    const empty = getEl('orderEmpty');
    const detailCard = getEl('orderDetailCard');
    if(!list || !empty || !detailCard) return;
    list.innerHTML = '';
    if(dashboardOrders.length === 0){
      empty.style.display = 'block';
      detailCard.innerHTML = '<p class="muted">Select an order to view tracking, downloads, invoice and reorder options.</p>';
      return;
    }
    empty.style.display = 'none';
    dashboardOrders.forEach(order => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `order-item ${selectedOrderId === order.id ? 'active' : ''}`;
      item.innerHTML = `<strong>${order.title}</strong><span>${order.type} · ${order.quantity} qty</span><span class="order-status ${getStatusClass(order.status)}">${order.status}</span>`;
      item.addEventListener('click', () => selectDashboardOrder(order.id));
      list.appendChild(item);
    });

    const order = dashboardOrders.find(o => o.id === selectedOrderId) || dashboardOrders[0];
    if(!order) return;
    selectedOrderId = order.id;
    let progressHtml = order.progress.map((step, index) => {
      const active = order.status === step || order.progress.indexOf(order.status) > index;
      return `<div class="progress-step ${getStatusClass(step)} ${active ? 'active' : ''}"><span>${step}</span></div>`;
    }).join('');
    detailCard.innerHTML = `
      <div class="order-detail"><strong>Order #${order.id}</strong><span>Status: ${order.status}</span></div>
      <div class="order-summary-grid">
        <div class="order-detail"><span>Service</span><strong>${order.service}</strong></div>
        <div class="order-detail"><span>${order.service === 'Web Development' ? 'Project' : 'Flyer type'}</span><strong>${order.type}</strong></div>
        <div class="order-detail"><span>Quantity</span><strong>${order.quantity}</strong></div>
        <div class="order-detail"><span>Total</span><strong>${order.total}</strong></div>
      </div>
      <div class="order-timeline">${progressHtml}</div>
      <div class="order-actions">
        <button class="secondary-btn" data-action="download">Download Files</button>
        <button class="secondary-btn" data-action="invoice">View Invoice</button>
        <button class="secondary-btn" data-action="reorder">Reorder</button>
        <button class="secondary-btn" data-action="chat">Chat Admin</button>
      </div>
      <div class="order-notifications">
        <p>${order.notifications.join(' · ')}</p>
      </div>
    `;
    detailCard.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        if(action === 'download'){
          getEl('paymentStatus').textContent = `Downloading ${order.files.join(', ')}...`;
        }
        if(action === 'invoice'){
          getEl('paymentStatus').textContent = `Opening invoice for ${order.id}...`;
        }
        if(action === 'reorder'){
          openServiceModal(order.service);
          getEl('designInstructions').value = order.details.instructions || '';
          updateOrderSummary();
        }
        if(action === 'chat'){
          getEl('paymentStatus').textContent = 'Admin chat opened. A reply will arrive shortly via WhatsApp and email.';
        }
      });
    });
  };

  window.openServiceModal = (serviceName) => {
    const service = serviceMap[serviceName] ? serviceName : 'Web Development';
    const data = serviceMap[service];
    const modal = getEl('serviceModal');
    if(!modal) return;

    modal.querySelectorAll('.service-group').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.service === service);
    });

    getEl('serviceSelected').textContent = service;
    getEl('serviceDescription').textContent = data.description;
    getEl('serviceStarting').textContent = data.starting;

    if(service === 'Graphic Design'){
      currentService = 'Graphic Design';
      selectedCategory = designCategories[0].name;
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      updateOrderSummary();
      getEl('categoryGrid').classList.remove('hide');
      setGraphicOrderVisibility(true);
      document.querySelectorAll('.web-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.design-customization').forEach(el => el.classList.remove('hide'));
      getEl('previewNextBtn').disabled = false;
      getEl('selectedPlanName').textContent = 'Custom flyer';
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
    } else if(service === 'Web Development'){
      currentService = 'Web Development';
      selectedCategory = webCategories[0].name;
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      updateOrderSummary();
      getEl('categoryGrid').classList.remove('hide');
      setGraphicOrderVisibility(true);
      document.querySelectorAll('.design-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.app-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.web-customization').forEach(el => el.classList.remove('hide'));
      getEl('previewNextBtn').disabled = false;
      getEl('selectedPlanName').textContent = selectedCategory;
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
    } else if(service === 'App Development'){
      currentService = 'App Development';
      selectedCategory = appCategories[0].name;
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      updateOrderSummary();
      getEl('categoryGrid').classList.remove('hide');
      setGraphicOrderVisibility(true);
      document.querySelectorAll('.design-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.web-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.app-customization').forEach(el => el.classList.remove('hide'));
      getEl('previewNextBtn').disabled = false;
      getEl('selectedPlanName').textContent = selectedCategory;
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
    } else {
      setGraphicOrderVisibility(false);
      const firstCard = modal.querySelector(`.plan-card[data-service="${service}"]`);
      if(firstCard){ selectPlanCard(firstCard); }
      getEl('payNowBtn').textContent = 'Pay with Paystack';
    }

    openModal('serviceModal');
  };

  const selectCategory = (cat) => {
    selectedCategory = cat;
    renderCategoryGrid();
    getEl('previewNextBtn').disabled = false;
    const details = getCategoryDetails(cat);
    updatePreviewCard(details);
    updateOrderSummary();
    if(currentWizardStep === 1){
      showWizardStep(2);
    }
  };

  // handle "Others" modal submission
  getEl('sendOtherRequest')?.addEventListener('click', ()=>{
    const payload = { name: getEl('otherName')?.value, whatsapp: getEl('otherWhatsApp')?.value, email: getEl('otherEmail')?.value, details: getEl('otherDetails')?.value, budget: getEl('otherBudget')?.value };
    if(!payload.name || !payload.email) { alert('Please provide name and email'); return; }
    // simulate sending and creating a dashboard ticket
    const details = { complexity: 'Custom', flyerType: payload.details || 'Custom', quantity: 1, finalTotal: 0 };
    createDashboardOrder(details);
    closeModal('otherContactModal');
    getEl('paymentStatus').textContent = 'Custom request sent. We will contact you via WhatsApp and email.';
  });

  const selectPlanCard = (card) => {
    if(!card) return;
    const modal = getEl('serviceModal');
    if(!modal) return;

    modal.querySelectorAll('.plan-card').forEach(c => {
      c.classList.toggle('selected', c === card);
      c.classList.toggle('hidden', c.dataset.service !== card.dataset.service);
    });

    const planName = card.dataset.plan || 'Starter';
    const planPrice = card.dataset.price || '0';
    const displayPrice = formatNaira(planPrice);

    getEl('selectedPlanName').textContent = planName;
    getEl('selectedPlanPrice').textContent = displayPrice;

    const payBtn = getEl('payNowBtn');
    if(payBtn){
      payBtn.disabled = false;
      payBtn.textContent = 'Pay with Paystack';
    }

    getEl('paymentStatus').textContent = `Ready to pay ${displayPrice} for ${planName}.`;
  };

  const updateServiceGroup = (serviceName) => {
    const modal = getEl('serviceModal');
    if(!modal) return;

    modal.querySelectorAll('.service-group').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.service === serviceName);
    });

    getEl('serviceSelected').textContent = serviceName;
    getEl('serviceDescription').textContent = serviceMap[serviceName].description;
    getEl('serviceStarting').textContent = serviceMap[serviceName].starting;

    if(serviceName === 'Graphic Design'){
      currentService = 'Graphic Design';
      selectedCategory = designCategories[0].name;
      setGraphicOrderVisibility(true);
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      document.querySelectorAll('.web-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.design-customization').forEach(el => el.classList.remove('hide'));
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
      updateOrderSummary();
    } else if(serviceName === 'Web Development'){
      currentService = 'Web Development';
      selectedCategory = webCategories[0].name;
      setGraphicOrderVisibility(true);
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      document.querySelectorAll('.design-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.app-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.web-customization').forEach(el => el.classList.remove('hide'));
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
      updateOrderSummary();
    } else if(serviceName === 'App Development'){
      currentService = 'App Development';
      selectedCategory = appCategories[0].name;
      setGraphicOrderVisibility(true);
      renderCategoryGrid();
      updatePreviewCard(getCategoryDetails(selectedCategory));
      document.querySelectorAll('.design-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.web-customization').forEach(el => el.classList.add('hide'));
      document.querySelectorAll('.app-customization').forEach(el => el.classList.remove('hide'));
      getEl('payNowBtn').textContent = 'Place order';
      getEl('payNowBtn').disabled = !validateOrderForm();
      updateOrderSummary();
    } else {
      setGraphicOrderVisibility(false);
      const firstCard = modal.querySelector(`.plan-card[data-service="${serviceName}"]`);
      if(firstCard){ selectPlanCard(firstCard); }
      getEl('payNowBtn').textContent = 'Pay with Paystack';
    }
  };

  document.querySelectorAll('.service-group').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      updateServiceGroup(btn.dataset.service);
    });
  });

  document.querySelectorAll('.service-card button[data-service]').forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      openServiceModal(btn.dataset.service);
    });
  });

  document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('click', () => selectPlanCard(card));
  });

  getEl('payNowBtn')?.addEventListener('click', (e) => {
    const payBtn = e.currentTarget;
    if(payBtn.disabled) return;
    if(currentService === 'Graphic Design'){
      const details = getGraphicPriceValues();
      details.flyerType = selectedCategory || 'Flyer';
      details.deliveryFormat = getEl('deliveryFormat').value;
      details.instructions = getEl('designInstructions').value;
      details.phone = getEl('phoneNumber').value;
      details.whatsapp = getEl('whatsappNumber').value;
      details.email = getEl('emailAddress').value;
      details.address = getEl('deliveryAddress').value;
      payBtn.disabled = true;
      payBtn.textContent = 'Placing order…';
      getEl('paymentStatus').textContent = 'Creating your order and sending notifications...';
      setTimeout(() => {
        createDashboardOrder(details);
        payBtn.textContent = 'Pay with Paystack';
        payBtn.disabled = false;
        getEl('paymentStatus').textContent = 'Order placed. WhatsApp and email notifications sent.';
        closeModal('serviceModal');
      }, 1400);
      return;
    }

    if(currentService === 'Web Development'){
      const details = getWebPriceValues();
      details.businessName = getEl('webBusinessName').value;
      details.domain = getEl('webDomain').value;
      details.email = getEl('webEmail').value;
      details.description = getEl('webDescriptionInstructions').value;
      details.category = selectedCategory;
      payBtn.disabled = true;
      payBtn.textContent = 'Placing order…';
      getEl('paymentStatus').textContent = 'Creating your web project quote...';
      setTimeout(() => {
        createDashboardOrder(details);
        payBtn.textContent = 'Place order';
        payBtn.disabled = false;
        getEl('paymentStatus').textContent = 'Order placed. Email notification sent.';
        closeModal('serviceModal');
      }, 1400);
      return;
    }

    if(currentService === 'App Development'){
      const details = getAppPriceValues();
      details.businessName = getEl('appBusinessName').value;
      details.email = getEl('appEmail').value;
      details.targetMarket = getEl('appTargetMarket').value;
      details.description = getEl('appDescriptionInstructions').value;
      details.category = selectedCategory;
      payBtn.disabled = true;
      payBtn.textContent = 'Placing order…';
      getEl('paymentStatus').textContent = 'Creating your app project quote...';
      setTimeout(() => {
        createDashboardOrder(details);
        payBtn.textContent = 'Place order';
        payBtn.disabled = false;
        getEl('paymentStatus').textContent = 'Order placed. Email notification sent.';
        closeModal('serviceModal');
      }, 1400);
      return;
    }

    if(payBtn.disabled) return;
    payBtn.disabled = true;
    payBtn.textContent = 'Processing…';
    getEl('paymentStatus').textContent = 'Contacting Paystack…';

    setTimeout(() => {
      getEl('paymentStatus').textContent = 'Payment pending. You will receive a confirmation once your order is queued.';
      payBtn.textContent = 'Pay with Paystack';
      payBtn.disabled = false;
    }, 1400);
  });

  // Confirm order button for step 4
  getEl('confirmOrderBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if(!validateOrderForm()) { alert('Please fill in all required fields'); return; }
    const details = currentService === 'Web Development' ? getWebPriceValues() : getGraphicPriceValues();
    details.flyerType = selectedCategory || 'Flyer';
    details.instructions = getEl('designInstructions').value;
    details.phone = getEl('phoneNumber').value;
    details.whatsapp = getEl('whatsappNumber').value;
    details.email = getEl('emailAddress').value;
    details.address = getEl('deliveryAddress')?.value;
    e.currentTarget.disabled = true;
    e.currentTarget.textContent = 'Placing order…';
    getEl('paymentStatus').textContent = 'Creating your order and sending notifications...';
    setTimeout(() => {
      createDashboardOrder(details);
      closeModal('serviceModal');
      getEl('paymentStatus').textContent = 'Order placed successfully! Check your email and WhatsApp for confirmation.';
    }, 1000);
  });

  // Wire input changes to update pricing
  const inputIds = ['deliveryFormat','designComplexity','printSize','quantity','deliveryOption','phoneNumber','whatsappNumber','emailAddress','deliveryAddress','designInstructions','webScope','webPages','webTimeline'];
  inputIds.forEach(id => {
    const el = getEl(id);
    if(!el) return;
    el.addEventListener('input', () => {
      updateOrderSummary();
      updateDeliveryAddressVisibility();
    });
  });

const servicesNavLink = document.querySelector('.nav a[href="#services"]');
if(servicesNavLink){
  servicesNavLink.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector('.nav')?.classList.remove('show');
    document.querySelector('.menu-btn')?.classList.remove('open');
    openServiceModal('Web Development');
  });
}

renderDashboard();

// Additional interactions: testimonial slider, onboarding steps, service card micro-interactions

// Additional interactions: testimonial slider, onboarding steps, service card micro-interactions
(function(){
  // Testimonial slider
  const testimonials = Array.from(document.querySelectorAll('.testimonial'));
  let tIndex = 0; let tInterval = null;
  function showTestimonial(i){
    testimonials.forEach((t, idx)=> t.classList.toggle('active', idx===i));
  }
  function startSlider(){
    if(!testimonials.length) return;
    showTestimonial(tIndex);
    tInterval = setInterval(()=>{
      tIndex = (tIndex+1) % testimonials.length; showTestimonial(tIndex);
    },4000);
  }
  function stopSlider(){ clearInterval(tInterval); tInterval = null; }
  startSlider();
  document.querySelector('.testimonial-slider')?.addEventListener('mouseenter', stopSlider);
  document.querySelector('.testimonial-slider')?.addEventListener('mouseleave', startSlider);

  // Onboarding flow
  document.querySelectorAll('#onboardModal .onboard-actions .secondary-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const modal = document.getElementById('onboardModal');
      modal.querySelector('.onboard-step[data-step="1"]').classList.add('hide');
      modal.querySelector('.onboard-step[data-step="2"]').classList.remove('hide');
      modal.querySelector('#brief')?.focus();
    });
  });
  document.getElementById('submitBrief')?.addEventListener('click', ()=>{
    const brief = document.getElementById('brief')?.value || '';
    console.log('Onboard brief:', brief);
    closeModal('onboardModal');
  });

  // Quick start behavior
  document.getElementById('quickStart')?.addEventListener('click', ()=>{
    const input = document.getElementById('projectInput');
    if(input){ input.value = 'New project — landing page'; }
    openModal('onboardModal');
  });

  // Service card subtle tilt (pointer-based)
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('pointermove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-y*6).toFixed(2)}deg) rotateY(${(x*6).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', ()=>{
      card.style.transform = ''; card.style.transition = 'transform .45s cubic-bezier(.2,.9,.2,1)';
      setTimeout(()=>card.style.transition = '',500);
    });
  });
})();

// Robust global CTA & modal delegation (fallback safety net)
(function(){
  function safeGetIdAttr(el, attr){
    // read from dataset or attribute
    return el?.dataset?.[attr] ?? el?.getAttribute('data-' + attr.replace(/[A-Z]/g, m => '-' + m.toLowerCase()));
  }

  document.addEventListener('click', (e) => {
    try {
      const btn = e.target.closest('[data-open-modal], [data-close-modal], [data-scroll-to], [data-service], [data-action]');
      if(!btn) return;

      // open modal
      const openId = safeGetIdAttr(btn, 'openModal');
      if(openId){
        // prefer App.modal if available
        if(window.App && App.modal && typeof App.modal.open === 'function'){
          App.modal.open(openId);
        } else if(typeof openModal === 'function'){
          openModal(openId);
        } else {
          const m = document.getElementById(openId);
          if(m) { m.classList.add('show'); document.body.style.overflow = 'hidden'; }
        }
        return;
      }

      // close modal
      if(btn.hasAttribute('data-close-modal')){
        const modal = btn.closest('.modal');
        if(modal){
          if(window.App && App.modal && typeof App.modal.close === 'function') App.modal.close(modal.id);
          else modal.classList.remove('show');
          document.body.style.overflow = '';
        }
        return;
      }

      // scroll to
      const scrollTo = safeGetIdAttr(btn, 'scrollTo');
      if(scrollTo){
        const target = document.getElementById(scrollTo);
        if(target) target.scrollIntoView({behavior:'smooth'});
        return;
      }

      // open service modal via data-service
      const svc = safeGetIdAttr(btn, 'service');
      if(svc){
        if(typeof openServiceModal === 'function') openServiceModal(svc);
        else if(typeof App !== 'undefined' && App.modal) App.modal.open('serviceModal');
        return;
      }

      // generic actions
      const action = safeGetIdAttr(btn, 'action');
      if(action){
        // dispatch a CustomEvent so other modules can listen
        window.dispatchEvent(new CustomEvent('cta-action', { detail:{ action, el: btn } }));
      }

    } catch(err){
      console.error('CTA delegation error', err);
    }
  }, { passive: true });

  // helpful dev-time log: ensure main modals exist
  ['serviceModal','onboardModal','trainingPreviewModal','contact-cta-modal'].forEach(id=>{
    if(!document.getElementById(id)) console.info('Note: modal not present in DOM ->', id);
  });
})();

/* Desktop hero parallax & cinematic reveal (Phase 3) */
(function(){
  const mq = window.matchMedia('(min-width:1200px)');
  if(!mq.matches) return;

  const hero = document.querySelector('.desktop-hero');
  const visual = document.querySelector('.desktop-visual-wrap');
  if(!hero || !visual) return;

  let raf = null;
  const state = {mx:0,my:0,tx:0,ty:0};

  function onMove(e){
    const rect = hero.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    state.mx = dx; state.my = dy;
    if(!raf) raf = requestAnimationFrame(applyParallax);
  }

  function applyParallax(){
    raf = null;
    // subtle pixel translation based on mouse pos
    const tx = (state.mx * 32);
    const ty = (state.my * 20);
    visual.style.setProperty('--tx', tx + 'px');
    visual.style.setProperty('--ty', ty + 'px');
    // layered depth multipliers for more realistic parallax
    const layers = [ {sel:'.mockup-main', d:1}, {sel:'.mockup-analytics', d:0.62}, {sel:'.mockup-note', d:0.36} ];
    layers.forEach(l=>{
      document.querySelectorAll(l.sel).forEach(el=>{
        el.style.transform = `translate3d(calc(var(--tx,0px) * ${l.d}), calc(var(--ty,0px) * ${l.d}), 0) rotateX(${(state.my*2).toFixed(2)}deg) rotateY(${(state.mx*2).toFixed(2)}deg)`;
      })
    });
  }

  // Staggered reveal when hero enters viewport
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        hero.classList.add('ready');
        obs.unobserve(hero);
      }
    })
  },{threshold:0.12});
  obs.observe(hero);

  // Only attach mousemove on desktop
  window.addEventListener('mousemove', onMove, {passive:true});

  // Clean up on unload
  window.addEventListener('beforeunload', ()=>{
    window.removeEventListener('mousemove', onMove);
    cancelAnimationFrame(raf);
  });
})();

/* Graph and UI micro-animations for realism */
(function(){
  const mq = window.matchMedia('(min-width:1200px)');
  if(!mq.matches) return;

  // Animate numeric stats inside mockup
  function animateStat(el, from, to, duration){
    const start = performance.now();
    function tick(now){
      const t = Math.min(1, (now - start)/duration);
      const val = Math.floor(from + (to - from) * t);
      el.textContent = val + (el.dataset.suffix||'');
      if(t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  document.querySelectorAll('.stat-num').forEach((node)=>{
    // parse initial numbers where possible
    const txt = node.textContent.trim();
    const match = txt.match(/(\+?\d+[\.,]?\d*)/);
    if(match){
      const to = parseInt(match[1].replace(/[^0-9]/g,''),10)||0;
      node.dataset.suffix = node.textContent.replace(match[0],'').trim();
      node.textContent = '0'+node.dataset.suffix;
      setTimeout(()=> animateStat(node, 0, to, 1200), 800);
    }
  });

  // Gentle graph pulse by toggling opacity of .graph-pulse
  const gp = document.querySelector('.graph-pulse');
  if(gp){
    let dir = 0; let t = 0;
    setInterval(()=>{
      t = (t + 0.09) % (Math.PI*2);
      gp.style.opacity = 0.28 + Math.sin(t) * 0.06;
      gp.style.transform = `translate3d(${Math.sin(t)*6}px, ${Math.cos(t)*3}px,0)`;
    }, 90);
  }

})();

/* Magnetic CTA micro-interaction (lightweight) */
(function(){
  const mq = window.matchMedia('(min-width:1200px)');
  if(!mq.matches) return;
  let rafId = null;
  let hoverState = null;
  document.addEventListener('mousemove', (e)=>{
    if(!hoverState) return;
    hoverState.mx = e.clientX; hoverState.my = e.clientY;
    if(!rafId) rafId = requestAnimationFrame(()=>{
      const btn = hoverState.el;
      const rect = btn.getBoundingClientRect();
      const dx = (hoverState.mx - (rect.left + rect.width/2)) / rect.width;
      const dy = (hoverState.my - (rect.top + rect.height/2)) / rect.height;
      btn.style.transform = `translate3d(${dx*8}px, ${dy*6}px, 0) scale(1.02)`;
      rafId = null;
    });
  }, {passive:true});

  document.querySelectorAll('.desktop-cta').forEach(btn=>{
    btn.addEventListener('mouseenter', (e)=>{ hoverState = {el:btn,mx:0,my:0}; btn.style.transition = 'transform .18s cubic-bezier(.22,.61,.36,1)'; });
    btn.addEventListener('mouseleave', (e)=>{ hoverState = null; btn.style.transform=''; btn.style.transition = 'transform .4s cubic-bezier(.22,.61,.36,1)'; });
  });
})();
/* ============================================
   PREMIUM ABOUT & PORTFOLIO INTERACTIONS
   ============================================ */

// Portfolio Filter
(function(){
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCases = document.querySelectorAll('.portfolio-case-study');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      portfolioCases.forEach(caseItem => {
        if(filter === 'all') {
          caseItem.style.display = 'flex';
          setTimeout(() => caseItem.style.opacity = '1', 10);
        } else {
          const categories = caseItem.dataset.category.split(' ');
          if(categories.includes(filter)) {
            caseItem.style.display = 'flex';
            setTimeout(() => caseItem.style.opacity = '1', 10);
          } else {
            caseItem.style.opacity = '0';
            setTimeout(() => caseItem.style.display = 'none', 300);
          }
        }
      });
    });
  });
  
  portfolioCases.forEach(caseItem => {
    caseItem.style.opacity = '1';
    caseItem.style.transition = 'opacity .3s ease';
  });
})();

// Animated Statistics Counter
(function(){
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const animateNumbers = () => {
    if(hasAnimated) return;
    hasAnimated = true;
    
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const increment = target / 60;
      
      const timer = setInterval(() => {
        current += increment;
        if(current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 30);
    });
  };

  // Trigger animation when stats section enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        animateNumbers();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsContainer = document.querySelector('.stats-container');
  if(statsContainer) {
    observer.observe(statsContainer);
  }
})();

// Contact Form Handler
window.handleContactSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  
  btn.disabled = true;
  btn.textContent = 'Sending...';
  
  setTimeout(() => {
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    
    console.log('Contact form submitted:', {
      name: name,
      email: form.querySelector('input[type="email"]').value,
      whatsapp: form.querySelector('input[type="tel"]').value,
      service: form.querySelector('select').value,
      message: form.querySelector('textarea').value
    });
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position:fixed;
      bottom:20px;
      right:20px;
      background:rgba(110,231,247,0.15);
      border:1px solid rgba(110,231,247,0.3);
      color:var(--accent-1);
      padding:16px 20px;
      border-radius:14px;
      z-index:999;
      backdrop-filter:blur(12px);
      animation:slideInUp .3s ease;
    `;
    successMsg.textContent = `✓ Thanks ${name}! We'll be in touch soon.`;
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.style.animation = 'slideOutDown .3s ease';
      setTimeout(() => successMsg.remove(), 300);
    }, 3000);
    
    form.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
    
    // Close modal
    const modal = form.closest('.modal');
    if(modal) modal.classList.remove('show');
  }, 1200);
};

// Close modals on Escape or background click
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    document.querySelectorAll('.modal.show').forEach(m => m.classList.remove('show'));
  }
});

document.addEventListener('click', (e) => {
  if(e.target.classList.contains('modal')) {
    e.target.classList.remove('show');
  }
});

// Intersection Observer for fade-in animations
(function(){
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.about-card, .portfolio-case-study, .timeline-item, .mission-card, .benefit-card, .skill-category, .award-card, .trust-logo').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all .5s cubic-bezier(.2,.9,.2,1)';
    observer.observe(el);
  });
})();

// ==================== PREMIUM SEARCH SYSTEM ====================

(function(){
  const searchTrigger = document.getElementById('searchTrigger');
  const floatingSearch = document.getElementById('floatingSearch');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const searchOverlay = document.getElementById('searchOverlay');
  const recentGroup = document.getElementById('recentGroup');
  const recentSearches = document.getElementById('recentSearches');

  const STORAGE_KEY = 'odun-recent-searches';
  const MAX_RECENT = 5;
  let selectedItemIndex = -1;
  let visibleItems = [];

  // Open search modal
  function openSearch() {
    searchModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 100);
    loadRecentSearches();
  }

  // Close search modal
  function closeSearch() {
    searchModal.classList.remove('show');
    document.body.style.overflow = '';
    searchInput.value = '';
    selectedItemIndex = -1;
    searchClear.style.display = 'none';
    clearSelection();
  }

  // Event listeners
  if(searchTrigger) searchTrigger.addEventListener('click', openSearch);
  if(floatingSearch) floatingSearch.addEventListener('click', openSearch);
  if(searchClose) searchClose.addEventListener('click', closeSearch);
  if(searchOverlay) searchOverlay.addEventListener('click', closeSearch);

  // Clear search
  if(searchClear) {
    searchClear.addEventListener('click', (e) => {
      e.stopPropagation();
      searchInput.value = '';
      searchClear.style.display = 'none';
      performSearch('');
      setTimeout(() => searchInput.focus(), 0);
    });
  }

  // Search input
  if(searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      searchClear.style.display = query ? 'flex' : 'none';
      performSearch(query);
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', (e) => {
      const itemCount = visibleItems.length;
      
      if(e.key === 'ArrowDown') {
        e.preventDefault();
        selectedItemIndex = Math.min(selectedItemIndex + 1, itemCount - 1);
        updateSelection();
      } else if(e.key === 'ArrowUp') {
        e.preventDefault();
        selectedItemIndex = Math.max(selectedItemIndex - 1, -1);
        updateSelection();
      } else if(e.key === 'Enter' && selectedItemIndex >= 0) {
        e.preventDefault();
        activateItem(visibleItems[selectedItemIndex]);
      } else if(e.key === 'Escape') {
        closeSearch();
      }
    });
  }

  // Perform search
  function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    visibleItems = [];
    selectedItemIndex = -1;

    // Get all search items
    const allItems = document.querySelectorAll('.search-item');
    
    // If no query, show all default items
    if(!query.trim()) {
      allItems.forEach(item => {
        item.style.display = 'flex';
        visibleItems.push(item);
      });
      return;
    }

    // Filter items
    allItems.forEach(item => {
      const title = item.querySelector('.search-item-title')?.textContent.toLowerCase() || '';
      const description = item.querySelector('.search-item-description')?.textContent.toLowerCase() || '';
      
      if(title.includes(lowerQuery) || description.includes(lowerQuery)) {
        item.style.display = 'flex';
        visibleItems.push(item);
      } else {
        item.style.display = 'none';
      }
    });

    // Show/hide empty state
    const suggestionsEmpty = visibleItems.length === 0;
    if(suggestionsEmpty && query.trim()) {
      // Could add "no results" message here
    }
  }

  // Update selection styling
  function updateSelection() {
    clearSelection();
    if(selectedItemIndex >= 0 && visibleItems[selectedItemIndex]) {
      visibleItems[selectedItemIndex].classList.add('selected');
      visibleItems[selectedItemIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Clear selection
  function clearSelection() {
    visibleItems.forEach(item => item.classList.remove('selected'));
  }

  // Activate item
  function activateItem(item) {
    const type = item.dataset.searchType;
    const target = item.dataset.searchTarget;
    const title = item.querySelector('.search-item-title')?.textContent?.trim() || '';

    // Navigation items -> scroll to section or open contact modal
    if(type === 'navigation') {
      closeSearch();
      if(target === 'contact') {
        // Open contact modal if present
        const contactModal = document.getElementById('contact-cta-modal');
        if(contactModal) {
          contactModal.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
        return;
      }

      const element = document.getElementById(target);
      if(element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 120);
      }
      return;
    }

    // Service or category -> go to Services section and highlight matching card
    if(type === 'service' || type === 'category') {
      const servicesSection = document.getElementById('services') || document.querySelector('.services');
      if(servicesSection) {
        closeSearch();
        setTimeout(() => {
          servicesSection.scrollIntoView({ behavior: 'smooth' });

          if(title) {
            // Try to find a matching service card (by h3 text)
            const cards = Array.from(servicesSection.querySelectorAll('.service-card'));
            const match = cards.find(c => (c.querySelector('h3')?.textContent || '').trim().toLowerCase() === title.toLowerCase());
            if(match) {
              match.classList.add('highlighted');
              match.scrollIntoView({ behavior: 'smooth', block: 'center' });
              setTimeout(() => match.classList.remove('highlighted'), 2400);
            }
          }
        }, 160);
      } else {
        // fallback: just add to recent and close
        if(title) addRecentSearch(title);
        closeSearch();
      }

      if(title) addRecentSearch(title);
      return;
    }

    // default: add to recent searches
    if(title) addRecentSearch(title);
  }

  // Recent searches management
  function addRecentSearch(query) {
    if(!query.trim()) return;

    let searches = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    // Remove if already exists
    searches = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
    
    // Add to beginning
    searches.unshift(query);
    
    // Keep only recent
    searches = searches.slice(0, MAX_RECENT);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  }

  function loadRecentSearches() {
    const searches = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    
    if(searches.length === 0) {
      recentGroup.style.display = 'none';
      return;
    }

    recentGroup.style.display = 'block';
    recentSearches.innerHTML = '';

    searches.forEach(search => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `
        <div class="search-item-icon"><i class="fa-solid fa-clock"></i></div>
        <div class="search-item-content">
          <div class="search-item-title">${search}</div>
        </div>
        <div class="search-item-shortcut">→</div>
      `;
      item.addEventListener('click', () => {
        const q = (search || '').trim();
        if(!q) return;

        const lower = q.toLowerCase();

        // If query looks like a service (web, app, design, e-commerce, saas)
        if(/web|app|design|e-?commerce|saas|graphic/.test(lower)){
          closeSearch();
          const servicesSection = document.getElementById('services') || document.querySelector('.services');
          if(servicesSection){
            setTimeout(()=>{
              servicesSection.scrollIntoView({behavior:'smooth'});
              const cards = Array.from(servicesSection.querySelectorAll('.service-card'));
              const match = cards.find(c => {
                const t = (c.querySelector('h3')?.textContent || '').trim().toLowerCase();
                return t === lower || t.includes(lower) || lower.includes(t.split(' ')[0]);
              });
              if(match){
                match.classList.add('highlighted');
                match.scrollIntoView({behavior:'smooth', block:'center'});
                setTimeout(()=>match.classList.remove('highlighted'), 2400);
              }
            }, 120);
          }
          addRecentSearch(q);
          return;
        }

        // If query matches a navigation target
        if(/about|portfolio|contact|training|services/.test(lower)){
          closeSearch();
          if(lower.includes('contact')){
            const contactModal = document.getElementById('contact-cta-modal');
            if(contactModal){ contactModal.classList.add('show'); document.body.style.overflow = 'hidden'; }
            return;
          }
          const id = lower.includes('services') ? 'services' : (lower.includes('portfolio') ? 'portfolio' : (lower.includes('about') ? 'about' : (lower.includes('training') ? 'training' : null)));
          if(id){ const el = document.getElementById(id); if(el) setTimeout(()=>el.scrollIntoView({behavior:'smooth'}), 120); }
          addRecentSearch(q);
          return;
        }

        // Fallback: perform a search and close
        searchInput.value = q;
        performSearch(q);
        addRecentSearch(q);
        closeSearch();
      });
      recentSearches.appendChild(item);
    });
  }

  // Keyboard shortcut (⌘K / Ctrl+K)
  document.addEventListener('keydown', (e) => {
    if((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if(searchModal.classList.contains('show')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  // Floating search icon on scroll
  let scrollTimeout;
  let isScrolling = false;
  let lastScrollTop = 0;

  function handleScroll() {
    const scrollTop = window.scrollY;
    const scrollThreshold = 300;
    const isScrollingDown = scrollTop > lastScrollTop;

    if(scrollTop > scrollThreshold) {
      if(!floatingSearch.classList.contains('show')) {
        floatingSearch.classList.add('show');
      }
    } else {
      if(floatingSearch.classList.contains('show')) {
        floatingSearch.classList.remove('show');
      }
    }

    lastScrollTop = scrollTop;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, 100);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Item click handling
  document.addEventListener('click', (e) => {
    const searchItem = e.target.closest('.search-item');
    if(searchItem && searchModal.classList.contains('show')) {
      activateItem(searchItem);
    }
  });
  // expose search controls for other modules
  window.SearchController = {
    open: openSearch,
    close: closeSearch,
    perform: performSearch,
    addRecent: addRecentSearch
  };

  console.log('Premium Search System loaded');
})();

// Add animation styles to head
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideOutDown {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(20px); opacity: 0; }
  }
  .portfolio-case-study {
    opacity: 1;
    transition: all .3s cubic-bezier(.2,.9,.2,1);
  }
`;
document.head.appendChild(style);

console.log('Premium About & Portfolio features loaded');

// App-level controller: nav, performance, and global init
const App = {
  init(){
    this.nav.init();
  },
  modals: {
    init(){
      // Event delegation for modal opens
      document.addEventListener('click', (e) => {
        const openBtn = e.target.closest('[data-open-modal]');
        if(openBtn){
          const modalId = openBtn.dataset.openModal;
          if(modalId) App.modal.open(modalId);
        }
      });

      // Event delegation for modal closes
      document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('[data-close-modal]');
        if(closeBtn){
          const modal = closeBtn.closest('.modal');
          if(modal) App.modal.close(modal.id);
        }
      });
    }
  },
  modal: {
    open(id){
      const modal = document.getElementById(id);
      if(!modal) return;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      const focusable = modal.querySelector('button, [href], input, textarea, select');
      focusable?.focus();
    },
    close(id){
      const modal = document.getElementById(id);
      if(!modal) return;
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  },
  scroll: {
    init(){
      // Event delegation for scroll-to
      document.addEventListener('click', (e) => {
        const scrollBtn = e.target.closest('[data-scroll-to]');
        if(scrollBtn){
          const targetId = scrollBtn.dataset.scrollTo;
          const target = document.getElementById(targetId);
          if(target) target.scrollIntoView({behavior:'smooth'});
        }
      });
    }
  },
  nav: {
    lastScroll: 0,
    init(){
      this.header = document.querySelector('.header');
      this.menuBtn = document.querySelector('.menu-btn');
      this.navEl = document.querySelector('.nav');
      if(!this.header) return;

      // start transparent, then toggle solid on scroll
      this.header.classList.add('transparent');

      window.addEventListener('scroll', () => {
        const st = window.scrollY || window.pageYOffset;
        // solid after 48px
        if(st > 48) {
          this.header.classList.add('solid');
          this.header.classList.remove('transparent');
        } else {
          this.header.classList.add('transparent');
          this.header.classList.remove('solid');
        }

        // hide on scroll down, show on scroll up
        if(st > this.lastScroll && st > 120) {
          this.header.style.transform = 'translateY(-100%)';
        } else {
          this.header.style.transform = '';
        }
        this.lastScroll = st;
      }, { passive: true });

      // Mobile menu
      if(this.menuBtn && this.navEl){
        this.menuBtn.addEventListener('click', ()=>{
          this.navEl.classList.toggle('show');
          this.menuBtn.classList.toggle('open');
        });

        // close when nav link clicked (delegated)
        this.navEl.addEventListener('click', (e)=>{
          const a = e.target.closest('a');
          if(a){
            this.navEl.classList.remove('show');
            this.menuBtn.classList.remove('open');
          }
        });
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', ()=>{
  App.init();
  App.modals.init();
  App.scroll.init();
});

// ------------------------------
// Premium Training & Contact JS
// ------------------------------
(function(){
  // animate counters when visible
  const animateCounter = (el, target) => {
    const start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const parseTarget = () => {
      const t = String(target).replace(/\D/g,'');
      return Number(t) || 0;
    };
    const to = parseTarget();
    const step = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const curr = Math.round(p * to);
      el.textContent = curr >= to ? (el.dataset.suffix ? curr + el.dataset.suffix : curr) : curr;
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const target = el.dataset.animateCounter || el.textContent;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, {threshold:0.4});

  document.querySelectorAll('[data-animate-counter]').forEach(el=>counterObserver.observe(el));

  // Training preview population (when clicking enroll buttons)
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.enroll-btn');
    if(!btn) return;
    const course = btn.dataset.course || 'frontend';
    const titleMap = {
      'frontend': {title:'Frontend Development',desc:'Learn HTML, CSS, JavaScript, and responsive UI design. Build real projects and earn a certificate.',lessons:'12 Lessons',duration:'4h 30m',price:'₦15,000'},
      'fullstack': {title:'Full Stack Development',desc:'Build end-to-end web apps, APIs, and deploy production-ready systems.',lessons:'18 Lessons',duration:'7h 10m',price:'₦25,000'},
      'graphic-design': {title:'Graphic Design',desc:'Master visual systems, branding, and production-ready assets.',lessons:'14 Lessons',duration:'5h 20m',price:'₦12,000'}
    };
    const data = titleMap[course] || titleMap.frontend;
    const modalTitle = document.getElementById('modalCourseTitle');
    const modalDesc = document.getElementById('modalCourseDesc');
    if(modalTitle) modalTitle.textContent = data.title;
    if(modalDesc) modalDesc.textContent = data.desc;
    const price = document.querySelector('.training-preview-modal .price');
    if(price) price.textContent = data.price;
  });

  // File upload drag/drop
  const dropZone = document.getElementById('fileDropZone');
  const fileInput = document.getElementById('contactFiles');
  const fileList = document.getElementById('fileList');
  const filesState = [];
  if(dropZone && fileInput && fileList){
    const renderFiles = () => {
      fileList.innerHTML = '';
      filesState.forEach((f, i)=>{
        const el = document.createElement('div'); el.className='file-item';
        el.innerHTML = `<div>${f.name}</div><div><button data-index="${i}" class="remove-file">Remove</button></div>`;
        fileList.appendChild(el);
      });
    };

    dropZone.addEventListener('click', ()=>fileInput.click());
    dropZone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', ()=>dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e)=>{
      e.preventDefault(); dropZone.classList.remove('dragover');
      const dt = e.dataTransfer; if(!dt) return;
      const list = Array.from(dt.files || []);
      list.forEach(f=>filesState.push(f)); renderFiles();
    });

    fileInput.addEventListener('change', (e)=>{ const list = Array.from(e.target.files || []); list.forEach(f=>filesState.push(f)); renderFiles(); });

    fileList.addEventListener('click', (e)=>{
      const rem = e.target.closest('.remove-file'); if(!rem) return; const i = Number(rem.dataset.index); filesState.splice(i,1); renderFiles();
    });
  }

  // Contact form submit (fake async) -> success state + confetti
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const submitBtn = document.getElementById('contactSubmit');
      submitBtn.disabled = true; submitBtn.textContent = 'Sending...';
      setTimeout(()=>{
        submitBtn.disabled = false; submitBtn.textContent = 'Send Request';
        contactForm.classList.add('hide');
        contactSuccess.classList.remove('hide');
        // confetti
        for(let i=0;i<30;i++){ const c = document.createElement('div'); c.className='confetti'; c.style.left = (10+Math.random()*80)+'%'; c.style.background = ['#6EE7F7','#6D28D9','#FFD580'][Math.floor(Math.random()*3)]; document.body.appendChild(c); setTimeout(()=>c.remove(),1300); }
        // reset form
        contactForm.reset(); document.getElementById('fileList').innerHTML='';
      }, 1000);
    });

    document.getElementById('contactSuccessClose')?.addEventListener('click', ()=>{
      contactSuccess.classList.add('hide'); contactForm.classList.remove('hide');
    });
  }

  // Small confetti style injection
  const confStyle = document.createElement('style'); confStyle.textContent = '.confetti{position:fixed;top:20%;width:10px;height:18px;border-radius:2px;opacity:.95;transform:translateY(0);animation:confettiFall 1.2s linear forwards} @keyframes confettiFall{to{transform:translateY(600px) rotate(360deg);opacity:0}}'; document.head.appendChild(confStyle);

  // WhatsApp FAB: show/hide on small scroll behaviour
  const waFab = document.getElementById('whatsappFab');
  if(waFab){
    let last = 0; window.addEventListener('scroll', ()=>{
      const st = window.scrollY || window.pageYOffset; if(st > last && st > 150) waFab.style.transform = 'translateY(40px)'; else waFab.style.transform = '';
      last = st;
    }, {passive:true});
  }

  // Intersection reveal for premium elements
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); revealObserver.unobserve(en.target); } });
  },{threshold:0.12});
  document.querySelectorAll('.glass-hover, .training-card, .learning-feature, .contact-info, .contact-form, .premium-training .training-stats-row > div').forEach(el=>revealObserver.observe(el));

})();
