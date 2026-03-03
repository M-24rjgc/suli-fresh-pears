import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus, Star, CheckCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  spec: string;
  price: number;
  originalPrice?: number;
}

const categories = [
  { id: 'all', label: '全部' },
  { id: 'paste', label: '梨膏系列' },
  { id: 'juice', label: '梨汁饮品' },
  { id: 'candy', label: '梨膏棒棒糖' },
  { id: 'gift', label: '文创礼盒' },
];

const products: Product[] = [
  {
    id: 101,
    name: '酥梨膏',
    category: 'paste',
    image: import.meta.env.BASE_URL + 'images/pear-paste.jpg',
    spec: '250g/瓶',
    price: 39.9,
    originalPrice: 49.9,
  },
  {
    id: 102,
    name: '酥梨膏礼盒装',
    category: 'paste',
    image: import.meta.env.BASE_URL + 'images/pear-paste.jpg',
    spec: '250ml*4',
    price: 128,
    originalPrice: 158,
  },
  {
    id: 103,
    name: '梨膏棒棒糖',
    category: 'candy',
    image: import.meta.env.BASE_URL + 'images/pear-lollipop.jpg',
    spec: '10支/袋',
    price: 18.8,
  },
  {
    id: 104,
    name: '酥梨香炉水果摆件',
    category: 'gift',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    spec: '8.6*8.6*11.6cm',
    price: 39.8,
  },
  {
    id: 105,
    name: '小碗即食炖梨',
    category: 'paste',
    image: import.meta.env.BASE_URL + 'images/pear-stewed.jpg',
    spec: '6碗/盒',
    price: 68,
    originalPrice: 88,
  },
  {
    id: 106,
    name: '酥梨记事本',
    category: 'gift',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    spec: 'A5',
    price: 9.9,
  },
];

const processSteps = [
  { title: '原料采摘', desc: '精选宁陵优质酥梨' },
  { title: '清洗分拣', desc: '严格品控标准' },
  { title: '精深加工', desc: '传统工艺+现代技术' },
  { title: '包装发货', desc: '冷链直达' },
];

const reviews = [
  { user: '张女士', rating: 5, content: '梨膏口感很好，孩子很喜欢吃，润肺效果不错！' },
  { user: '李先生', rating: 5, content: '送礼很有面子，包装精美，品质上乘。' },
  { user: '王妈妈', rating: 5, content: '棒棒糖造型可爱，孩子爱吃，比普通的糖健康。' },
];

interface ProcessedProductsSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function ProcessedProductsSection({ onAddToCart }: ProcessedProductsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            深加工产品
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            从田间到舌尖，每一口都是匠心
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{step.title}</span>
                  <span className="text-xs text-gray-500">{step.desc}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block w-16 h-0.5 bg-primary/20 ml-4" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-accent text-white text-xs px-2 py-1 rounded">
                      特惠
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.spec}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-accent">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ¥{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center space-x-1 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>加入购物车</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            用户评价
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-3">
                  <div className="flex text-brand-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{review.content}</p>
                <p className="text-sm text-gray-400">—— {review.user}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}