// needasite Template Framework
// Gemini picks sections + content, we render reliable HTML

const TEMPLATES = {
  // Base HTML wrapper
  base: (config, sectionsHtml) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title || 'My Website'}</title>
  <meta name="description" content="${config.description || ''}">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '${config.primaryColor || '#3B82F6'}',
            secondary: '${config.secondaryColor || '#1F2937'}',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { font-family: 'Inter', system-ui, sans-serif; }
  </style>
</head>
<body class="bg-white text-gray-900">
  ${sectionsHtml}
  
  <script>
    lucide.createIcons();
    document.getElementById('menuBtn')?.addEventListener('click', () => {
      document.getElementById('mobileMenu')?.classList.toggle('hidden');
    });
    document.querySelectorAll('[data-needasite-form]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        form.innerHTML = '<div class="text-center py-8"><i data-lucide="check-circle" class="w-12 h-12 mx-auto mb-3 text-green-500"></i><p class="text-lg font-semibold">Message sent!</p><p class="text-gray-500">We\\'ll get back to you soon.</p></div>';
        lucide.createIcons();
      });
    });
  </script>
</body>
</html>`,

  // Navigation
  nav: (data) => `
  <header class="bg-white border-b border-gray-100 sticky top-0 z-50">
    <nav class="container mx-auto px-4 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <a href="#" class="text-xl lg:text-2xl font-bold text-gray-900">${data.logo || 'Brand'}</a>
        <button id="menuBtn" class="lg:hidden p-2 text-gray-600 hover:text-gray-900">
          <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
        <div id="mobileMenu" class="hidden lg:flex items-center gap-8">
          ${(data.links || ['Home', 'About', 'Services', 'Contact']).map(link => 
            `<a href="#${link.toLowerCase()}" class="text-gray-600 hover:text-primary font-medium transition">${link}</a>`
          ).join('')}
          ${data.cta ? `<a href="#contact" class="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition">${data.cta}</a>` : ''}
        </div>
      </div>
      <div id="mobileMenu" class="lg:hidden hidden pb-4 space-y-2">
        ${(data.links || ['Home', 'About', 'Services', 'Contact']).map(link => 
          `<a href="#${link.toLowerCase()}" class="block py-2 text-gray-600 hover:text-primary font-medium">${link}</a>`
        ).join('')}
      </div>
    </nav>
  </header>`,

  // Hero Section
  hero: (data) => `
  <section id="home" class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
    <div class="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 ${data.imagePosition === 'left' ? 'lg:order-2' : ''}">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            ${data.headline || 'Welcome to Our Website'}
          </h1>
          <p class="text-lg lg:text-xl text-gray-600 leading-relaxed">
            ${data.subheadline || 'We help you achieve your goals with our amazing services.'}
          </p>
          <div class="flex flex-wrap gap-4">
            <a href="#contact" class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition shadow-lg shadow-primary/25">
              ${data.ctaPrimary || 'Get Started'}
            </a>
            ${data.ctaSecondary ? `<a href="#about" class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition">${data.ctaSecondary}</a>` : ''}
          </div>
        </div>
        <div class="${data.imagePosition === 'left' ? 'lg:order-1' : ''}">
          <img src="https://picsum.photos/seed/${data.imageSeed || 'hero'}/800/600" alt="${data.imageAlt || 'Hero image'}" class="w-full rounded-2xl shadow-2xl">
        </div>
      </div>
    </div>
  </section>`,

  // Features/Services Section
  features: (data) => `
  <section id="services" class="py-16 lg:py-24 ${data.dark ? 'bg-gray-900 text-white' : 'bg-white'}">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">${data.title || 'Our Services'}</h2>
        <p class="${data.dark ? 'text-gray-400' : 'text-gray-600'} text-lg">${data.subtitle || 'Discover what we can do for you'}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-${data.columns || 3} gap-8">
        ${(data.items || [
          { icon: 'star', title: 'Quality Service', desc: 'We deliver exceptional quality in everything we do.' },
          { icon: 'zap', title: 'Fast Delivery', desc: 'Quick turnaround times without compromising quality.' },
          { icon: 'shield', title: 'Reliable Support', desc: '24/7 support to help you whenever you need it.' }
        ]).map(item => `
          <div class="p-6 lg:p-8 rounded-2xl ${data.dark ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <i data-lucide="${item.icon || 'star'}" class="w-6 h-6 text-primary"></i>
            </div>
            <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
            <p class="${data.dark ? 'text-gray-400' : 'text-gray-600'}">${item.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`,

  // About Section
  about: (data) => `
  <section id="about" class="py-16 lg:py-24 bg-gray-50">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="${data.imagePosition === 'right' ? 'lg:order-2' : ''}">
          <img src="https://picsum.photos/seed/${data.imageSeed || 'about'}/800/600" alt="${data.imageAlt || 'About us'}" class="w-full rounded-2xl shadow-xl">
        </div>
        <div class="space-y-6">
          <h2 class="text-3xl lg:text-4xl font-bold">${data.title || 'About Us'}</h2>
          <p class="text-gray-600 text-lg leading-relaxed">${data.description || 'We are a passionate team dedicated to delivering excellence. With years of experience and a commitment to quality, we help our clients achieve their goals.'}</p>
          ${data.stats ? `
          <div class="grid grid-cols-3 gap-6 pt-4">
            ${data.stats.map(stat => `
              <div>
                <div class="text-3xl font-bold text-primary">${stat.value}</div>
                <div class="text-gray-500 text-sm">${stat.label}</div>
              </div>
            `).join('')}
          </div>` : ''}
        </div>
      </div>
    </div>
  </section>`,

  // Gallery/Portfolio Section  
  gallery: (data) => `
  <section id="gallery" class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">${data.title || 'Our Work'}</h2>
        <p class="text-gray-600 text-lg">${data.subtitle || 'Check out some of our recent projects'}</p>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-${data.columns || 3} gap-4 lg:gap-6">
        ${(data.images || ['work1', 'work2', 'work3', 'work4', 'work5', 'work6']).map((img, i) => `
          <div class="aspect-square overflow-hidden rounded-xl group">
            <img src="https://picsum.photos/seed/${img}/600/600" alt="Gallery image ${i + 1}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
          </div>
        `).join('')}
      </div>
    </div>
  </section>`,

  // Testimonials Section
  testimonials: (data) => `
  <section class="py-16 lg:py-24 bg-gray-50">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold mb-4">${data.title || 'What Our Clients Say'}</h2>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${(data.items || [
          { quote: 'Amazing service! Exceeded all expectations.', name: 'Sarah Johnson', role: 'CEO, TechCorp' },
          { quote: 'Professional, fast, and high quality work.', name: 'Mike Chen', role: 'Founder, StartupXYZ' },
          { quote: 'Highly recommend to anyone looking for quality.', name: 'Emily Davis', role: 'Director, DesignCo' }
        ]).map(item => `
          <div class="bg-white p-6 lg:p-8 rounded-2xl shadow-sm">
            <div class="flex gap-1 mb-4">
              ${[1,2,3,4,5].map(() => '<i data-lucide="star" class="w-5 h-5 text-yellow-400 fill-yellow-400"></i>').join('')}
            </div>
            <p class="text-gray-600 mb-6">"${item.quote}"</p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span class="text-primary font-semibold">${item.name.charAt(0)}</span>
              </div>
              <div>
                <div class="font-semibold">${item.name}</div>
                <div class="text-gray-500 text-sm">${item.role}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`,

  // Contact Section
  contact: (data) => `
  <section id="contact" class="py-16 lg:py-24 bg-white">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">${data.title || 'Get In Touch'}</h2>
          <p class="text-gray-600 text-lg">${data.subtitle || 'Have a question? We\\'d love to hear from you.'}</p>
        </div>
        <form data-needasite-form="true" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <input type="text" name="name" placeholder="Your Name" required class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
            <input type="email" name="email" placeholder="Your Email" required class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition">
          </div>
          <textarea name="message" rows="5" placeholder="Your Message" required class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"></textarea>
          <button type="submit" class="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-primary/25">
            ${data.buttonText || 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  </section>`,

  // Footer
  footer: (data) => `
  <footer class="bg-gray-900 text-white py-12 lg:py-16">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <div class="text-xl font-bold mb-4">${data.logo || 'Brand'}</div>
          <p class="text-gray-400">${data.description || 'Building amazing experiences for our customers.'}</p>
        </div>
        ${(data.columns || [
          { title: 'Links', links: ['Home', 'About', 'Services', 'Contact'] },
          { title: 'Legal', links: ['Privacy', 'Terms'] }
        ]).map(col => `
          <div>
            <div class="font-semibold mb-4">${col.title}</div>
            <div class="space-y-2">
              ${col.links.map(link => `<a href="#" class="block text-gray-400 hover:text-white transition">${link}</a>`).join('')}
            </div>
          </div>
        `).join('')}
        <div>
          <div class="font-semibold mb-4">Contact</div>
          <div class="space-y-2 text-gray-400">
            ${data.email ? `<p>${data.email}</p>` : ''}
            ${data.phone ? `<p>${data.phone}</p>` : ''}
            ${data.address ? `<p>${data.address}</p>` : ''}
          </div>
        </div>
      </div>
      <div class="pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>© ${new Date().getFullYear()} ${data.logo || 'Brand'}. All rights reserved.</p>
      </div>
    </div>
  </footer>`,

  // CTA Banner
  cta: (data) => `
  <section class="py-16 lg:py-20 bg-primary">
    <div class="container mx-auto px-4 lg:px-8 text-center">
      <h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">${data.title || 'Ready to Get Started?'}</h2>
      <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">${data.subtitle || 'Join thousands of satisfied customers today.'}</p>
      <a href="#contact" class="inline-block px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
        ${data.buttonText || 'Contact Us'}
      </a>
    </div>
  </section>`
};

// Build site from config
function buildSite(config) {
  const sections = (config.sections || []).map(section => {
    const template = TEMPLATES[section.type];
    if (!template) return '';
    return template(section);
  }).join('\n');
  
  return TEMPLATES.base(config, sections);
}

// Export for use
if (typeof module !== 'undefined') {
  module.exports = { TEMPLATES, buildSite };
}
