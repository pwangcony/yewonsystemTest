import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative bg-white overflow-hidden snap-start snap-always min-h-screen flex flex-col justify-center">
      <div className="flex flex-col lg:flex-row min-h-[800px]">
        
        {/* Left: Form & Info */}
        <div className="w-full lg:w-1/2 p-10 md:p-20 flex flex-col justify-center relative z-10 bg-white">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <h2 className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-3">문의하기</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              더 나은 공간을 위한 <br />최고의 선택
            </h3>
            <p className="text-gray-600 text-lg mb-12 break-keep">
              예원시스템의 전문가 팀이 고객님의 환경을 분석하여 최적의 공조 솔루션을 제안해 드립니다.
            </p>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 rounded-2xl p-10 text-center border border-green-100"
              >
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">문의 접수 완료!</h4>
                <p className="text-gray-600">성공적으로 문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">이름 / 회사명</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-gray-50"
                      placeholder="홍길동 / (주)예원"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">연락처</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-gray-50"
                      placeholder="010-0000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service-type" className="text-sm font-medium text-gray-700">시설 설비 옵션</label>
                  <select 
                    id="service-type" 
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-gray-50"
                  >
                    <option value="">옵션을 선택해주세요</option>
                    <option value="residential">주거용 시스템 에어컨</option>
                    <option value="commercial">상업용 시스템 에어컨</option>
                    <option value="ventilation">환기 시스템</option>
                    <option value="maintenance">유지보수 및 A/S</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium text-gray-700">상세 문의 내용</label>
                  <textarea 
                    id="details" 
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-gray-50 resize-none"
                    placeholder="프로젝트의 요구 사항, 일정 및 특별히 필요하신 내용을 자세히 적어주세요."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gray-900 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group"
                >
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  문의 접수하기
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Map */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-full bg-gray-100 flex items-center justify-center">
          {/* Gradient Mask for blending */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden lg:block pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10 lg:hidden pointer-events-none" />

          {/* Naver Map Placeholder */}
          <div className="text-center z-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <MapPin size={32} className="text-gray-400" />
            </div>
            <h4 className="text-xl font-bold text-gray-600 mb-2">네이버 지도 API 영역</h4>
            <p className="text-gray-500 text-sm">실제 연동 시 이 공간에 지도가 표시됩니다.</p>
          </div>

          {/* Floating Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 z-30 w-[90%] max-w-sm bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/40"
          >
            <h4 className="text-xl font-bold text-gray-900 mb-4">오시는 길</h4>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">서울특별시 강남구 테헤란로 123,<br />예원빌딩 4층</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary-600 shrink-0" />
                <p className="text-sm text-gray-700">1588-0000</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary-600 shrink-0" />
                <p className="text-sm text-gray-700">contact@yewonsystem.com</p>
              </div>
            </div>
            <a 
              href="#"
              className="block w-full py-3 bg-white hover:bg-gray-50 text-primary-600 font-semibold text-center rounded-xl border border-primary-100 transition-colors"
            >
              네이버 지도로 길찾기
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
