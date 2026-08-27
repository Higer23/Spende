// app.js - HIGER Protocol v4.0 Enhanced
// Advanced animations, interactive mouse effects, and smooth transitions

class HigerApp {
  constructor() {
    this.lang = localStorage.getItem('higerLang') || 'en';
    this.fiat = localStorage.getItem('higerFiat') || 'USD';
    this.currentDrawerData = null;
    this.qrCodeInstance = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isDrawerOpen = false;
    this.particleEffects = [];
    
    this.initLoader();
    this.initCanvasBackground();
    this.initCursor();
    this.initMouseTracking();
    this.initParticleSystem();
  }

  /**
   * Enhanced Loader with animated progress
   */
  initLoader() {
    let progress = 0;
    const bar = document.getElementById('loader-bar');
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => this.startApp(), 300);
      }
      bar.style.width = `${progress}%`;
    }, 50);
  }

  startApp() {
    const loader = document.getElementById('sys-loader');
    loader.classList.add('hidden');
    
    // Stagger animations for different elements
    setTimeout(() => {
      this.applyLanguage();
      this.applyFiatUI();
      this.renderWallets();
      this.setupEventListeners();
      this.fetchGasData();
      this.setupScrollAnimations();
      setInterval(() => this.fetchGasData(), 60000);
    }, 200);
  }

  /**
   * Mouse tracking system
   */
  initMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.updateMouseEffects(e);
    });

    document.addEventListener('click', (e) => {
      this.createRippleEffect(e);
    });
  }

  /**
   * Advanced cursor effects
   */
  initCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor || ('ontouchstart' in window)) return;

    let isHovering = false;

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      
      // Hoverable elements
      const hoverableElements = [
        '.wallet-row',
        '.stat-box',
        'button',
        'a',
        '.toggle-btn',
        '.quick-btn',
        '.drawer-action-btn',
        '.wallet-action',
        '.trust-banner',
        '.nav-logo',
        '.footer-links a'
      ];

      if (hoverableElements.some(sel => target.closest(sel))) {
        cursor.classList.add('hover');
        isHovering = true;
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      const hoverableElements = [
        '.wallet-row',
        '.stat-box',
        'button',
        'a',
        '.toggle-btn',
        '.quick-btn',
        '.drawer-action-btn',
        '.wallet-action',
        '.trust-banner',
        '.nav-logo',
        '.footer-links a'
      ];

      if (hoverableElements.some(sel => target.closest(sel))) {
        cursor.classList.remove('hover');
        isHovering = false;
      }
    });

    document.addEventListener('click', () => {
      cursor.classList.add('click');
      setTimeout(() => cursor.classList.remove('click'), 600);
    });
  }

  /**
   * Create ripple effect on click
   */
  createRippleEffect(e) {
    const target = e.target.closest('.wallet-row, button, a, .stat-box');
    if (!target) return;

    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(0, 255, 102, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    const rect = target.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';

    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  /**
   * Update mouse-based visual effects
   */
  updateMouseEffects(e) {
    // Subtle glow effect following mouse
    const elements = document.querySelectorAll('[data-mouse-follow]');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      el.style.setProperty('--mouse-x', x + 'px');
      el.style.setProperty('--mouse-y', y + 'px');
    });
  }

  /**
   * Particle system for animations
   */
  initParticleSystem() {
    // Particles will be created on demand
  }

  createParticles(x, y, count = 5, color = '#00FF66') {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.borderRadius = '50%';
      particle.style.background = color;
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '99998';

      const angle = (Math.PI * 2 * i) / count;
      const velocity = 3 + Math.random() * 2;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      let px = x, py = y;
      let life = 1;

      const animate = () => {
        px += vx;
        py += vy;
        life -= 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = Math.max(0, life).toString();

        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };

      document.body.appendChild(particle);
      animate();
    }
  }

  /**
   * Setup scroll animations
   */
  setupScrollAnimations() {
    const main = document.querySelector('main');
    if (!main) return;

    main.addEventListener('scroll', () => {
      this.updateScrollAnimations();
    });
  }

  updateScrollAnimations() {
    const main = document.querySelector('main');
    const scrollTop = main.scrollTop;
    
    // Fade in elements as they come into view
    document.querySelectorAll('[data-scroll-animate]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible && !el.classList.contains('animated')) {
        el.classList.add('animated');
      }
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
  }

  /**
   * Language system with animations
   */
  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('higerLang', lang);
    this.applyLanguage();
    this.renderWallets();
    this.showToast(`Language changed to ${lang.toUpperCase()}`, 'success');
  }

  applyLanguage() {
    const select = document.getElementById('langSelect');
    if (select) select.value = this.lang;
    
    const dict = CONFIG.i18n[this.lang] || CONFIG.i18n['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => {
          el.innerHTML = dict[key];
          el.style.transition = 'all 0.3s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 50);
      }
    });

    document.getElementById('searchInput').placeholder = dict.searchPlaceholder;
    
    if (this.currentDrawerData) this.updateFiatCalculation();
  }

  /**
   * Fiat currency system
   */
  setFiat(fiat) {
    this.fiat = fiat;
    localStorage.setItem('higerFiat', fiat);
    this.applyFiatUI();
    if (this.currentDrawerData) this.updateFiatCalculation();
    
    const btn = document.querySelector(`.fiat-toggle .toggle-btn:contains('${fiat}')`);
    if (btn) {
      this.createParticles(btn.getBoundingClientRect().left + 20, btn.getBoundingClientRect().top + 10);
    }
  }

  applyFiatUI() {
    document.querySelectorAll('.fiat-toggle .toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === this.fiat);
    });
    
    const symbol = CONFIG.fiatSymbols[this.fiat];
    const btns = document.querySelectorAll('.quick-btn');
    if (btns.length > 0) {
      btns.forEach((btn, idx) => {
        const amounts = [10, 50, 100, 500];
        btn.textContent = `${symbol}${amounts[idx]}`;
      });
    }
  }

  /**
   * Shorten wallet address for display
   */
  shortenAddress(addr) {
    if (!addr || addr.length <= 14) return addr;
    return addr.substring(0, 7) + '...' + addr.substring(addr.length - 7);
  }

  /**
   * Enhanced wallet rendering with animations
   */
  renderWallets() {
    const container = document.getElementById('walletsContainer');
    container.innerHTML = '';
    let totalAddresses = 0;
    let index = 0;

    Object.values(CONFIG.wallets).forEach((group, groupIdx) => {
      totalAddresses += group.items.length;
      
      const groupEl = document.createElement('div');
      groupEl.className = 'wallet-group';
      groupEl.style.animation = `fadeInScale 0.6s ease ${groupIdx * 0.1}s both`;
      
      let rowsHTML = group.items.map((w, itemIdx) => {
        const shortAddr = this.shortenAddress(w.addr);
        return `
        <div class="wallet-row" data-search="${(w.name + ' ' + w.ticker + ' ' + w.chain).toLowerCase()}" style="animation: slideInFromRight 0.4s ease ${(groupIdx * 0.05 + itemIdx * 0.02)}s both;">
          <div class="wallet-info">
            <div class="wallet-name">${w.name} <span style="color:var(--mute-color); font-weight:400;">(${w.ticker})</span></div>
            <div class="wallet-chain">${w.chain}</div>
            <div class="wallet-addr-wrap">
              <i class="fas fa-link" style="color:var(--border-light); font-size:10px;"></i>
              <span class="wallet-addr-short" title="${w.addr}" data-full-addr="${w.addr}">${shortAddr}</span>
            </div>
          </div>
          <div class="wallet-actions">
            <button class="wallet-action copy-btn" onclick="app.copyToClipboard('${w.addr.replace(/'/g, "\\'")}', this)" title="Copy Address" aria-label="Copy wallet address">
              <i class="fas fa-copy"></i>
            </button>
            <button class="wallet-action qr-btn" onclick="app.openQRDrawer('${w.name.replace(/'/g, "\\'")}', '${w.ticker}', '${w.chain.replace(/'/g, "\\'")}', '${w.scheme}', '${w.addr.replace(/'/g, "\\'")}')" title="Open QR" aria-label="Show QR code">
              <i class="fas fa-qrcode"></i>
            </button>
          </div>
        </div>
      `;
      }).join('');

      let warningHTML = group.isTestnet 
        ? `<div class="testnet-warn" style="animation: slideInFromRight 0.4s ease both;"><i class="fas fa-triangle-exclamation"></i> ${CONFIG.i18n[this.lang]?.testnetWarn || CONFIG.i18n['en'].testnetWarn}</div>` 
        : '';

      const groupName = group.label[this.lang] || group.label['en'];

      groupEl.innerHTML = `
        <div class="group-header" onclick="this.parentElement.classList.toggle('open')" style="cursor: pointer; transition: all 0.3s ease;">
          <div class="group-title-wrap">
            <i class="${group.icon} group-icon" style="transition: all 0.3s ease;"></i>
            <span class="group-name">${groupName}</span>
            <span class="group-badge">${group.items.length}</span>
          </div>
          <i class="fas fa-chevron-down group-chevron" style="transition: transform 0.3s ease;"></i>
        </div>
        <div class="group-body" style="transition: all 0.3s ease;">
          <div class="group-body-inner">
            ${warningHTML}
            ${rowsHTML}
          </div>
        </div>
      `;

      // Add hover effects
      const header = groupEl.querySelector('.group-header');
      header.addEventListener('mouseenter', () => {
        header.style.background = 'rgba(0, 255, 102, 0.05)';
      });
      header.addEventListener('mouseleave', () => {
        header.style.background = '';
      });

      container.appendChild(groupEl);
      index++;
    });

    document.getElementById('stat-addr-count').textContent = totalAddresses;
  }

  /**
   * Advanced event listeners
   */
  setupEventListeners() {
    // Search with debounce
    let searchTimeout;
    document.getElementById('searchInput').addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.wallet-group').forEach(group => {
          let hasVisible = false;
          group.querySelectorAll('.wallet-row').forEach(row => {
            const match = row.getAttribute('data-search').includes(query);
            row.classList.toggle('hidden', !match);
            if (match) hasVisible = true;
          });
          group.style.display = hasVisible ? 'block' : 'none';
          if (query && hasVisible) group.classList.add('open');
        });
      }, 100);
    });

    // Drawer controls
    document.getElementById('drawerCloseBtn').addEventListener('click', () => {
      this.closeQRDrawer();
    });

    document.getElementById('qrDrawer').addEventListener('click', (e) => {
      if (e.target.id === 'qrDrawer') this.closeQRDrawer();
    });

    // Crypto amount input
    document.getElementById('cryptoAmountInput').addEventListener('input', () => {
      this.updateFiatCalculation();
      this.generateQR();
    });
    
    // Copy button
    document.getElementById('btnCopyDrawer').addEventListener('click', () => {
      if (this.currentDrawerData) this.copyToClipboard(this.currentDrawerData.addr);
    });
    
    // Save QR button
    document.getElementById('btnSaveDrawer').addEventListener('click', () => {
      this.downloadQR();
    });

    // Status widget toggle
    document.getElementById('statusHeaderToggle').addEventListener('click', () => {
      const widget = document.getElementById('status-widget');
      widget.classList.toggle('open');
      const chev = document.getElementById('statusChevron');
      chev.style.transform = widget.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    // Keyboard shortcut for close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeQRDrawer();
    });
  }

  /**
   * Enhanced QR drawer with animations
   */
  openQRDrawer(name, ticker, chain, scheme, addr) {
    if (!addr) {
      this.showToast((CONFIG.i18n[this.lang] || CONFIG.i18n['en']).toastError, 'error');
      return;
    }
    
    this.currentDrawerData = { name, ticker, chain, scheme, addr };
    this.isDrawerOpen = true;
    
    document.getElementById('drawerTitle').textContent = name;
    document.getElementById('drawerSubtitle').textContent = `${chain} • ${ticker}`;
    document.getElementById('drawerAddrText').textContent = addr;
    document.getElementById('inputTickerBadge').textContent = ticker;
    document.getElementById('cryptoAmountInput').value = '';
    
    const holder = document.getElementById('qr-canvas-holder');
    holder.innerHTML = '';
    document.getElementById('qrLoadingIndicator').style.display = 'block';
    
    this.updateFiatCalculation();
    
    document.getElementById('qrDrawer').classList.add('open');
    document.body.classList.add('drawer-open');

    setTimeout(() => this.generateQR(), 300);
  }

  /**
   * Close drawer with animation
   */
  closeQRDrawer() {
    document.getElementById('qrDrawer').classList.remove('open');
    document.body.classList.remove('drawer-open');
    this.currentDrawerData = null;
    this.qrCodeInstance = null;
    this.isDrawerOpen = false;
  }

  /**
   * Fiat calculation with animations
   */
  updateFiatCalculation() {
    if (!this.currentDrawerData) return;
    const ticker = this.currentDrawerData.ticker;
    const amountStr = document.getElementById('cryptoAmountInput').value;
    const amount = parseFloat(amountStr) || 0;
    
    const rateData = CONFIG.mockRates[ticker];
    if (rateData && rateData[this.fiat]) {
      const rate = rateData[this.fiat];
      const sym = CONFIG.fiatSymbols[this.fiat];
      
      const rateInfo = document.getElementById('fiatRateInfo');
      rateInfo.textContent = `1 ${ticker} = ${sym}${rate.toLocaleString()}`;
      rateInfo.style.animation = 'pulse 1s ease';
      
      const result = document.getElementById('fiatResultDisplay');
      result.textContent = `≈ ${sym}${(amount * rate).toFixed(2)}`;
      result.style.animation = 'slideUpFade 0.3s ease';
    }
  }

  /**
   * Quick fiat amount buttons
   */
  setQuickFiat(fiatValue) {
    if (!this.currentDrawerData) return;
    const ticker = this.currentDrawerData.ticker;
    const rateData = CONFIG.mockRates[ticker];
    if (rateData && rateData[this.fiat]) {
      const rate = rateData[this.fiat];
      const cryptoAmount = (fiatValue / rate).toFixed(6);
      document.getElementById('cryptoAmountInput').value = parseFloat(cryptoAmount);
      this.updateFiatCalculation();
      this.generateQR();
      
      // Visual feedback
      const input = document.getElementById('cryptoAmountInput');
      input.style.animation = 'none';
      setTimeout(() => {
        input.style.animation = 'bounceIn 0.4s ease';
      }, 10);
    }
  }

  /**
   * QR code generation
   */
  generateQR() {
    if (!this.currentDrawerData) return;
    
    const { addr, scheme } = this.currentDrawerData;
    const amount = document.getElementById('cryptoAmountInput').value;
    
    let uri = scheme ? `${scheme}${addr}` : addr;
    if (amount && parseFloat(amount) > 0) {
      uri += `?amount=${amount}`;
    }

    const holder = document.getElementById('qr-canvas-holder');
    const loader = document.getElementById('qrLoadingIndicator');
    
    try {
      holder.innerHTML = '';
      if (typeof QRCode !== 'undefined') {
        const canvas = document.createElement('canvas');
        canvas.id = 'qrCanvas';
        holder.appendChild(canvas);
        
        QRCode.toCanvas(canvas, uri, {
          width: 240,
          margin: 2,
          color: { dark: '#000000', light: '#ffffff' },
          errorCorrectionLevel: 'H'
        }, (err) => {
          if (err) {
            this.generateQRFallback(uri, holder);
          } else {
            loader.style.display = 'none';
            canvas.style.display = 'block';
            canvas.style.animation = 'bounceIn 0.5s ease';
          }
        });
      } else {
        this.generateQRFallback(uri, holder);
      }
    } catch (err) {
      this.generateQRFallback(uri, holder);
    }
  }

  /**
   * QR fallback with external API
   */
  generateQRFallback(uri, holder) {
    const loader = document.getElementById('qrLoadingIndicator');
    const img = document.createElement('img');
    img.id = 'qrFallbackImg';
    
    const encodedUri = encodeURIComponent(uri);
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUri}&margin=2&format=png`;
    
    img.onload = () => {
      loader.style.display = 'none';
      img.style.display = 'block';
      img.style.animation = 'bounceIn 0.5s ease';
      holder.appendChild(img);
    };
    
    img.onerror = () => {
      loader.textContent = 'QR ERROR - RETRY';
      loader.style.display = 'block';
      setTimeout(() => {
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUri}&margin=2&format=png`;
      }, 2000);
    };
  }

  /**
   * Download QR code
   */
  downloadQR() {
    const holder = document.getElementById('qr-canvas-holder');
    const img = holder.querySelector('img');
    const canvas = holder.querySelector('canvas');
    
    let link = document.createElement('a');
    link.download = `HIGER-${this.currentDrawerData.ticker}-QR.png`;
    
    const dict = CONFIG.i18n[this.lang] || CONFIG.i18n['en'];
    
    if (canvas && canvas.style.display !== 'none') {
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.showToast(dict.toastSaved);
      this.createParticles(this.mouseX, this.mouseY, 8, '#00FF66');
    } else if (img && img.style.display !== 'none') {
      fetch(img.src)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.click();
          window.URL.revokeObjectURL(url);
          this.showToast(dict.toastSaved);
          this.createParticles(this.mouseX, this.mouseY, 8, '#00FF66');
        })
        .catch(() => {
          link.href = img.src;
          link.click();
          this.showToast(dict.toastSaved);
          this.createParticles(this.mouseX, this.mouseY, 8, '#00FF66');
        });
    }
  }

  /**
   * Enhanced copy to clipboard with effects
   */
  copyToClipboard(text, btnEl = null) {
    const dict = CONFIG.i18n[this.lang] || CONFIG.i18n['en'];
    if (!text) {
      this.showToast(dict.toastError, 'error');
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      this.showToast(dict.toastCopied);
      
      if (btnEl) {
        const originalHTML = btnEl.innerHTML;
        btnEl.innerHTML = '<i class="fas fa-check"></i>';
        btnEl.style.animation = 'scaleUp 0.3s ease';
        
        // Create particles from button
        const rect = btnEl.getBoundingClientRect();
        this.createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
        
        this.triggerConfetti(btnEl);
        setTimeout(() => { 
          btnEl.innerHTML = originalHTML;
          btnEl.style.animation = '';
        }, 1500);
      }
    });
  }

  /**
   * Enhanced toast notifications
   */
  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> <span>${message}</span>`;
    
    container.prepend(toast);
    
    void toast.offsetWidth;
    toast.classList.add('show');
    
    // Add particles on toast show
    const rect = toast.getBoundingClientRect();
    this.createParticles(rect.left + rect.width / 2, rect.top + 10, 5, 
      type === 'error' ? '#FF3333' : type === 'success' ? '#00FF66' : '#00AAFF');
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  /**
   * Confetti effect
   */
  triggerConfetti(el) {
    if (typeof confetti === 'undefined') return;
    const rect = el.getBoundingClientRect();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { 
        x: (rect.left + rect.width / 2) / window.innerWidth, 
        y: (rect.top + rect.height / 2) / window.innerHeight 
      },
      colors: ['#00FF66', '#00AAFF', '#BB00FF', '#FF3333', '#FFFFFF'],
      disableForReducedMotion: true,
      zIndex: 999999,
      gravity: 0.8,
      scalar: 1.2
    });
  }

  /**
   * Fetch gas data from blockchain networks
   */
  async fetchGasData() {
    try {
      const [eth, bsc, matic] = await Promise.allSettled([
        fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle').then(r => r.json()),
        fetch('https://api.bscscan.com/api?module=gastracker&action=gasoracle').then(r => r.json()),
        fetch('https://gasstation.polygon.technology/v2').then(r => r.json())
      ]);

      const updateElement = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
          el.style.animation = 'slideUpFade 0.3s ease';
          el.textContent = value;
        }
      };

      if (eth.value?.result?.ProposeGasPrice) updateElement('gasEth', eth.value.result.ProposeGasPrice + ' GWEI');
      if (bsc.value?.result?.ProposeGasPrice) updateElement('gasBsc', bsc.value.result.ProposeGasPrice + ' GWEI');
      if (matic.value?.standard?.maxFee) updateElement('gasMatic', Math.round(matic.value.standard.maxFee) + ' GWEI');
      
      const d = new Date();
      updateElement('lastUpdateTime', d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
      
      const pulseDot = document.getElementById('systemPulseDot');
      if (pulseDot) {
        pulseDot.classList.remove('error');
        pulseDot.style.animation = 'none';
        setTimeout(() => {
          pulseDot.style.animation = '';
        }, 10);
      }
    } catch(e) {
      const pulseDot = document.getElementById('systemPulseDot');
      if (pulseDot) pulseDot.classList.add('error');
    }
  }

  /**
   * Advanced canvas background with particles
   */
  initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationId;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      drawGrid();
    };
    
    const drawGrid = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 0.5;
      
      const gridSize = Math.max(40, window.innerWidth / 20);
      
      for(let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      for(let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      // Draw subtle animated dots at intersections
      ctx.fillStyle = 'rgba(0, 255, 102, 0.1)';
      for(let y = 0; y <= height; y += gridSize * 2) {
        for(let x = 0; x <= width; x += gridSize * 2) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    window.addEventListener('resize', resize);
    resize();
  }
}

/**
 * Initialize app when DOM is ready
 */
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new HigerApp();
});
