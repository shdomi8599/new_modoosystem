export const PRODUCTS = [
  [
    {
      name: "차량 차단기 (MDS - 100)",
      outline:
        "차량차단기는 출입통제를 위한 목적으로 진입로에 설치되며, 주차권 발행기 및 요금계산기등과 함께 연동시켜 설치 할 수 있습니다. 바(BAR)는 직선(원형/사각) 또는 굴절형이 있으며, 차량 차단기는 정전시 수동으로 OPEN/CLOSE가 가능합니다.",
      characteristic: [
        "주차권발행기 및 요금계산기와 연동 가능",
        "정기권카드리더기 및 차량번호인식기와 연동 가능",
        "차량 충돌 위험 시 리바운딩 기능 보유 [Loop Coil 연동 시]",
        "차량 연속 진입 시 Counter 기능 보유",
        "단일 차로의 양방향 통행 시 방향 판별 구성 가능 [차량 검지기와 연동 시]",
        "차단봉의 구간 속도 조절에 의한 다이나믹 밸런스 유지",
        "차단봉에 고휘도 적색 반사지를 부착하여 시인 성 확보",
        "차단봉의 좌,우측에 고휘도 LED 조명을 내장 및 점멸기능 보유 [Option]",
      ],
      specification: [
        { name: "입력 전원", content: "AC 220V / 60Hz" },
        { name: "사용 전력", content: "DC 24V" },
        { name: "사용 온도", content: "-20℃ ~ 60℃" },
        { name: "동작 속도", content: "1~3초 이내 (90˚ 개방시간)" },
        { name: "외함 재질", content: "스틸(Steel1.6T), 분체도장" },
        { name: "외함 규격", content: "275(d) * 320(w) * 1005(h)" },
        { name: "차단바(BAR) 재질", content: "알루미늄" },
        {
          name: "차단바(BAR) 규격",
          content: "길이 3M-4M (적색 반사시트지 부착)",
        },
        { name: "외함 무게", content: "45Kg 내외 (차단바 제외)" },
        {
          name: "옵션 사항",
          content: "굴절타입(접이식차단바), LED램프 적용 차단바 외",
        },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%B0%A8%EB%9F%89%EC%B0%A8%EB%8B%A8%EA%B8%B0.png?alt=media&token=d0d7664f-a3a5-4c66-ba0a-38f7c384c689&_gl=1*1wqbj5q*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODUzNDIuMC4wLjA.",
    },
  ],
  [
    {
      name: "리모콘 시스템 (MDS - 400)",
      outline:
        "리모콘을 소지한 정기권 차량이 인식 범위내에서 송신기의 버튼을 누르면 리모콘 수신기에서 데이터를 받아 차단기를 열리게 하는 방식으로 외부차량의 통제가 가능하며, 무인주차관리가 가능한 시스템 입니다.",
      characteristic: [
        "인식거리가 길고 설치비용이 저렴",
        "리모콘 수신기에 입력이 되지 않으면 사용불가",
        "두개의 출력으로 차량 차단기의 Open / Close 가능",
        "동일한 ID를 부여하는 방식으로 위조가 불가능",
        "루프코일과 연동시 무인관리 가능",
        "무단 출입을 통제하여 보안 및 주차난 해소에 적합",
      ],
      specification: [
        { name: "사용 전원", content: "DC12V / AC220V / 60Hz" },
        { name: "변조 방식", content: "AM 변조 방식" },
        { name: "통신 방식", content: "RS 232C (옵션사항)" },
        { name: "사용 온도", content: "-10~60℃" },
        { name: "사용 주파수", content: "295MHz" },
        { name: "인식 거리", content: "10M내외" },
        {
          name: "센서",
          content: "입력 또는 HOST 명령 (콘트롤러 장착시 사용)",
        },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EB%A6%AC%EB%AA%A8%EC%BD%98%20%EC%8B%9C%EC%8A%A4%ED%85%9C.jfif?alt=media&token=8806a0ee-76ff-40b2-b230-83620d9a1093&_gl=1*1a4upax*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODU0MzAuMC4wLjA.",
    },
  ],
  [
    {
      name: "LONG RANGE RF - READER (MDS - 901)",
      outline:
        "차량에 부착된 RF TAG와 한조가 되어 작동되는 설비로 차량 내부에 부착된 카드가 RF READER 영역에 진입하면 자동으로 차단기를 OPEN하여 주는 방식입니다. 본 제품은 이동체에 대하여 인식이 가능하며, TAG는 외부전원이 필요하지 않음으로 반영구적 사용이 가능합니다.",
      characteristic: [
        "주차장을 출입 하려는 정기권 용도로 사용",
        "관리용 콘트롤로를 이용하여 등록 여부를 판별",
        "핸드터미널(태블릿) 이용하여 카드 등록 삭제 가능",
        "정기권 관리 컴퓨터와 연동하여 사용 가능",
      ],
      specification: [
        { name: "사용 주파수", content: "917.3 ~ 920.3 Mhz" },
        { name: "송신 출력", content: "1 Watt (+30dBM)안테나 입력단 기준" },
        { name: "채널 간격", content: "600Khz" },
        { name: "채널 대역폭", content: "200Khz" },
        { name: "통신 속도", content: "40Kbps" },
        { name: "변조 방식", content: "DSB-ASK" },
        {
          name: "송신 스팩트럼 마스크",
          content: "ISO-18000-6 Air Interface 준수",
        },
        { name: "수신 범위", content: "-25dBm ~ 70dBm" },
        { name: "주파수정확도", content: "10PPM" },
        { name: "인식거리", content: "0-7m (Tag Dependent)" },
        { name: "전원", content: "24V DC/24W" },
        { name: "동작온도", content: "-10℃~+60℃" },
        { name: "크기", content: "250*250*50mm" },
        { name: "중량", content: "2.5kg" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2FLONG%20RANGE%20RF%20-%20READER.gif?alt=media&token=7f6a677f-7fe4-4043-934a-e199ed691d15&_gl=1*1km32ng*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODU1MTIuMC4wLjA.",
    },
    {
      name: "SHORT RANGE RF - READER (MDS-902)",
      outline:
        "근접식 RF CARD READER는 정기권 차량만 통과시키는 기기로, 불필요한 외부차량의 출입을 통제함으로 협소한 주차장의 이용을 극대화 시킬 수 있습니다. 안테나와 READER MODULE이 일체형으로 제작되어 불안정한 READER RANGE의 단점을 보완한 제품입니다.",
      characteristic: [
        "주차장을 출입 하려는 정기권 용도로 사용",
        "정기권 관리 컴퓨터와 연동하여 사용 가능",
        "차량에 부착된 RF 리더기와 한조가 되어 작동하는 설비",
        "차량의 앞유리 부분에 부착된 카드가 입.출구에 설치된 Reader의 검지영역게 진입하면 즉시 작동",
      ],
      specification: [
        { name: "주파수", content: "915 ~ 923.5MHz" },
        { name: "안테나 형태", content: "Micro Patch Array(내장형)" },
        { name: "안테나 Gain", content: "+4.5dBi" },
        { name: "안테나 3dB Beam", content: "20°(E-plane)" },
        { name: "동작 방식", content: "Freequency Hopping Spread Spectrum" },
        { name: "주파수 채널", content: "16CH" },
        { name: "출력", content: "30dBm이하(1Watt)" },
        {
          name: "네트워크 통신포트",
          content: "Serial I/O(9.6Kbps - 115.2Kbps)",
        },
        {
          name: "네트워크 인터페이스",
          content: "기본(RS-232C,RS-485) / Optional(TCP/IP)",
        },
        { name: "전원", content: "24V DC /24W" },
        { name: "동작온도", content: "-30℃ ̴ 70℃" },
        { name: "크기", content: "235×255×55mm" },
        { name: "중량", content: "1Kg" },
        { name: "인식거리", content: "0 - 6m(Tag Dependent)" },
        { name: "내장 컨트롤러", content: "접점 출력 기능, 이중 입출차 방지" },
        { name: "내장메모리", content: "Tag 데이터 약 11,000건 저장" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2FSHORT%20RANGE%20RF%20-%20READER.PNG?alt=media&token=b140740e-4588-47c6-a6de-d826d73d72e2&_gl=1*f28d3y*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODU2MjIuMC4wLjA.",
    },
  ],
  [
    {
      name: "주차권 발행기 (MDS-202)",
      outline:
        "주차권 발행기는 차량 진입을 자동 감지하여 주차권을 발행하며, 주차권 용지에 입차시간과 해당 바코드를 프린트 하는 기기입니다. 차량입차시 발행기 전면에 매설된 LOOP COIL을 밟으면 음성안내 멘트가 나오며, 주차권을 뽑으면 자동으로 차량차단기가 OPEN됩니다.",
      characteristic: [
        "주차관리에 따른 기본 문구 인쇄가능",
        "1초 이내의 빠른 발행 속도",
        "핸드형 스캐너를 이용한 편리한 요금정산",
        "자체적으로 에러 진단 기능을 보유",
        "출력접점을 이용하여 주차권 발행시 차단기 자동 Open",
        "정기권 차량 진입시 해당 차량 발행정지(RF, LPR 연동)",
      ],
      specification: [
        { name: "공급 전원", content: "AC 220V(50~60Hz)" },
        { name: "사용 전력", content: "30W ~ 50W" },
        { name: "외형 치수", content: "500(L) x 350(W) x 1250(H)" },
        { name: "인쇄 속도", content: "8Cm /Sec" },
        { name: "인자 방식", content: "Thermal" },
        { name: "용지 크기", content: "57mm" },
        { name: "통신 방식", content: "Serial (RS-232C 또는 RS-422)" },
        { name: "사용 환경", content: "온도 -30 ~ 50℃, 습도 10 ~ 85%" },
        { name: "헤드 수명", content: "50Km (Full Dots 인쇄시)" },
        { name: "커터 수명", content: "1,500,000회" },
        { name: "동작 방식", content: "자동 / 수동" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%A3%BC%EC%B0%A8%EA%B6%8C%20%EB%B0%9C%ED%96%89%EA%B8%B0.jfif?alt=media&token=bf34551f-d748-4119-8a30-0050af7a5365&_gl=1*1hovyfb*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODU3MTQuMC4wLjA.",
    },
  ],
  [
    {
      name: "차량 번호 인식기 (MDS-300)",
      outline:
        "첨단 영상기술을 이용하여 차량의 번호 영상을 데이터화 하고 차량의 입차시와 출차시의 번호영상 데이터를 비교하여 모든 차량의 입,출차 영상, 시간등의 관련 데이터 조회가 가능하므로 증거 자료로 활용할 수 있으며, 특히 지정 차량만의 출입을 원할 경우 미리 차량 번호를 등록하여 등록된 차량 이외에는 자동으로 출입을 통제함으로써 보안을 포함한 다각적 기능을 갖춘 시스템입니다.",
      characteristic: [
        "실시간 모니터링 가능",
        "차량번호를 이용한 정기차량 관리",
        "RF시스템과 연동하여 사용가능",
        "이미지 정보 저장 및 검색가능",
        "번호판 변경시 호환유지",
      ],
      specification: [
        { name: "사용 전원", content: "AC 220V" },
        { name: "사용 온도", content: "-30 ~ +60°C" },
        { name: "인식률", content: "98%이상" },
        { name: "인식속도", content: "0.02초" },
        {
          name: "조명",
          content:
            "IR LED 조명 사용으로 운전자에 눈부심이 없고 수명이 반영구적",
        },
        { name: "외형 치수", content: "370(W) x 1490(H) x 430(D)" },
        { name: "외함 재질", content: "Steel 1.6T, 분체도장" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%B0%A8%EB%9F%89%20%EB%B2%88%ED%98%B8%20%EC%9D%B8%EC%8B%9D%EA%B8%B0.jfif?alt=media&token=cdebdb4d-6cbd-4509-bb6a-12b0efba583f&_gl=1*1czxj9w*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODU4NjEuMC4wLjA.",
    },
  ],

  [
    {
      name: "요금계산기 (MDS-502)",
      outline:
        "요금계산기는 입차시 발급받은 주차권을 제시하면 주차요금을 신속하게 자동으로 계산하는 기기입니다. 주차권 발행기/RF 시스템/차량차단기등 각종 주변기기와 연동이 자유로우며, 자체적으로 DATA BASE를 보유 할 수 있습니다.",
      characteristic: [
        "시간할인 / 금액할인 / %할인등 현장별 할인기능 등록 가능",
        "정기권 차량의 등록 및 삭제, 입출차 내역 관리가능",
        "각종 정산보고서 출력 가능",
        "심야 요금체계 설정 가능",
        "중앙 HOST 컴퓨터와 ON-LINE통신 가능",
        "차단기와 연동하여 주차권, 영수증 프린트 완료 시 자동 Open",
      ],
      specification: [
        { name: "전원", content: "AC 220V, 50~60Hz" },
        { name: "소비 전력", content: "20W ~ 55W(최대)" },
        { name: "사용 환경", content: "온도 0 ~ 45℃, 습도 90%이하" },
        { name: "프린터", content: "도트 또는 써멀" },
        { name: "정전 보상", content: "60일" },
        { name: "구성", content: "PC, 스캐너, 프린터, 주차권 리더기, 돈통" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%9A%94%EA%B8%88%EA%B3%84%EC%82%B0%EA%B8%B0.jfif?alt=media&token=f10c14e7-0ffd-46bf-9f7f-002acd203203&_gl=1*ky6ocu*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODYwODcuMC4wLjA.",
    },
  ],
  [
    {
      name: "입차경광등 (MDS-601)",
      outline:
        "주차장내로 차량이 진입하면 장내에 있는 차량 및 사람의 안전을 위하여 설치하는 신호장치입니다. 차량검지기에 의해 자동으로 경보음 및 경보신호를 경광등에 전달하여 사고방지 및 원활한 차량소통을 도와 줍니다.",
      specification: [
        { name: "전원", content: "AC 220V, 60Hz" },
        { name: "소비 전력", content: "작동시 40W" },
        { name: "내장품", content: "회전 신호용 전구, Buzzer" },
        { name: "경보 타이머", content: "1 ~ 60sec(검지기 출력 조정)" },
        { name: "외형 재질", content: "Stainless Steel 1.0T" },
        { name: "설치 유형", content: "천정형, 벽부형, 자립형 (별도 주문)" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%9E%85%EC%B0%A8%EA%B2%BD%EA%B4%91%EB%93%B1.jpg?alt=media&token=7304c521-190d-41eb-b826-0c4a8afa1cd0&_gl=1*1ox63u7*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODYyNDcuMC4wLjA.",
    },
    {
      name: "출차주의등 (MDS-602)",
      outline:
        "주차장 내에서 차량이 외부로 나올때 지상부분의 차량과 보행자에게 경보음 및 경보신호를 알려주어 사고방지 및 차량의 원활한 소통을 도와주는 신호장치입니다. 차량검지기에 의하여 자동으로 경보음과 경보신호를 알려주어 주차요원이 없어도 관리 가능합니다.",
      specification: [
        { name: "전원", content: "AC 220V, 60Hz" },
        { name: "소비 전력", content: "작동시 120W" },
        { name: "내장품", content: "백열전구 2개, Buzzer" },
        { name: "경보 타이머", content: "1 ~ 60sec(검지기 출력 조정)" },
        { name: "외형 재질", content: "Stainless Steel 1.2T" },
        { name: "설치 유형", content: "자립형, 벽부형" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%B6%9C%EC%B0%A8%EC%A3%BC%EC%9D%98%EB%93%B1.jfif?alt=media&token=1c122057-37bb-43fd-a63e-eb1cd248636a&_gl=1*1kpc28l*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODYyNzguMC4wLjA.",
    },
    {
      name: "차량검지기 (MDS-603)",
      outline:
        "차량이 주차장내에 진입하면 바닥에 매설된 LOOP COIL의 신호를 감지하여 연결된 주변장치들과 연동시키는 기기입니다. LOOP COIL과 1대1로 감지 할 수 있는 1회로 검지기와 사용자의 필요에 따라 별도의 검지부 구성 또는, 방향판별을 감지하는 2회로 검지기로 구분됩니다.",
      specification: [
        { name: "전원", content: "AC 220V, 50~60Hz" },
        { name: "소비 전력", content: "상시 2W, 작동시 25W" },
        { name: "사용 환경", content: "온도 -20℃ ~ +50℃, 습도 30% ~ 85%" },
        { name: "외함 재질", content: "ABS / Steel" },
        { name: "설치 유형", content: "매립형 / 노출형" },
        {
          name: "감지 방식",
          content: "차량이 통과하면 Loop Coil이 변조시키는 주파수에 의해 감지",
        },
        {
          name: "감지 능력",
          content: "경자동차 이상 감지, 현장여건에 따라 감도조정 가능",
        },
        { name: "감도 조정", content: "고감도에서 저감도까지 10단계로 구성" },
        { name: "타이머", content: "1 ~ 60초 임의로 조정 가능" },
        { name: "리셋 기능", content: "오동작 발생시 Auto Reset" },
        {
          name: "방향판별 기능",
          content: "차량이 진입하는 방향을 알 수 있는 기능",
        },
        {
          name: "릴레이 기능",
          content: "Loop Coil통과 후 2초뒤 신호를 보내는 기능",
        },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%B0%A8%EB%9F%89%EA%B2%80%EC%A7%80%EA%B8%B0.jpg?alt=media&token=240f9996-c8cc-4053-ac7d-d507d6c556d0&_gl=1*10h602h*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODYzMTIuMC4wLjA.",
    },
    {
      name: "차량유도등 (MDS-604)",
      outline:
        "주차장 내부의 입구 또는 출구에 주차유도 안내표시를 하여 안전운행과 원활한 차량 소통을 도와주는 안내 신호장치입니다. 운전자의 주차편의 및 충돌사고를 미연에 방지 할 수 있습니다.",
      specification: [
        { name: "전원", content: "AC 220V, 60Hz" },
        { name: "소비 전력", content: "상시 32W" },
        { name: "구조", content: "단면, 양면 표지형" },
        { name: "표시부", content: "전면판 청색바탕, 백색글씨" },
        { name: "외형 재질", content: "AL 1.0T" },
        { name: "설치 유형", content: "천정형" },
        { name: "설치 높이", content: "천정고 2~300mm이상" },
      ],
      src: "https://firebasestorage.googleapis.com/v0/b/modoosystem-af119.appspot.com/o/products%2F%EC%B0%A8%EB%9F%89%EC%9C%A0%EB%8F%84%EB%93%B1.PNG?alt=media&token=e210e2f7-7822-47cb-b20a-cf3a1c4ceecc&_gl=1*1yb3xg7*_ga*MTcwNjMwNjA1Ny4xNjg1MzcwOTMz*_ga_CW55HF8NVT*MTY4NjU4NDM2Ni41MC4xLjE2ODY1ODY0MjkuMC4wLjA.",
    },
  ],
];
