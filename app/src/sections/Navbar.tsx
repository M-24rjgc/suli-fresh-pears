import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: '网站首页', href: '#home' },
  {
    label: '关于酥梨',
    href: '#about',
    children: [
      { label: '宁陵酥梨介绍', href: '#about' },
      { label: '产地优势', href: '#about' },
      { label: '品牌故事', href: '#about' },
    ],
  },
  {
    label: '鲜果专区',
    href: '#fresh',
    children: [
      { label: '特级大果', href: '#fresh' },
      { label: '一级中果', href: '#fresh' },
      { label: '煲汤小果', href: '#fresh' },
      { label: '礼盒装', href: '#fresh' },
    ],
  },
  {
    label: '深加工产品',
    href: '#products',
    children: [
      { label: '梨膏系列', href: '#products' },
      { label: '梨汁饮品', href: '#products' },
      { label: '梨膏棒棒糖', href: '#products' },
      { label: '文创礼盒', href: '#products' },
    ],
  },
  {
    label: '农文旅融合',
    href: '#tourism',
    children: [
      { label: '梨花节', href: '#tourism' },
      { label: '采摘体验', href: '#tourism' },
      { label: '研学活动', href: '#tourism' },
      { label: '门票预约', href: '#tourism' },
    ],
  },
  { label: '热点新闻', href: '#news' },
  { label: '联系我们', href: '#contact' },
];

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary/95 backdrop-blur-sm shadow-lg'
          : 'bg-primary/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">梨</span>
            </div>
            <div className="text-white">
              <div className="text-xl font-bold tracking-wider">梨中小馆</div>
              <div className="text-xs tracking-widest opacity-80">宁陵酥梨</div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center px-4 py-2 text-white hover:text-white/80 transition-colors"
                >
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.children && (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-48 bg-primary shadow-xl rounded-b-lg overflow-hidden"
                    >
                      {item.children.map((child, index) => (
                        <a
                          key={index}
                          href={child.href}
                          className="block px-4 py-3 text-sm text-white hover:bg-primary-dark transition-colors border-b border-white/10 last:border-b-0"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-white hover:text-white/80 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary-dark"
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  className="block px-4 py-3 text-white hover:bg-primary/50 border-b border-white/10"
                  onClick={() => !item.children && setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="bg-primary/50">
                    {item.children.map((child, index) => (
                      <a
                        key={index}
                        href={child.href}
                        className="block px-8 py-2 text-sm text-white/80 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}