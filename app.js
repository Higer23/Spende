// app.js
// Uygulama sınıfı (Core Logic)

class HigerApp {
  constructor() {
    this.lang = localStorage.getItem('higerLang') || 'en';
    this.fiat = localStorage.getItem('higerFiat') || 'USD';
    this.currentDrawerData = null;
    this.qrCodeInstance = null;
    
    this.initLoader();
    this.initCanvasBackground();
    this.initCursor();
  }

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
    document.getElementById('sys-loader').classList.add('hidden');
    this.applyLanguage();
    this.applyFiatUI();
    this.renderWallets();
    this.setupEventListeners();
    this.fetchGasData();
    setInterval(() => this.fetchGasData(), 60000);
  }

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('higerLang', lang);
    this.applyLanguage();
    this.renderWallets();
  }

  // YENİ DİL SİSTEMİ: Dropdown yapısı ve config'den dil okuma güncellendi.
  applyLanguage() {
    const select = document.getElementById('langSelect');
    if(select) select.value = this.lang;
    
    // Eğer tarayıcıda kayıtlı dil yoksa varsayılan olarak İngilizce kullan
    const dict = CONFIG.i18n[this.lang] || CONFIG.i18n['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.getElementById('searchInput').placeholder = dict.searchPlaceholder;
    
    if (this.currentDrawerData) this.updateFiatCalculation();
  }

  setFiat(fiat) {
    this.fiat = fiat;
    localStorage.setItem('higerFiat', fiat);
    this.applyFiatUI();
    if (this.currentDrawerData) this.updateFiatCalculation();
  }

  applyFiatUI() {
    document.querySelectorAll('.fiat-toggle .toggle-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent === this.fiat);
    });
    
    const symbol = CONFIG.fiatSymbols[this.fiat];
    const btns = document.querySelectorAll('.quick-btn');
    if(btns.length > 0) {
      btns[0].textContent = `${symbol}10`;
      btns[1].textContent = `${symbol}50`;
      btns[2].textContent = `${symbol}100`;
      btns[3].textContent = `${symbol}500`;
    }
  }

  renderWallets() {
    const container = document.getElementById('walletsContainer');
    container.innerHTML = '';
    let totalAddresses = 0;

    Object.values(CONFIG.wallets).forEach(group => {
      totalAddresses += group.items.length;
      
      const groupEl = document.createElement('div');
      groupEl.className = 'wallet-group';
      
      let rowsHTML = group.items.map(w => `
        <div class="wallet-row" data-search="${(w.name + ' ' + w.ticker + ' ' + w.chain).toLowerCase()}">
          <div class="wallet-info">
            <div class="wallet-name">${w.name} <span style="color:var(--mute-color); font-weight:400;">(${w.ticker})</span></div>
            <div class="wallet-chain">${w.chain}</div>
            <div class="wallet-addr-wrap">
              <i class="fas fa-link" style="color:var(--border-light); font-size:10px;"></i>
              <span class="wallet-addr">${w.addr || 'ADDRESS NOT SET'}</span>
            </div>
          </div>
          <div class="wallet-actions">
            <button class="icon-btn" onclick="app.copyToClipboard('${w.addr}', this)" title="Copy Address"><i class="fas fa-copy"></i></button>
            <button class="icon-btn" onclick="app.openQRDrawer('${w.name}', '${w.ticker}', '${w.chain}', '${w.scheme}', '${w.addr}')" title="Open QR"><i class="fas fa-qrcode"></i></button>
          </div>
        </div>
      `).join('');

      let warningHTML = group.isTestnet 
        ? `<div class="testnet-warn"><i class="fas fa-triangle-exclamation"></i> ${CONFIG.i18n[this.lang]?.testnetWarn || CONFIG.i18n['en'].testnetWarn}</div>` 
        : '';

      // Eğer config.js içinde çevrilmiş wallet başlığı yoksa otomatik olarak ingilizceye döner. (Sistemin çökmemesi için koruma)
      const groupName = group.label[this.lang] || group.label['en'];

      groupEl.innerHTML = `
        <div class="group-header" onclick="this.parentElement.classList.toggle('open')">
          <div class="group-title-wrap">
            <i class="${group.icon} group-icon"></i>
            <span class="group-name">${groupName}</span>
            <span class="group-badge">${group.items.length}</span>
          </div>
          <i class="fas fa-chevron-down group-chevron"></i>
        </div>
        <div class="group-body">
          <div class="group-body-inner">
            ${warningHTML}
            ${rowsHTML}
          </div>
        </div>
      `;
      container.appendChild(groupEl);
    });

    document.getElementById('stat-addr-count').textContent = totalAddresses;
  }

  setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', (e) => {
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
    });

    document.getElementById('drawerCloseBtn').addEventListener('click', () => this.closeQRDrawer());
    document.getElementById('qrDrawer').addEventListener('click', (e) => {
      if (e.target.id === 'qrDrawer') this.closeQRDrawer();
    });

    document.getElementById('cryptoAmountInput').addEventListener('input', () => {
      this.updateFiatCalculation();
      this.generateQR();
    });
    
    document.getElementById('btnCopyDrawer').addEventListener('click', () => {
      if (this.currentDrawerData) this.copyToClipboard(this.currentDrawerData.addr);
    });
    
    document.getElementById('btnSaveDrawer').addEventListener('click', () => this.downloadQR());

    document.getElementById('statusHeaderToggle').addEventListener('click', () => {
      const widget = document.getElementById('status-widget');
      widget.classList.toggle('open');
      const chev = document.getElementById('statusChevron');
      chev.style.transform = widget.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeQRDrawer();
    });
  }

  openQRDrawer(name, ticker, chain, scheme, addr) {
    if(!addr) {
      this.showToast((CONFIG.i18n[this.lang] || CONFIG.i18n['en']).toastError, 'error');
      return;
    }
    
    this.currentDrawerData = { name, ticker, chain, scheme, addr };
    
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

    setTimeout(() => this.generateQR(), 200);
  }

  closeQRDrawer() {
    document.getElementById('qrDrawer').classList.remove('open');
    document.body.classList.remove('drawer-open');
    this.currentDrawerData = null;
    this.qrCodeInstance = null;
  }

  updateFiatCalculation() {
    if (!this.currentDrawerData) return;
    const ticker = this.currentDrawerData.ticker;
    const amountStr = document.getElementById('cryptoAmountInput').value;
    const amount = parseFloat(amountStr) || 0;
    
    const rateData = CONFIG.mockRates[ticker];
    if (rateData && rateData[this.fiat]) {
      const rate = rateData[this.fiat];
      const sym = CONFIG.fiatSymbols[this.fiat];
      document.getElementById('fiatRateInfo').textContent = `1 ${ticker} = ${sym}${rate.toLocaleString()}`;
      document.getElementById('fiatResultDisplay').textContent = `≈ ${sym}${(amount * rate).toFixed(2)}`;
    } else {
      document.getElementById('fiatRateInfo').textContent = 'RATE UNAVAILABLE';
      document.getElementById('fiatResultDisplay').textContent = '—';
    }
  }

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
    }
  }

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
          }
        });
      } else {
        this.generateQRFallback(uri, holder);
      }
    } catch (err) {
      this.generateQRFallback(uri, holder);
    }
  }

  generateQRFallback(uri, holder) {
    const loader = document.getElementById('qrLoadingIndicator');
    const img = document.createElement('img');
    img.id = 'qrFallbackImg';
    
    const encodedUri = encodeURIComponent(uri);
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodedUri}&margin=2&format=png`;
    
    img.onload = () => {
      loader.style.display = 'none';
      img.style.display = 'block';
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
    } else if (img && img.style.display !== 'none') {
      fetch(img.src)
        .then(res => res.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.click();
          window.URL.revokeObjectURL(url);
          this.showToast(dict.toastSaved);
        })
        .catch(() => {
          link.href = img.src;
          link.click();
          this.showToast(dict.toastSaved);
        });
    }
  }

  copyToClipboard(text, btnEl = null) {
    const dict = CONFIG.i18n[this.lang] || CONFIG.i18n['en'];
    if(!text) {
      this.showToast(dict.toastError, 'error');
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      this.showToast(dict.toastCopied);
      if (btnEl) {
        const originalHTML = btnEl.innerHTML;
        btnEl.innerHTML = '<i class="fas fa-check"></i>';
        this.triggerConfetti(btnEl);
        setTimeout(() => { btnEl.innerHTML = originalHTML; }, 1500);
      }
    });
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i> <span>${message}</span>`;
    
    container.prepend(toast);
    
    void toast.offsetWidth;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  triggerConfetti(el) {
    if (typeof confetti === 'undefined') return;
    const rect = el.getBoundingClientRect();
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { 
        x: (rect.left + rect.width / 2) / window.innerWidth, 
        y: (rect.top + rect.height / 2) / window.innerHeight 
      },
      colors: ['#ffffff', '#444444', '#FF3333'],
      disableForReducedMotion: true,
      zIndex: 999999
    });
  }

  async fetchGasData() {
    try {
      const [eth, bsc, matic] = await Promise.allSettled([
        fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle').then(r=>r.json()),
        fetch('https://api.bscscan.com/api?module=gastracker&action=gasoracle').then(r=>r.json()),
        fetch('https://gasstation.polygon.technology/v2').then(r=>r.json())
      ]);

      if(eth.value?.result?.ProposeGasPrice) document.getElementById('gasEth').textContent = eth.value.result.ProposeGasPrice + ' GWEI';
      if(bsc.value?.result?.ProposeGasPrice) document.getElementById('gasBsc').textContent = bsc.value.result.ProposeGasPrice + ' GWEI';
      if(matic.value?.standard?.maxFee) document.getElementById('gasMatic').textContent = Math.round(matic.value.standard.maxFee) + ' GWEI';
      
      const d = new Date();
      document.getElementById('lastUpdateTime').textContent = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      document.getElementById('systemPulseDot').classList.remove('error');
    } catch(e) {
      document.getElementById('systemPulseDot').classList.add('error');
    }
  }

  initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    
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
      ctx.strokeStyle = '#ffffff';
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
    };

    window.addEventListener('resize', resize);
    resize();
  }

  initCursor() {
    const cursor = document.getElementById('custom-cursor');
    if(!cursor || ('ontouchstart' in window)) return;

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
}

// Uygulamayı Başlat (Tüm scriptler yüklendiğinde)
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new HigerApp();
});
