/**
 * Internationalization (i18n) System
 * Handles language switching between Spanish and English
 */

class I18n {
    constructor() {
        this.currentLang = 'es';
        this.translations = null;
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.detectLanguage();
        this.setupEventListeners();
        this.applyTranslations();
    }

    async loadTranslations() {
        try {
            const response = await fetch('data/content.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    detectLanguage() {
        // Check localStorage first
        const savedLang = localStorage.getItem('cv-language');
        if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
            this.currentLang = savedLang;
        } else {
            // Detect browser language
            const browserLang = navigator.language.substring(0, 2);
            this.currentLang = browserLang === 'en' ? 'en' : 'es';
        }
        this.updateLanguageButtons();
    }

    setupEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('cv-language', lang);
        this.updateLanguageButtons();
        this.applyTranslations();

        // Update document language
        document.documentElement.lang = lang;

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    applyTranslations() {
        if (!this.translations) return;

        const t = this.translations[this.currentLang];

        // Apply translations to elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const value = this.getNestedValue(t, key);
            if (value) {
                if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                    el.placeholder = value;
                } else {
                    el.innerHTML = value;
                }
            }
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    getTranslation(key) {
        if (!this.translations) return key;
        return this.getNestedValue(this.translations[this.currentLang], key) || key;
    }

    getCurrentTranslations() {
        return this.translations ? this.translations[this.currentLang] : null;
    }

    getCurrentLang() {
        return this.currentLang;
    }
}

// Create global instance
const i18n = new I18n();

// Export for use in other modules
window.i18n = i18n;
