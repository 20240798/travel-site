// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 로그인 모달 제어
    const loginBtn = document.querySelector('.login-btn');
    const modal = document.querySelector('#login-modal');
    const closeBtn = document.querySelector('.close');

    if (loginBtn && modal && closeBtn) {
        loginBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // 햄버거 메뉴 제어
    const hamburger = document.querySelector('.hamburger');
    const menuList = document.querySelector('.menu-list');

    if (hamburger && menuList) {
        hamburger.addEventListener('click', () => {
            menuList.classList.toggle('active');
        });
    }

    // 슬라이더 제어
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const slideNumber = document.querySelector('.slide-number');

    if (slides.length < 2) {
        console.error('슬라이드 개수가 2개 미만입니다. 최소 2개 이상의 슬라이드가 필요합니다.');
        return;
    }

    let currentSlide = 0;

    // 슬라이드 업데이트 함수
    function updateSlide() {
        if (!slides.length || !slideNumber) {
            console.error('슬라이드 또는 슬라이드 번호 요소를 찾을 수 없습니다.');
            return;
        }

        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
                console.log(`현재 슬라이드: ${currentSlide + 1}`);
            }
        });
        slideNumber.textContent = `${String(currentSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }

    // 다음 슬라이드
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    // 이전 슬라이드
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    // 버튼 이벤트 리스너
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('다음 버튼 클릭');
            nextSlide();
        });
        prevBtn.addEventListener('click', () => {
            console.log('이전 버튼 클릭');
            prevSlide();
        });
    } else {
        console.error('슬라이더 버튼을 찾을 수 없습니다.');
    }

    // 자동 슬라이드 (5초마다)
    const slideInterval = setInterval(() => {
        console.log('자동 슬라이드 전환');
        nextSlide();
    }, 5000);

    // 초기 슬라이드 설정
    updateSlide();

    // 검색 기능 (기본적인 지역 검색 예시)
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.toLowerCase();
            const regions = {
                '경기도': 'gyeonggi.html',
                '강원도': 'gangwon.html',
                '충청북도': 'chungbuk.html',
                '충청남도': 'chungnam.html',
                '경상북도': 'gyeongbuk.html',
                '경상남도': 'gyeongnam.html',
                '전라북도': 'jeonbuk.html',
                '전라남도': 'jeonnam.html',
                '제주도': 'jeju.html'
            };

            for (let region in regions) {
                if (region.toLowerCase().includes(query)) {
                    window.location.href = regions[region];
                    break;
                }
            }
        });

        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }
});