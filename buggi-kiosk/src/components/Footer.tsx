const Footer = () => {
  return (
    <footer className="flex flex-col gap-4">

      {/* 운영시간 및 QR 버튼 */}
      <div className="operating-hours flex justify-between items-center gap-4 bg-white rounded-xl p-6 shadow-md flex-wrap">
        <div className="hours-info flex items-center gap-2 text-gray-600">
          <div className="hours-text flex flex-col gap-1">
            <strong className="text-gray-900">운영시간 </strong>
            <span className="text-sm">
              평일 08:00 - 22:00 | 토요일 09:00 - 18:00 | 일요일 휴관
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;