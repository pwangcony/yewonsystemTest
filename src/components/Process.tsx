import { motion } from 'motion/react';
import { MessageSquare, PenTool, Wrench, ShieldCheck } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: '맞춤 상담',
    description: '고객의 공간, 요구 사항 및 예산을 분석하여 가장 효율적인 공조 솔루션을 제안합니다.',
    icon: MessageSquare,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '02',
    title: '설계 및 기획',
    description: '전문 엔지니어가 기류를 최적화하고 미관을 해치지 않는 정밀한 도면을 설계합니다.',
    icon: PenTool,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '03',
    title: '전문 시공',
    description: '인증된 전문 기술자가 안전과 디테일에 세심한 주의를 기울여 시공을 진행합니다.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '04',
    title: '사후 관리',
    description: '시스템의 장기적인 신뢰성을 보장하기 위해 지속적인 지원과 정기적인 유지보수를 제공합니다.',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 bg-gray-900 text-white relative snap-start snap-always min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent-400 font-semibold tracking-wider uppercase text-sm mb-3">작업 프로세스</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">완벽한 공기를 위한 여정</h3>
          <p className="text-gray-400 text-lg break-keep">
            체계적인 접근 방식을 통해 모든 프로젝트가 예산 내에서 최고의 품질로 적기에 완료되도록 보장합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-accent-500/50 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-accent-500/10"
            >
              <div className="text-6xl font-black text-gray-700/30 absolute top-6 right-6 transition-colors group-hover:text-accent-500/10">
                {step.id}
              </div>
              <div className="w-14 h-14 bg-gray-700 group-hover:bg-accent-500 text-white rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-lg">
                <step.icon size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors break-keep">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
