import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

// 모바일 뷰포트 여부를 감지하는 커스텀 훅
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    );

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    // 래퍼 함수로 초기값 설정
    handleChange();

    // 변경 감지
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
