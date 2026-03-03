import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, TrendingDown, Package, Gift, Zap } from 'lucide-react';

interface Promotion {
  id: number;
  type: string;
  title: string;
  desc: string;
  originalPrice?: number;
  currentPrice?: number;
  discount?: string;
  stock?: number;
  sold?: number;
  icon: React.ElementType;
}

const promotions: Promotion[] = [
  {
    id: 1,
    type: 'bundle',
    title: '捆绑销售',
    desc: '酥梨5斤 + 梨膏1瓶',
    originalPrice: 58.9,
    currentPrice: 49.9,
    discount: '省¥9',
    icon: Package,
  },
  {
    id: 2,
    type: 'flash',
    title: '限量秒杀',
    desc: '老梨树大果礼盒',
    originalPrice: 39,
    currentPrice: 29,
    stock: 100,
    sold: 67,
    icon: Zap,
  },
  {
    id: 3,
    type: 'discount',
    title: '满减活动',
    desc: '满99减10 · 满199减30 · 满299减50',
    icon: TrendingDown,
  },
  {
    id: 4,
    type: 'new',
    title: '新品尝鲜',
    desc: 'NFC鲜榨梨汁',
    currentPrice: 15,
    icon: Gift,
  },
];

const SALE_END_TIME = new Date('2026-12-31T23:59:59+08:00').getTime();

function getTimeLeft() {
  const total = Math.max(SALE_END_TIME - Date.now(), 0);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { total, days, hours, minutes, seconds };
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.total <= 0) {
    return (
      <div className="flex items-center space-x-2 text-white font-medium">
        <Clock className="w-5 h-5" />
        <span>本轮活动已结束</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Clock className="w-5 h-5 text-white" />
      <div className="flex space-x-1">
        {[
          { value: timeLeft.days, label: '天' },
          { value: timeLeft.hours, label: '时' },
          { value: timeLeft.minutes, label: '分' },
          { value: timeLeft.seconds, label: '秒' },
        ].map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="bg-white/20 text-white px-2 py-1 rounded text-lg font-bold min-w-[36px] text-center">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-white/80 text-sm ml-1">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PromotionsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 bg-gradient-to-br from-accent via-accent/90 to-orange-500" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            限时特惠
          </h2>
          <div className="flex items-center justify-center">
            <CountdownTimer />
          </div>
        </motion.div>

        {/* Promotions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {promotions.map((promo, index) => (
            (() => {
              const hasStockData = promo.stock !== undefined && promo.sold !== undefined;
              const soldPercent = hasStockData
                ? Math.min(100, Math.round((promo.sold! / promo.stock!) * 100))
                : 0;
              const remainingStock = hasStockData
                ? Math.max(promo.stock! - promo.sold!, 0)
                : 0;

              return (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <promo.icon className="w-6 h-6 text-accent" />
                      </div>
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded">
                        {promo.type === 'bundle' && '捆绑'}
                        {promo.type === 'flash' && '秒杀'}
                        {promo.type === 'discount' && '满减'}
                        {promo.type === 'new' && '新品'}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {promo.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{promo.desc}</p>

                    {hasStockData && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>已售 {promo.sold} 件（{soldPercent}%）</span>
                          <span>剩余 {remainingStock} 件</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: `${soldPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        {promo.currentPrice && (
                          <span className="text-2xl font-bold text-accent">
                            ¥{promo.currentPrice}
                          </span>
                        )}
                        {promo.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ¥{promo.originalPrice}
                          </span>
                        )}
                        {promo.discount && (
                          <span className="text-sm text-green-500 ml-2">
                            {promo.discount}
                          </span>
                        )}
                      </div>
                      <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors text-sm">
                        立即抢购
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })()
          ))}
        </motion.div>
      </div>
    </section>
  );
}