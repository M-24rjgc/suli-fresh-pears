import { useEffect, useRef } from 'react';
import { Megaphone } from 'lucide-react';

const announcements = [
  '🎉 2026宁陵梨花文化季即将启动，早鸟票限时8.5折！',
  '🍐 新鲜酥梨上市，现摘现发，满99元包邮！',
  '🎁 梨膏礼盒春季促销进行中，下单立减10元！',
  '🌸 2026春季研学营报名开启，亲子沉浸式梨文化体验！',
];

export default function Announcement() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 0.5;
      if (position <= -scrollContainer.scrollWidth / 2) {
        position = 0;
      }
      scrollContainer.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="bg-gradient-to-r from-brand-yellow to-brand-gold/30 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center space-x-2 flex-shrink-0 mr-4">
          <Megaphone className="w-5 h-5 text-primary" />
          <span className="font-medium text-primary">公告</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div ref={scrollRef} className="flex space-x-12 whitespace-nowrap">
            {[...announcements, ...announcements].map((text, index) => (
              <span key={index} className="text-sm text-gray-700">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}