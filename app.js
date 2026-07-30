
const $ = s => document.querySelector(s);
const state = JSON.parse(localStorage.getItem("iq_state") || '{"completed":[],"wordsSeen":0,"bestScore":0,"studyDates":[]}');
const save = () => localStorage.setItem("iq_state", JSON.stringify(state));
const dayIndex = Math.floor(Date.now() / 86400000);
let currentTopic = Object.keys(IELTS_DATA.topics)[dayIndex % Object.keys(IELTS_DATA.topics).length];
let wordIndex = dayIndex % IELTS_DATA.topics[currentTopic].length;
let activeLesson = "todayLesson";

function init(){
  renderToday(); renderRoadmap(); renderTopics(); renderWord(); renderSkills(); renderQuiz(); updateStats();
  $("#menuBtn").addEventListener("click",()=>{ $("#mainNav").classList.toggle("open"); $("#menuBtn").setAttribute("aria-expanded",$("#mainNav").classList.contains("open")); });
  document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>openLesson(b.dataset.open)));
  $("#topicSelect").addEventListener("change",e=>{currentTopic=e.target.value;wordIndex=0;renderWord();});
  $("#revealWord").addEventListener("click",()=>document.querySelectorAll(".hidden-answer").forEach(x=>x.style.display="block"));
  $("#flashcard").addEventListener("click",()=>document.querySelectorAll(".hidden-answer").forEach(x=>x.style.display="block"));
  $("#nextWord").addEventListener("click",()=>{wordIndex=(wordIndex+1)%IELTS_DATA.topics[currentTopic].length;state.wordsSeen++;save();renderWord();updateStats();});
  $("#speakWord").addEventListener("click",()=>speak(IELTS_DATA.topics[currentTopic][wordIndex].w));
  $("#completeLesson").addEventListener("click",completeLesson);
  $("#resetProgress").addEventListener("click",()=>{ if(confirm("Bạn chắc chắn muốn xóa toàn bộ tiến độ?")){localStorage.removeItem("iq_state");location.reload();}});
}

function renderToday(){
  const topics = Object.keys(IELTS_DATA.topics);
  const t = topics[dayIndex % topics.length];
  $("#todayTitle").textContent = `Ngày ${dayIndex % 100 + 1}: ${t}`;
  $("#todayTasks").innerHTML = `<li>5 từ vựng chủ đề ${t}</li><li>1 bài nghe và nói</li><li>1 đoạn đọc/viết</li><li>10 câu kiểm tra</li>`;
}

function renderRoadmap(){
  $("#roadmapGrid").innerHTML = IELTS_DATA.roadmap.map((r,i)=>`
    <article class="card ${i>2?'locked':''}">
      <span class="badge">Chặng ${i+1}</span><h3>${r[0]}</h3><p>${r[1]}</p>
      <div class="meta"><span>${r[2]} bài</span><span>${i<=2?'Có thể học':'Sắp mở'}</span></div>
    </article>`).join("");
}

function renderTopics(){
  $("#topicSelect").innerHTML=Object.keys(IELTS_DATA.topics).map(t=>`<option ${t===currentTopic?'selected':''}>${t}</option>`).join("");
}

function renderWord(){
  const x=IELTS_DATA.topics[currentTopic][wordIndex];
  $("#wordLevel").textContent=x.l; $("#wordText").textContent=x.w; $("#wordPhonetic").textContent=x.p;
  $("#wordMeaning").textContent=x.m; $("#wordExample").textContent=x.e;
  document.querySelectorAll(".hidden-answer").forEach(el=>el.style.display="none");
}

function renderSkills(){
  $("#skillGrid").innerHTML=IELTS_DATA.skills.map(s=>`
    <article class="card"><div style="font-size:2rem">${s.icon}</div><span class="badge">${s.level}</span>
    <h3>${s.title}</h3><p>${s.desc}</p><button class="primary" data-open="${s.id}">Mở bài ${s.title.toLowerCase()}</button></article>`).join("");
  document.querySelectorAll("#skillGrid [data-open]").forEach(b=>b.addEventListener("click",()=>openLesson(b.dataset.open)));
}

function renderQuiz(){
  const shuffled=[...IELTS_DATA.quiz].sort((a,b)=>((dayIndex+a.q.length)%7)-((dayIndex+b.q.length)%7));
  $("#quizBox").innerHTML = `<form id="quizForm">${shuffled.map((x,i)=>`
    <div class="question"><strong>${i+1}. ${x.q}</strong><div class="options">
    ${x.o.map((o,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}
    </div></div>`).join("")}<button class="primary" type="submit">Nộp bài</button><div id="quizResult"></div></form>`;
  $("#quizForm").addEventListener("submit",e=>{
    e.preventDefault(); let score=0;
    shuffled.forEach((x,i)=>{const v=new FormData(e.target).get(`q${i}`); if(Number(v)===x.a)score++;});
    const pct=Math.round(score/shuffled.length*100); state.bestScore=Math.max(state.bestScore,pct); markStudyDate();save();updateStats();
    $("#quizResult").innerHTML=`<div class="quiz-result">Bạn đúng ${score}/${shuffled.length} câu — ${pct}%</div>`;
  });
}

function openLesson(id){
  activeLesson=id; const l=IELTS_DATA.lessons[id]; $("#dialogTitle").textContent=l.title; $("#dialogContent").innerHTML=l.html; $("#lessonDialog").showModal();
  const play=$("#playListening"); if(play) play.addEventListener("click",()=>speak("Hi, can I have a small iced coffee, please? Of course. Would you like milk or sugar? Just a little milk, please."));
  const read=$("#readSpeaking"); if(read) read.addEventListener("click",()=>speak($("#speakText").value||"My name is Ngoc. I am from Vietnam. I study English. In my free time, I like watching movies."));
  const wt=$("#writingText"); if(wt) wt.addEventListener("input",()=>$("#wordCounter").textContent=`${wt.value.trim()?wt.value.trim().split(/\s+/).length:0} từ`);
}

function completeLesson(){
  if(!state.completed.includes(activeLesson)) state.completed.push(activeLesson);
  markStudyDate(); save(); updateStats(); $("#lessonDialog").close();
}

function markStudyDate(){
  const d=new Date().toISOString().slice(0,10); if(!state.studyDates.includes(d)) state.studyDates.push(d);
}

function updateStats(){
  $("#completedCount").textContent=state.completed.length; $("#wordsCount").textContent=state.wordsSeen; $("#bestScore").textContent=`${state.bestScore}%`;
  const recent=state.studyDates.filter(d=>(Date.now()-new Date(d).getTime())<=7*86400000).length;
  $("#weekProgressText").textContent=`${Math.min(recent,7)}/7 ngày`; $("#weekProgressBar").style.width=`${Math.min(recent,7)/7*100}%`;
  const dates=[...state.studyDates].sort().reverse(); let streak=0, cursor=new Date();
  for(let i=0;i<30;i++){const key=cursor.toISOString().slice(0,10); if(dates.includes(key))streak++; else if(i>0)break; cursor.setDate(cursor.getDate()-1);}
  $("#streakCount").textContent=`${streak} ngày`;
}

function speak(text){
  if(!("speechSynthesis" in window)){alert("Trình duyệt này chưa hỗ trợ phát âm.");return;}
  speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text);u.lang="en-US";u.rate=.85;speechSynthesis.speak(u);
}
document.addEventListener("DOMContentLoaded",init);
