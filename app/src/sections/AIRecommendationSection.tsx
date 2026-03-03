import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, ShoppingCart } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string }[];
}

interface RecommendationProduct {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
}

const questions: Question[] = [
  {
    id: 'identity',
    question: '您的身份是？',
    options: [
      { value: 'student', label: '学生' },
      { value: 'worker', label: '上班族' },
      { value: 'mom', label: '宝妈' },
      { value: 'elderly', label: '中老年' },
    ],
  },
  {
    id: 'purpose',
    question: '购买用途？',
    options: [
      { value: 'self', label: '自用' },
      { value: 'gift', label: '送礼' },
      { value: 'health', label: '养生' },
      { value: 'child', label: '儿童' },
    ],
  },
  {
    id: 'budget',
    question: '预算范围？',
    options: [
      { value: 'low', label: '20元以下' },
      { value: 'medium', label: '20-50元' },
      { value: 'high', label: '50-100元' },
      { value: 'premium', label: '100元以上' },
    ],
  },
  {
    id: 'type',
    question: '偏好类型？',
    options: [
      { value: 'fresh', label: '鲜果' },
      { value: 'paste', label: '梨膏' },
      { value: 'juice', label: '梨汁' },
      { value: 'gift', label: '文创' },
    ],
  },
];

const recommendations: Record<string, RecommendationProduct[]> = {
  'student-self-low-fresh': [
    { id: 301, name: '煲汤小果', desc: '5斤装，性价比高', price: 19, image: import.meta.env.BASE_URL + 'images/pear-product.jpg' },
  ],
  'worker-health-medium-paste': [
    { id: 302, name: '酥梨膏', desc: '250g/瓶，润肺养生', price: 39.9, image: import.meta.env.BASE_URL + 'images/pear-paste.jpg' },
  ],
  'mom-child-medium-juice': [
    { id: 303, name: '梨膏棒棒糖', desc: '10支/袋，无添加', price: 18.8, image: import.meta.env.BASE_URL + 'images/pear-lollipop.jpg' },
  ],
  'worker-gift-premium-gift': [
    { id: 304, name: '酥梨膏礼盒装', desc: '250ml*4，高端大气', price: 128, image: import.meta.env.BASE_URL + 'images/pear-paste.jpg' },
  ],
  default: [
    { id: 305, name: '现摘老梨树大果', desc: '5斤装，百年老梨树', price: 25, image: import.meta.env.BASE_URL + 'images/pear-product.jpg' },
    { id: 306, name: '酥梨膏', desc: '250g/瓶，传统工艺', price: 39.9, image: import.meta.env.BASE_URL + 'images/pear-paste.jpg' },
    { id: 307, name: '梨膏棒棒糖', desc: '10支/袋，健康零食', price: 18.8, image: import.meta.env.BASE_URL + 'images/pear-lollipop.jpg' },
  ],
};

interface AIRecommendationSectionProps {
  onAddToCart: (product: RecommendationProduct) => void;
}

export default function AIRecommendationSection({ onAddToCart }: AIRecommendationSectionProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleSelect = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
  };

  const getRecommendations = () => {
    const key = `${answers.identity}-${answers.purpose}-${answers.budget}-${answers.type}`;
    return recommendations[key] || recommendations.default;
  };

  const isComplete = Object.keys(answers).length === questions.length;

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-brand-yellow/20 to-brand-gold/10" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              AI智能推荐
            </h2>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-gray-500">
            告诉我们您的需求，为您推荐最适合的产品
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="space-y-8">
                {questions.map((q, qIndex) => (
                  <div key={q.id}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {qIndex + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {q.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleSelect(q.id, option.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            answers[q.id] === option.value
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-gray-200 hover:border-primary/50 text-gray-600'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    isComplete
                      ? 'bg-primary hover:bg-primary-dark text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  获取推荐
                </button>
                {!isComplete && (
                  <p className="text-sm text-gray-400 mt-2">
                    请回答所有问题以获取推荐
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  为您推荐以下产品
                </h3>
                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 text-primary hover:text-primary-dark"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>重新选择</span>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {getRecommendations().map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-500">{product.desc}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xl font-bold text-accent">
                          ¥{product.price}
                        </span>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="flex items-center space-x-1 bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded transition-colors text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>加入购物车</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}