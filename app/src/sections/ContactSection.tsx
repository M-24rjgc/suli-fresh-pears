import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Globe, MessageCircle, Contact2 } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: '品牌热线',
    value: '400-066-2978',
  },
  {
    icon: Phone,
    label: '联系方式',
    value: '13803556813 / 15007928484',
  },
  {
    icon: MapPin,
    label: '公司地址',
    value: '河南省商丘市宁陵县',
  },
  {
    icon: Globe,
    label: '官方网址',
    value: 'www.lslmy.com',
  },
  {
    icon: MessageCircle,
    label: '微信公众号',
    value: '梨中小馆',
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-20 bg-white" ref={ref}>
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
              <Contact2 className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            联系我们
          </h2>
          <p className="text-gray-500 tracking-widest">CONTACT</p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                梨中小馆
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{item.label}</p>
                      <p className="text-gray-800 font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                关注微信公众号
              </h4>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <span className="text-gray-400 text-xs text-center">
                    二维码
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">扫码关注"梨中小馆"</p>
                  <p className="text-gray-500 text-sm">获取最新优惠信息</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-xl"
            style={{
              backgroundImage: 'url(/images/contact-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] flex items-center justify-center bg-white/80 backdrop-blur-[1px]">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-gray-600">河南省商丘市宁陵县</p>
                <p className="text-gray-500 text-sm mt-2">
                  黄河故道古梨园景区
                </p>
                <a
                  href="https://map.baidu.com/search/河南省商丘市宁陵县"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
                >
                  查看地图
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}