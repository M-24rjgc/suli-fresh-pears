import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  weight: string;
  price: number;
  origin: string;
}

const categories = [
  { id: 'all', label: '全部' },
  { id: 'large', label: '特级大果' },
  { id: 'medium', label: '一级中果' },
  { id: 'small', label: '煲汤小果' },
  { id: 'gift', label: '礼盒装' },
];

const products: Product[] = [
  {
    id: 1,
    name: '煲汤小果',
    category: 'small',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    weight: '5斤',
    price: 19,
    origin: '宁陵核心产区',
  },
  {
    id: 2,
    name: '现摘老梨树大果',
    category: 'large',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    weight: '5斤',
    price: 25,
    origin: '百年老梨树',
  },
  {
    id: 3,
    name: '现摘煲汤炖梨小果',
    category: 'small',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    weight: '9-10斤',
    price: 35,
    origin: '宁陵核心产区',
  },
  {
    id: 4,
    name: '现摘商超品质精选中果',
    category: 'medium',
    image: import.meta.env.BASE_URL + 'images/pear-product.jpg',
    weight: '9-10斤',
    price: 37.85,
    origin: '宁陵核心产区',
  },
  {
    id: 5,
    name: '现摘老梨树大果礼盒装',
    category: 'gift',
    image: import.meta.env.BASE_URL + 'images/pear-giftbox.jpg',
    weight: '9-10斤',
    price: 39,
    origin: '百年老梨树',
  },
  {
    id: 6,
    name: '特级酥梨鲜果礼盒',
    category: 'gift',
    image: import.meta.env.BASE_URL + 'images/pear-giftbox.jpg',
    weight: '8个/盒',
    price: 88,
    origin: '宁陵核心产区',
  },
];

interface FreshPearsSectionProps {
  onAddToCart: (product: Product) => void;
}

export default function FreshPearsSection({ onAddToCart }: FreshPearsSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section id="fresh" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            鲜果专区
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            精选宁陵核心产区优质酥梨，现摘现发，新鲜直达
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                <div className="absolute top-3 left-3">
                  <span className="bg-brand-gold text-white text-xs px-2 py-1 rounded">
                    {product.origin}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-3">{product.weight}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-accent">¥{product.price}</span>
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
      </div>
    </section>
  );
}