import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Users, MapPin, Clock, CheckCircle, Ticket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Activity {
  id: string;
  season: string;
  title: string;
  time: string;
  location: string;
  price: number;
  description: string;
  features: string[];
  image: string;
}

const activities: Activity[] = [
  {
    id: 'spring',
    season: '春季',
    title: '梨花节',
    time: '3-4月',
    location: '万顷梨园',
    price: 30,
    description: '梨花盛开，万顷梨园变成白色花海，汉服拍照打卡胜地',
    features: ['梨花观赏', '汉服拍照', '梨花小铺', '限定伴手礼'],
    image: import.meta.env.BASE_URL + 'images/梨花节.jpg',
  },
  {
    id: 'summer',
    season: '夏季',
    title: '研学营',
    time: '7-8月',
    location: '梨文化研学基地',
    price: 69,
    description: '亲子研学体验，了解梨文化，动手制作梨膏',
    features: ['古梨树导览', '梨膏熬制体验', '梨渣造纸DIY', '亲子互动'],
    image: import.meta.env.BASE_URL + 'images/梨花汉服.jpg',
  },
  {
    id: 'autumn',
    season: '秋季',
    title: '采摘节',
    time: '9-10月',
    location: '黄河故道古梨园',
    price: 45,
    description: '亲手采摘酥梨，品尝即食炖梨，带走新鲜果实',
    features: ['酥梨采摘', '梨园寻宝', '即食炖梨品尝', '5斤带走'],
    image: import.meta.env.BASE_URL + 'images/酥梨采摘.jpg',
  },
  {
    id: 'winter',
    season: '冬季',
    title: '年俗展',
    time: '1-2月',
    location: '宁陵年货节会场',
    price: 0,
    description: '梨乡年礼，非遗展示，年货采购一站式体验',
    features: ['文创礼盒', '非遗展示', '年货采购', '企业福利'],
    image: import.meta.env.BASE_URL + 'images/pear-picking.jpg',
  },
];

export default function TourismSection() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    people: 1,
    name: '',
    phone: '',
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleBook = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowDialog(true);
    setBookingSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <section id="tourism" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            农文旅融合
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            春赏花、夏乘荫、秋品果、冬研学，四季精彩不断
          </p>
        </motion.div>

        {/* Activities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    {activity.season}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {activity.title}
                </h3>
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {activity.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {activity.location}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {activity.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs bg-brand-yellow/50 text-primary px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {activity.price > 0 ? (
                      <span className="text-2xl font-bold text-accent">
                        ¥{activity.price}
                        <span className="text-sm text-gray-400 font-normal">/人</span>
                      </span>
                    ) : (
                      <span className="text-lg font-medium text-primary">免费</span>
                    )}
                  </div>
                  <button
                    onClick={() => handleBook(activity)}
                    className="flex items-center space-x-1 bg-brand-gold hover:bg-brand-gold/80 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>预约</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">306万</div>
            <div className="text-gray-500">年接待游客</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">14.42亿</div>
            <div className="text-gray-500">旅游综合收入</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">12个</div>
            <div className="text-gray-500">标准化观光点</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">3个</div>
            <div className="text-gray-500">研学实践基地</div>
          </div>
        </motion.div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              预约{selectedActivity?.title}
            </DialogTitle>
          </DialogHeader>

          {!bookingSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  选择日期
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  人数
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    min={1}
                    max={20}
                    required
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系人姓名
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="请输入姓名"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系电话
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="请输入手机号"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">合计</span>
                  <span className="text-2xl font-bold text-accent">
                    ¥{selectedActivity ? selectedActivity.price * formData.people : 0}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg transition-colors font-medium"
                >
                  确认预约
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                预约成功！
              </h3>
              <p className="text-gray-500 mb-4">
                我们会尽快与您联系确认预约信息
              </p>
              <button
                onClick={() => setShowDialog(false)}
                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-colors"
              >
                知道了
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}