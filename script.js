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
        //제주
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
        }, 
        //경북
        'gyeongju': {
            title: '경주',
            description: '경주는 천년 고도 신라의 수도로 도시 전체가 하나의 박물관이라 불릴만큼 풍부한 역사 유산을 간직한 곳입니다 불국사와 석굴암은 유네스코 세계 문화유산으로 지정되어 있으며 청성대,대릉원 등 고대 신라의 문명을 직접 느낄 수 있는 명소로 가득합니다.',
            image: 'picture/gyeongju.jpg',
            alt: '경주 이미지'
        },
        'andong': {
            title: '안동',
            description: '안동은 하회마을이 유네스코 세계문화유산으로 지정되어 있으며 조선시대의 서원이 그대로 보존되어 있습니다 안동국제탈춤페스티벌과 안동찜닭, 간고등어 등 지역 특산물도 유명합니다 한국 전통 정신문화와 풍속을 깊이 있게 체험 할 수 있는 귀중한 여행지입니다.',
            image: 'picture/andong.jpg',
            alt: '안동 이미지'
        },
        'pohang': {
            title: '포항',
            description: '포항은 대한민국 동해안의 대표 항구 도시로 산업과 해양 관광이 조화를 이루는 도시입니다 호미곶 해맞이광장은 한번도에서 해가 가장 먼저 뜨는 곳으로 매년 많은 관광객이 찾으며 죽도시장은 신선한 해산물과 지역 먹거리를 즐길 수 있는 명소입니다.',
            image: 'picture/pohang.jpg',
            alt: '포항 이미지'
        },
        'mungyeong': {
            title: '문경',
            description: '문경은 깊은 산세와 아름다운 자연경관으로 유명한 경북 내륙의 대표 관광도시입니다 문경새재는 옛길을 따라 걷는 트레킹 코스로 유명하며 주변의 전통 한옥 체험 마을과 도자기 체험 공간 철로 자전거 문명온천 등 관광 자원이 풍부해 가족 단위 여행객에게 안성맞춤인 지역입니다.',
            image: 'picture/mungyeong.jpg',
            alt: '문경 이미지'
        },
        //경남
        'jinhae': {
            title: '진해',
            description: ' 진해는 봄이 되면 진해 전역이 벚꽃으로 가득 차 아름다운 경관을 자랑하며 해군기자와 해군사관 학교가 위치해 있어 해군의 역사와 문화를 함께 느낄 수 있는 도시입니다 바다와 산이 어루어진 자연경관도 뛰어나고 군항제 기간에는 다양한 문화행사와 퍼레이드도 열려 가족 단위 관광객에게 인기가 많습니다.',
            image: 'picture/jinhae.jpg',
            alt: '경주 이미지'
        },
        'geoje island': {
            title: '거제도',
            description: '거제도는 경상남도에서 가장 큰 섬으로 깨끗한 해변과 푸른 바다 아름다운 산세가 어우러진 자연 휴양지입니다 인근에는 아름다운 해양 식물원으로 유명하며 관광객들이 많이 찾는 명소입니다',
            image: 'picture/geoje island.jpg',
            alt: '거제도 이미지'
        },
        'tongyeong': {
            title: '통영',
            description: '통영은 다도해의 아름다운 섬과 해안선을 자랑하며 신선한 해산물 요리가 유명합니다 통영국제음악제 같은 행사가 열리고 동피랑 벽화마을 같은 예술적 명소도 있어 관광객들에게 인기가 많습니다 역사적으로는 해군기지가 있었던 곳입니다.',
            image: 'picture/tongyeong.jpg',
            alt: '통영 이미지'
        },
        'changwon': {
            title: '창원',
            description: '창원은 산업도시로서 기계 자동차 조선 등 다양한 제조업이 발달해 있으며 산과 바다가 가까워 자연과 도시가 조화를 이루고 있고 창원시립마산박물관, 마산가고파국화축제 등 다양한 문화행사와 관광 명소가 있습니다.',
            image: 'picture/changwon.jpg',
            alt: '창원 이미지'
        },
        //전북
        'jeonju': {
            title: '전주',
            description: '전주는 전통 한옥이 밀집해 있어 한국의 전통 가옥 음식 복식을 체험할 수 있는 명소입니다 비빔밥의 본고장으로 유명하며 한지,전통술,판소리 등 다양한 전통문화 콘텐츠를 체험할 수 있어 외국인 관광객들에게도 인기가 많습니다.',
            image: 'picture/jeonju.jpg',
            alt: '전주 이미지'
        },
        'gunsan': {
            title: '군산',
            description: '군산은 서해안에 위치한 항구 도시로 일제강점기의 건축물과 역사가 고스란히 남아있는 도시입니다 근대문화유산이 잘 보존된 도시로 옛 철길 일본식 건물 동국사 히로쓰 가옥 등 역사적 건축물이 관광지로 개발되어 있습니다 군산은 또한 신선한 해산물과 군산 짬뽕 이성당 빵집 같은 먹거리로도 유명하며 고군산군도 섬 여행도 인기입니다.',
            image: 'picture/gunsan.jpg',
            alt: '군산 이미지'
        },
        'iksan': {
            title: '익산',
            description: '익산은 예부터 백제의 주요 도시였으며 유네스코 세계문화유산인 미륵사지와 왕궁리 유적을 중심으로 고대 백제 문화를 느낄 수 있는 도시입니다 미륵사지 석탑은 한국 석탑 가운데 가장 오래되고 큰 석탑으로 유명하며 주변에는 미륵사지 유물전시관도 잘 갖추어져 있습니다 매년 열리는 익산 보석대축제도 많은 사람들의 관심을 끕니다.',
            image: 'picture/iksan.jpg',
            alt: '익산 이미지'
        },
        'muju': {
            title: '무주',
            description: '무주는 자연 관광과 겨울 레저의 중심으로 무주덕유산리조트는 겨울에는 스키장 여름에는 휴양지로 각광 받으며 덕유산의 수려한 자연 경관은 등산객에게도 인기가 많습니다 설천봉에서도 향적봉에까지 이어지는 능선 트레킹 코스는 눈꽃 산행지로도 유명합니다.',
            image: 'picture/muju.jpg',
            alt: '무주 이미지'
        },
        //전남
        'suncheon': {
            title: '순천',
            description: '순천은 생태 관광의 중심지로 자연환경과 도시가 조화를 대표적인 친환경 도시입니다 순천만 습지와 순천만 국가정원이 유명하며 다양한 테마 정원과 문화시설이 어루어진 도심 속 쉼터입니다.',
            image: 'picture/suncheon.jpg',
            alt: '순천 이미지'
        },
        'yeosu': {
            title: '여수',
            description: '여수는 전라남도 남해안에 위치한 아름다운 바다와 야경으로 유명한 항구 도시입니다 특히 여수밤바다는 아름다운 야경과 해양 문화 축제로 많은 관광객을 끌어모으는 명소로 낭만적인 분위기를 느낄 수 있습니다.',
            image: 'picture/yeosu.jpg',
            alt: '여수 이미지'
        },
        'mokpo': {
            title: '목포',
            description: '목포는 전라남도 서남부에 위치한 항구 도시로 맛있는 해산물이 유명한데 세발낙지 홍어삼합 민어 요리 등 지역 특색 있는 해산물 음식이 많습니다 유달산, 갓바위, 목포해상케이블카 등의 자연 명소도 함께 즐길 수 있습니다.',
            image: 'picture/mokpo.jpg',
            alt: '목포 이미지'
        },
        'wando': {
            title: '완도',
            description: '완도는 전라남도 남쪽 끝에 위치한 청정 해양 관광지이자 해조류의 고장입니다 청보리밭길과 돌담길 등 걷기 좋은 트레킹 코스가 많습니다 완도는 전복, 다시마, 미역 등 해조류 양식이 활발한 지역으로 깨끗한 바다에서 나오는 해산물과 건강식품으로도 널리 알려져 있습니다.',
            image: 'picture/wando.jpg',
            alt: '완도 이미지'
        },
        //경기도
        'suwon': {
            title: '수원',
            description: '수원은 유네스코세계문화유산인 웅장하고 아름다운 수원화성을 중심으로 역사적인 매력이 가득한 도시입니다. 활기 넘치는 팔달문 시장에서 다양한 먹거리와 볼거리를 즐길 수 있고, 현대적인 쇼핑몰과 편리한 교통까지 갖춰져 있는 것이 큰 매력입니다.',
            image: 'picture/suwon.jpg',
            alt: '수원 이미지'
        },
        'gapyeong': {
            title: '가평',
            description: '가평은 맑은 자연과 레저 활동으로 유명한 관광지입니다. 남이섬, 아침고요수목원, 쁘띠프랑스 등 낭만적인 명소와 계곡, 래프팅 등 야외 활동이 풍부합니다.',
            image: 'picture/gapyeong.jpg',
            alt: '가평 이미지'
        },
        'paju': {
            title: '파주',
            description: '파주는 출판단지와 헤이리 예술마을로 문화적 매력을 뽐내는 도시입니다. 임진각과 DMZ 투어로 역사적 의미를 느낄 수 있으며, 프로방스 마을과 같은 이색적인 명소도 인기입니다.',
            image: 'picture/paju.jpg',
            alt: '파주 이미지'
        },
        'yangpyeong': {
            title: '양평',
            description: '양평은 서울 근교의 자연 친화적 휴양지로, 두물머리와 세미원, 용문사 등 아름다운 자연과 전통이 어우러진 명소가 많습니다. 자전거 길과 지역 특산물도 관광객을 끌어모읍니다.',
            image: 'picture/yangpyeong.jpg',
            alt: '양평 이미지'
        },
        //강원도
        'gangneung': {
            title: '강릉',
            description: '강릉은 푸른 등해 바다와 울창한 산을 동시에 만끽할 수 있는 아름다운 도시 입니다. 역사, 문화, 자연을 아우르는 다양한 볼거리가 있고, 안목해변 거리에서 특별한 분위기가 매력적입니다.',
            image: 'picture/gangneung.jpg',
            alt: '강릉 이미지'
        },
        'sokcho': {
            title: '속초',
            description: '속초는 설악산 국립공원과 동해 바다를 품은 자연 관광지입니다. 속초 중앙시장의 먹거리와 대포항의 신선한 해산물, 설악산 케이블카로 유명하며, 자연과 미식이 조화를 이룹니다.',
            image: 'picture/sokcho.jpg',
            alt: '속초 이미지'
        },
        'pyeongchang': {
            title: '평창',
            description: '평창은 2018 동계올림픽 개최지로, 알펜시아와 용평리조트 등 겨울 스포츠 명소가 많습니다. 대관령 양떼목장과 한옥마을, 맑은 자연 환경으로 사계절 관광지로 사랑받습니다.',
            image: 'picture/pyeongchang.jpg',
            alt: '평창 이미지'
        },
        'chuncheon': {
            title: '춘천',
            description: '춘천은 남이섬과 소양강, 춘천호를 중심으로 한 낭만적인 호수 도시입니다. 닭갈비와 막국수로 유명하며, 레일바이크와 같은 레저 활동으로 가족 단위 관광객에게 인기입니다.',
            image: 'picture/chuncheon.jpg',
            alt: '춘천 이미지'
        },
        //충남
        'hongseong': {
            title: '홍성',
            description: '싱싱한 해산물과 맛있는 먹거리가 가득해서 입이 즐겁고 바다와 아름다운 풍경을 보며 기분 전환하기 좋은 장소입니다.',
            image: 'picture/hongseong.jpg',
            alt: '홍성 이미지'
        },
        'dangjin': {
            title: '당진',
            description: '당진은 서해안의 청정 바다와 역사 유적이 매력적인 도시입니다. 솔뫼성지, 면천읍성, 삽교호 관광지와 함께 두견주, 백련막걸리 등 지역 특산주를 체험할 수 있습니다. 안섬포구와 왜목마을의 일출, 일몰도 놓칠 수 없습니다.',
            image: 'picture/dangjin.jpg',
            alt: '당진 이미지'
        },
        'cheonan': {
            title: '천안',
            description: '천안은 교통의 요지로, 독립기념관과 외암민속마을이 대표적인 관광지입니다. 흥타령쌀과 같은 지역 특산물, 천안빵소의 먹거리, 지중해마을의 이국적인 분위기로 다양한 매력을 제공합니다.',
            image: 'picture/cheonan.jpg',
            alt: '천안 이미지'
        },
        'daejeon': {
            title: '대전',
            description: '대전은 과학의 도시로, 국립중앙과학관, 한밭수목원, 대전시민천문대가 유명합니다. 유성온천과 대청호반길은 힐링 명소로, 칼국수와 성심당 튀김 소보로 등 지역 별미도 큰 매력입니다.',
            image: 'picture/daejeon.jpg',
            alt: '대전 이미지'
        },
        //충북
        'jecheon': {
            title: '제천',
            description: '제천은 푸른 청풍호와 수려한 월악산이 어우러진 아름다운 지역을 만끽 할 수 있는 곳 입니다. 의림지와 같은 역사적인 명소에서 여유를 즐길 수 도 있으며, 약초 시장 등 특색 있는 볼거리도 풍부합니다. 자연과 문화를 동시에 즐길 수 있는 것이 큰 매력입니다.',
            image: 'picture/jecheon.jpg',
            alt: '제천 이미지'
        },
        'danyang': {
            title: '단양',
            description: '단양은 남한강과 소백산이 어우러진 자연 관광지로, 단양팔경과 도담삼봉이 대표적입니다. 만천하스카이워크와 고수동굴은 모험과 탐험을 즐기는 관광객에게 큰 매력을 제공합니다.',
            image: 'picture/danyang.jpg',
            alt: '단양 이미지'
        },
        'boeun': {
            title: '보은',
            description: '보은은 속리산 국립공원과 법주사를 중심으로 한 자연과 불교 문화의 도시입니다. 삼년산성과 정이품송 등 역사 유적과 함께, 대추와 같은 지역 특산물로도 잘 알려져 있습니다.',
            image: 'picture/boeun.jpg',
            alt: '보은 이미지'
        },
        'chungju': {
            title: '충주',
            description: '충주는 충주호와 탄금대가 있는 호수의 도시로, 수상 스포츠와 레저 활동이 활발합니다. 중원탑평리칠층석탑과 지역 특산물인 사과, 고구마로 유명하며, 자연과 역사를 함께 즐길 수 있습니다.',
            image: 'picture/chungju.jpg',
            alt: '충주 이미지'
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