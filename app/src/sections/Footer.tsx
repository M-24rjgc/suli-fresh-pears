import { MapPin, Phone, Globe } from 'lucide-react';

const footerLinks = [
  { label: '网站首页', href: '#home' },
  { label: '关于酥梨', href: '#about' },
  { label: '鲜果专区', href: '#fresh' },
  { label: '深加工产品', href: '#products' },
  { label: '农文旅融合', href: '#tourism' },
  { label: '热点新闻', href: '#news' },
  { label: '联系我们', href: '#contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">梨</span>
              </div>
              <div>
                <div className="text-xl font-bold">梨中小馆</div>
                <div className="text-xs opacity-70">宁陵酥梨</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              以宁陵酥梨为核心，构建"产品创新+数智化运营"双轮驱动的产业升级体系，
              为大家带来健康的特色食品，助力乡村振兴战略落地。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">快速链接</h3>
            <div className="grid grid-cols-2 gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">联系方式</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  河南省商丘市宁陵县
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-gray-400 text-sm">400-066-2978</p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-gray-400 text-sm">www.lslmy.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Navigation */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {footerLinks.map((link, index) => (
                <span key={link.label} className="flex items-center">
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-gray-600 ml-4">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              Copyright @ {currentYear} 梨中小馆 版权所有
            </p>
            <p className="text-gray-600 text-xs mt-2">
              国家地理标志保护产品 · 中国酥梨之乡
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}