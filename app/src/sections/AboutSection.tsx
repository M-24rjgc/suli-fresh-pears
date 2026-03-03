import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Award, History, Leaf } from 'lucide-react';

const stats = [
  { value: 22, unit: '万亩', label: '种植面积' },
  { value: 65, unit: '万吨', label: '年产量' },
  { value: 700, unit: '年', label: '种植历史' },
  { value: 1070, unit: '棵', label: '百年古梨树' },
];

const features = [
  {
    icon: Award,
    title: '国家地理标志',
    description: '宁陵金顶谢花酥梨为国家地理标志保护产品',
  },
  {
    icon: History,
    title: '700年贡梨历史',
    description: '明弘治年间即为贡品，传承至今',
  },
  {
    icon: Leaf,
    title: '绿色有机种植',
    description: '绿色食品认证，品质保证',
  },
];

function AnimatedNumber({ value, unit }: { value: number; unit: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count}{unit}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            关于宁陵酥梨
          </h2>
          <p className="text-gray-500 tracking-widest">ABOUT NINGLING PEAR</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedNumber value={stat.value} unit={stat.unit} />
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              宁陵县隶属于河南省商丘市，坐落于黄河故道腹地，地处豫鲁苏皖四省结合部的核心区域，
              是全国知名的"中国酥梨之乡"，也是宁陵酥梨国家地理标志保护产品的核心产地。
            </p>
            <p className="text-gray-600 leading-relaxed">
              县域内土壤以沙质壤土为主，土层深厚、疏松肥沃，且光照时长年均超2200小时，
              黄河故道水系带来了便利的灌溉条件，独特的自然禀赋成为酥梨生长的天然沃土，
              造就了宁陵酥梨果肉细嫩、汁多味甜、果核细小的优良品质。
            </p>
            <p className="text-gray-600 leading-relaxed">
              宁陵酥梨种植历史可追溯至数百年前，产业底蕴深厚，经过多年的培育与发展，
              目前酥梨种植已形成规模化、标准化格局，是全国酥梨品类的核心产区之一。
            </p>
            
            <div className="flex items-center space-x-2 text-primary">
              <MapPin className="w-5 h-5" />
              <span>河南省商丘市宁陵县</span>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={import.meta.env.BASE_URL + "images/ancient-tree.jpg"}
                alt="百年古梨树"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}