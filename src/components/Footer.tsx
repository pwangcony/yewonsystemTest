import { Wind } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Wind size={18} />
              </div>
              <span className="text-lg font-bold tracking-tight">YEWON SYSTEM</span>
            </div>
            <p className="text-gray-400 max-w-sm break-keep">
              쾌적한 공기와 건강한 공간을 만듭니다. 주거 및 상업 환경을 위한 프리미엄 공조 솔루션.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">기업 정보</h4>
            <ul className="space-y-2 text-sm">
              <li>대표: 홍길동</li>
              <li>사업자등록번호: 123-45-67890</li>
              <li>이메일: contact@yewonsystem.com</li>
              <li>대표번호: 1588-0000</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">오시는 길</h4>
            <p className="text-sm">
              서울특별시 강남구 테헤란로 123,<br />
              예원빌딩 4층<br />
              06236
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} 예원시스템. 모든 권리 보유.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
