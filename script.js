/* DOM 로드 완료 후 실행 */
document.addEventListener('DOMContentLoaded', () => {
    /* 로그인 모달 제어 */
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

/* 슬라이더 제어 */
    const slides = document.querySelectorAll('.slide');
    const backSlideBtn = document.querySelector('.back-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    const hmsColor = document.querySelector('.hms-color');
    let currentSlide = 0;

    // 슬라이드별 배경 정의
    const slideBackgrounds = [
        'linear-gradient(to right, #debcfb, #ffffff)', // 슬라이드 1 (부산)
        'linear-gradient(to right, #b3e5fc, #ffffff)'  // 슬라이드 2 (제주도)
        
    ];

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
                // 배경 그라디언트 변경
                if (hmsColor) {
                    hmsColor.style.background = slideBackgrounds[index];
                }
            }
        });
        updateSlideNumber();
    }

    function updateSlideNumber() {
        const totalSlides = slides.length;
        const currentNumber = (currentSlide + 1).toString().padStart(2, '0');
        document.querySelector('.slide-number').textContent = `${currentNumber} / ${totalSlides.toString().padStart(2, '0')}`;
    }

    if (backSlideBtn && nextSlideBtn && slides.length && hmsColor) {
        nextSlideBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        backSlideBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        // 초기 슬라이드 및 배경 표시
        showSlide(currentSlide);

        // 5초마다 슬라이드 및 배경 자동 전환
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000); // 5000ms = 5초
    }



    /* 지역 메뉴 버튼 클릭 시 내용 변경 */
    const regionButtons = document.querySelectorAll('.region-btn');
    const regionTitle = document.querySelector('#region-title');
    const regionDescription = document.querySelector('#region-description');
    const regionImage = document.querySelector('#region-image');

    // 지역별 데이터 정의
    const regionData = {
        'seogwipo': {
            title: '서귀포',
            description: '서귀포는 제주도 남쪽에 위치한 아름다운 도시로, 푸른 바다와 독특한 자연경관으로 유명합니다. 주요 관광지로는 천지연 폭포, 정방 폭포, 그리고 오설록 티 뮤지엄이 있습니다. 따뜻한 기후와 신선한 해산물 요리도 큰 매력입니다.',
            image: 'picture/jeju_flower.jpg',
            alt: '서귀포 이미지'
        },
        'jeju-city': {
            title: '제주시',
            description: '제주시는 제주도의 중심 도시로, 공항과 가까워 접근성이 좋습니다. 용두암, 한라산 국립공원, 동문시장이 유명하며, 다양한 맛집과 카페도 즐길 수 있습니다.',
            image: 'picture/jeju_city.jpg',
            alt: '제주시 이미지'
        },
        'hallim': {
            title: '한림',
            description: '한림은 제주도 서쪽에 위치하며, 한림공원과 협재 해수욕장으로 유명합니다. 특히 금능 해변의 에메랄드빛 바다와 고즈넉한 풍경이 매력적입니다.',
            image: 'picture/hallim.jpg',
            alt: '한림 이미지'
        },
        'aewol': {
            title: '애월',
            description: '애월은 제주도 북서쪽에 자리 잡고 있으며, 해안 드라이브 코스로 유명합니다. 곽지 해수욕장과 애월 한담 해안 산책로에서 멋진 바다 풍경을 감상할 수 있습니다.',
            image: 'picture/aewol.jpg',
            alt: '애월 이미지'
        }
    };

    // 버튼 클릭 이벤트 추가
    if (regionButtons.length && regionTitle && regionDescription && regionImage) {
        regionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 모든 버튼에서 active 클래스 제거
                regionButtons.forEach(btn => btn.classList.remove('active'));
                // 클릭된 버튼에 active 클래스 추가
                button.classList.add('active');

                // 선택된 지역 데이터 가져오기
                const region = button.getAttribute('data-region');
                const data = regionData[region];

                // 내용 업데이트
                if (data) {
                    regionTitle.textContent = data.title;
                    regionDescription.textContent = data.description;
                    regionImage.src = data.image;
                    regionImage.alt = data.alt;
                }
            });
        });
    } else {
        console.error('지역 메뉴 요소를 찾을 수 없습니다.');
    }
});

function initializeMap() {
    const mapOptions = {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 서울 중심
        zoom: 13
    };
    const map = new naver.maps.Map('map', mapOptions);
}