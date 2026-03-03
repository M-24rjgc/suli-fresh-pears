import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: import.meta.env.BASE_URL + 'images/hero-bg.jpg',
    title: '宁陵酥梨 · 品牌焕新升级',
    subtitle: '产地直发 · 数智运营 · 文旅融合',
    description: [
      '以现代供应链连接果园与餐桌，品质新鲜看得见',
      '让每一口酥梨都来自宁陵原产地的安心承诺',
    ],
  },
  {
    image: import.meta.env.BASE_URL + 'images/梨花节.jpg',
    title: '宁陵酥梨 · 中国酥梨之乡',
    subtitle: '国家地理标志保护产品 | 700年贡梨历史',
    description: [
      '22万亩标准化种植基地，年产65万吨优质酥梨',
      '从鲜果到深加工，从田间到舌尖，品味正宗宁陵味道',
    ],
  },
  {
    image: import.meta.env.BASE_URL + 'images/pear-picking.jpg',
    title: '春赏花 · 夏乘荫 · 秋品果 · 冬研学',
    subtitle: '四季农文旅融合体验',
    description: [
      '梨花节、采摘节、研学活动全年精彩不断',
      '门票预约享优惠，体验正宗梨乡文化',
    ],
  },
  {
    image: import.meta.env.BASE_URL + 'images/ancient-tree.jpg',
    title: '百年古梨树 · 千年梨文化',
    subtitle: '1070棵百年古梨树见证历史',
    description: [
      '黄河故道古梨园，中国重要农业文化遗产',
      '认养古梨树，传承梨乡文化',
    ],
  },
  {
    image: import.meta.env.BASE_URL + 'images/hero-bg2.jpg',
    title: '一颗酥梨的产业故事',
    subtitle: '鲜果、文创、深加工协同发展',
    description: [
      '从采后分级到品牌包装，打造高附加值产品矩阵',
      '以科技赋能传统农业，推动乡村产业持续升级',
    ],
  },
  {
    image: import.meta.env.BASE_URL + 'images/hero-pear.jpg',
    title: '现摘现发 · 脆甜多汁',
    subtitle: '当季鲜果，冷链锁鲜到家',
    description: [
      '标准化果园管理，层层筛选只为口感与品质',
      '下单即发，省内次日达，省外快速达',
    ],
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-lg tracking-wider">
                {slides[currentSlide].title}
              </h1>
              
              <div className="w-24 h-1 bg-brand-gold mx-auto mb-6" />
              
              <h2 className="text-xl md:text-2xl font-medium text-brand-gold mb-8 text-shadow">
                {slides[currentSlide].subtitle}
              </h2>
              
              <div className="space-y-2 mb-8">
                {slides[currentSlide].description.map((line, index) => (
                  <p
                    key={index}
                    className="text-lg md:text-xl text-white/90 text-shadow"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#fresh"
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors font-medium"
                >
                  立即选购
                </a>
                <a
                  href="#about"
                  className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg transition-colors font-medium backdrop-blur-sm"
                >
                  了解更多
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-10 h-10" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 text-white/70 hover:text-white transition-colors"
      >
        <ChevronRight className="w-10 h-10" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-brand-gold w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}