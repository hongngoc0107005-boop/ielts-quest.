
const IELTS_DATA = {
  roadmap: [
    ["A1 Nền tảng","Chào hỏi, số đếm, gia đình, hiện tại đơn",12],
    ["A2 Giao tiếp","Mua sắm, du lịch, sức khỏe, quá khứ đơn",18],
    ["B1 Độc lập","Công việc, học tập, trải nghiệm, viết đoạn",22],
    ["B2 Tự tin","Tranh luận, tin tức, bài luận học thuật",26],
    ["C1 Nâng cao","Tư duy phản biện, từ học thuật, nói dài",30],
    ["IELTS 4.0","Làm quen 4 kỹ năng và dạng đề",20],
    ["IELTS 5.0","Tăng độ chính xác và vốn từ",24],
    ["IELTS 6.0","Chiến thuật làm bài theo dạng",28],
    ["IELTS 6.5","Phát triển ý và kiểm soát thời gian",32],
    ["IELTS 7.0","Từ vựng học thuật và lập luận",36],
    ["IELTS 7.5","Tối ưu độ tự nhiên và chính xác",40],
    ["IELTS 8.0","Luyện đề nâng cao và sửa lỗi sâu",48]
  ],
  topics: {
    "Daily Routine":[
      {w:"wake up",p:"/weɪk ʌp/",m:"thức dậy",e:"I wake up at 6 a.m. every day.",l:"A1"},
      {w:"brush",p:"/brʌʃ/",m:"chải, đánh",e:"She brushes her teeth after breakfast.",l:"A1"},
      {w:"commute",p:"/kəˈmjuːt/",m:"đi lại giữa nhà và nơi làm việc",e:"My commute takes about thirty minutes.",l:"B1"},
      {w:"schedule",p:"/ˈskedʒuːl/",m:"lịch trình",e:"I check my schedule every morning.",l:"A2"},
      {w:"productive",p:"/prəˈdʌktɪv/",m:"năng suất",e:"I am most productive in the morning.",l:"B1"}
    ],
    "Education":[
      {w:"assignment",p:"/əˈsaɪnmənt/",m:"bài tập được giao",e:"The assignment is due on Friday.",l:"A2"},
      {w:"research",p:"/rɪˈsɜːtʃ/",m:"nghiên cứu",e:"Students conduct research for the project.",l:"B1"},
      {w:"curriculum",p:"/kəˈrɪkjələm/",m:"chương trình học",e:"The curriculum includes four language skills.",l:"B2"},
      {w:"scholarship",p:"/ˈskɒləʃɪp/",m:"học bổng",e:"She applied for a scholarship.",l:"B1"},
      {w:"assessment",p:"/əˈsesmənt/",m:"sự đánh giá",e:"The course uses continuous assessment.",l:"B2"}
    ],
    "Travel":[
      {w:"destination",p:"/ˌdestɪˈneɪʃn/",m:"điểm đến",e:"Da Nang is a popular destination.",l:"A2"},
      {w:"itinerary",p:"/aɪˈtɪnərəri/",m:"lịch trình chuyến đi",e:"Our itinerary includes three cities.",l:"B2"},
      {w:"accommodation",p:"/əˌkɒməˈdeɪʃn/",m:"chỗ ở",e:"We booked affordable accommodation.",l:"B1"},
      {w:"departure",p:"/dɪˈpɑːtʃə/",m:"sự khởi hành",e:"The departure time is 8:30.",l:"A2"},
      {w:"sightseeing",p:"/ˈsaɪtsiːɪŋ/",m:"tham quan",e:"We spent the afternoon sightseeing.",l:"A2"}
    ]
  },
  skills: [
    {id:"listening",icon:"🎧",title:"Nghe",desc:"Nghe đoạn hội thoại ngắn và trả lời câu hỏi.",level:"A1–B1"},
    {id:"speaking",icon:"🎤",title:"Nói",desc:"Nói theo câu mẫu và tự ghi âm bằng thiết bị.",level:"A1–IELTS"},
    {id:"reading",icon:"📖",title:"Đọc",desc:"Đọc đoạn văn thật và tìm ý chính.",level:"A1–B2"},
    {id:"writing",icon:"✍️",title:"Viết",desc:"Viết câu, đoạn và bài luận theo hướng dẫn.",level:"A1–IELTS"}
  ],
  lessons: {
    listening:{
      title:"Listening: At a coffee shop",
      html:`<div class="lesson-block"><p><strong>Đoạn nghe mô phỏng:</strong></p><p>“Hi, can I have a small iced coffee, please?” — “Of course. Would you like milk or sugar?” — “Just a little milk, please.”</p><button id="playListening" class="secondary" type="button">🔊 Phát đoạn nghe</button></div><div class="lesson-block"><p><strong>Câu hỏi:</strong> What does the customer order?</p><p>A small iced coffee with a little milk.</p></div>`
    },
    speaking:{
      title:"Speaking: Introduce yourself",
      html:`<div class="lesson-block"><p><strong>Mẫu nói:</strong> My name is ____. I am from ____. I study/work at ____. In my free time, I like ____.</p></div><div class="lesson-block practice-box"><label for="speakText"><strong>Viết câu bạn sẽ nói:</strong></label><textarea id="speakText" placeholder="My name is..."></textarea><button id="readSpeaking" class="secondary" type="button">🔊 Nghe câu mẫu của bạn</button></div>`
    },
    reading:{
      title:"Reading: A productive morning",
      html:`<div class="lesson-block"><p>Lan starts her day at 6 a.m. She drinks water, reviews ten English words, and writes a short plan. She says this routine helps her feel calm and productive before class.</p></div><div class="lesson-block"><p><strong>Ý chính:</strong> Lan uses a simple morning routine to prepare for her day.</p><p><strong>Từ mới:</strong> review, routine, productive.</p></div>`
    },
    writing:{
      title:"Writing: Daily routine paragraph",
      html:`<div class="lesson-block"><p><strong>Cấu trúc:</strong> Topic sentence → 3 activities → concluding sentence.</p><p><strong>Mẫu:</strong> My morning routine is simple but useful. First, I... Then, I... Finally, I...</p></div><div class="lesson-block practice-box"><textarea id="writingText" placeholder="Viết đoạn 60–80 từ..."></textarea><p id="wordCounter">0 từ</p></div>`
    },
    todayLesson:{
      title:"Bài học hôm nay: Daily Routine",
      html:`<div class="lesson-block"><h3>1. Từ vựng</h3><p>wake up, brush, schedule, commute, productive</p></div><div class="lesson-block"><h3>2. Ngữ pháp</h3><p><strong>Hiện tại đơn:</strong> I study English every day. / She studies English every day.</p></div><div class="lesson-block"><h3>3. Nói</h3><p>Nói 5 câu mô tả buổi sáng của bạn.</p></div><div class="lesson-block"><h3>4. Viết</h3><p>Viết một đoạn 60–80 từ về thói quen hằng ngày.</p></div>`
    }
  },
  quiz: [
    {q:"I ___ English every evening.",o:["study","studies","studied","studying"],a:0},
    {q:"She ___ her teeth after breakfast.",o:["brush","brushes","brushing","brushed"],a:1},
    {q:"“Schedule” nghĩa là gì?",o:["Điểm đến","Lịch trình","Học bổng","Chỗ ở"],a:1},
    {q:"Which sentence is correct?",o:["He go to school.","He goes to school.","He going to school.","He gone to school."],a:1},
    {q:"“Productive” gần nghĩa nhất với:",o:["Năng suất","Mệt mỏi","Đắt tiền","Nguy hiểm"],a:0},
    {q:"I wake up ___ 6 a.m.",o:["in","on","at","from"],a:2},
    {q:"A person who travels to work daily has a ___.",o:["commute","dessert","lecture","passport"],a:0},
    {q:"Choose the correct negative form.",o:["I not study.","I don't study.","I doesn't study.","I no study."],a:1},
    {q:"What comes first in a paragraph?",o:["Topic sentence","Last example","Title only","Translation"],a:0},
    {q:"“Routine” means:",o:["Thói quen thường ngày","Kỳ thi","Lời mời","Thời tiết"],a:0}
  ]
};
