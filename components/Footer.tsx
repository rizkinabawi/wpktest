'use client'

import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    service: [
      { label: "亜鉛メッキ", href: "#services" },
      { label: "ニッケルメッキ", href: "#services" },
      { label: "クロムメッキ", href: "#services" },
      { label: "金メッキ", href: "#services" },
    ],
    company: [
      { label: "会社概要", href: "#company" },
      { label: "アクセス", href: "#company" },
      { label: "採用情報", href: "#recruit" },
      { label: "お知らせ", href: "#" },
    ],
    info: [
      { label: "プライバシーポリシー", href: "#" },
      { label: "サイトマップ", href: "#" },
      { label: "お問い合わせ", href: "#contact" },
    ],
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="text-white mb-2">有限会社</div>
              <div className="text-white text-2xl mb-4">鷲津メッキ工業所</div>
              <p className="text-slate-400">
                テクノロジーとエコロジーを両立した
                <br />
                高品質なメッキ加工サービスを提供
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:03-XXXX-XXXX" className="hover:text-white transition-colors">
                  03-XXXX-XXXX
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@washidu-mekki.com" className="hover:text-white transition-colors">
                  info@washidu-mekki.com
                </a>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>
                  〒XXX-XXXX
                  <br />
                  東京都XX区XXXX-XX-XX
                </span>
              </div>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-white mb-4">サービス</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white mb-4">会社情報</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="text-white mb-4">その他</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {currentYear} 有限会社 鷲津メッキ工業所 All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                ページトップへ ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
