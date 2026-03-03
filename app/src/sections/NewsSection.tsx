import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    title: '2026宁陵梨花文化季发布年度活动日历',
    date: '2026-02-18',
    excerpt: '宁陵县发布2026年度梨花文化季活动安排，涵盖赏花节、非遗体验、研学路线与农产品市集，持续推进农文旅融合发展...',
    image: '/images/梨花节.jpg',
  },
  {
    id: 2,
    title: '宁陵酥梨标准化示范基地通过年度复评',
    date: '2026-01-09',
    excerpt: '宁陵酥梨标准化种植示范基地顺利通过年度复评，果园管理、品质追溯与冷链仓储能力持续提升，助力品牌高质量发展...',
    image: '/images/news-bg.jpg',
  },
  {
    id: 3,
    title: '高校创新团队发布酥梨深加工新品方案',
    date: '2026-02-03',
    excerpt: '多所高校联合宁陵本地企业发布酥梨深加工新品方案，围绕梨膏、梨汁与文创礼盒展开产品升级，推动产业链协同创新...',
    image: '/images/news-event.jpg',
  },
];

export default function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="news" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            热点新闻
          </h2>
          <p className="text-gray-500">了解宁陵酥梨最新动态</p>
        </motion.div>

        {/* News Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {newsItems.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-gray-800 font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {news.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-1" />
                  {news.date}
                </div>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {news.excerpt}
                </p>
                
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>阅读更多</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg transition-colors font-medium">
            查看更多
          </button>
        </motion.div>
      </div>
    </section>
  );
}