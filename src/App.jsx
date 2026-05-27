import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trash2, UserPlus, LogIn, Wallet, MapPin, CalendarDays, Scale,
  CreditCard, ClipboardList, ChevronLeft, BellRing, ShieldCheck,
  Truck, Settings, LockKeyhole, Navigation
} from "lucide-react";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [kg, setKg] = useState(3);
  const [charge, setCharge] = useState(10000);
  const [balance, setBalance] = useState(10000);

  const baseFee = 2500;
  const perKgFee = 2000;
  const estimatedFee = useMemo(() => baseFee + Number(kg || 0) * perKgFee, [kg]);
  const canPay = balance >= estimatedFee;

  const s = {
    app: { minHeight: "100vh", background: "#e2e8f0", display: "flex", justifyContent: "center", padding: 16, fontFamily: "Arial, sans-serif" },
    phone: { width: "100%", maxWidth: 390, minHeight: 780, background: "linear-gradient(#eff6ff,#f1f5f9)", borderRadius: 32, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.2)", border: "1px solid white" },
    page: { padding: 20 },
    centerPage: { padding: 24, paddingTop: 64 },
    card: { background: "white", borderRadius: 24, padding: 20, boxShadow: "0 8px 25px rgba(15,23,42,.08)", marginTop: 16 },
    btn: { width: "100%", height: 48, border: 0, borderRadius: 16, background: "#2563eb", color: "white", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
    subBtn: { width: "100%", border: 0, background: "transparent", color: "#2563eb", fontWeight: 700, padding: 8, cursor: "pointer" },
    input: { width: "100%", boxSizing: "border-box", border: "1px solid #dbe3ef", borderRadius: 16, padding: "13px 14px", fontSize: 14, outline: "none", marginTop: 6 },
    label: { display: "block", fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 12 },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 },
    smallText: { color: "#64748b", fontSize: 13, lineHeight: 1.6 },
    title: { margin: 0, color: "#0f172a", fontSize: 28, fontWeight: 900 },
    iconBox: { width: 80, height: 80, borderRadius: 24, background: "#2563eb", color: "white", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 10px 25px rgba(37,99,235,.35)" },
  };

  const Header = ({ title, backTo = "home" }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 20px 8px" }}>
      <button onClick={() => setScreen(backTo)} style={{ width: 38, height: 38, borderRadius: 999, border: 0, background: "white", boxShadow: "0 3px 12px rgba(0,0,0,.08)", cursor: "pointer" }}>
        <ChevronLeft size={20} />
      </button>
      <h1 style={{ fontSize: 21, margin: 0, fontWeight: 900 }}>{title}</h1>
    </div>
  );

  const Input = ({ label, placeholder, type = "text" }) => (
    <label style={s.label}>{label}<input type={type} placeholder={placeholder} style={s.input} /></label>
  );

  const MiniCard = ({ icon, title, text, onClick }) => (
    <button onClick={onClick} style={{ textAlign: "left", border: 0, background: "white", borderRadius: 24, padding: 18, boxShadow: "0 5px 16px rgba(15,23,42,.07)", cursor: "pointer" }}>
      <div style={{ color: "#2563eb", marginBottom: 8 }}>{icon}</div>
      <b>{title}</b>
      <p style={{ ...s.smallText, margin: "6px 0 0" }}>{text}</p>
    </button>
  );

  return (
    <div style={s.app}>
      <div style={s.phone}>
        {screen === "login" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={s.centerPage}>
            <div style={s.iconBox}><Trash2 size={42} /></div>
            <h1 style={{ ...s.title, textAlign: "center" }}>픽업클린</h1>
            <p style={{ ...s.smallText, textAlign: "center" }}>밤 10시까지 문 앞에 놓아두시면 새벽에 안전하게 수거해드립니다</p>
            <div style={s.card}>
              <Input label="아이디" placeholder="아이디를 입력하세요" />
              <Input label="비밀번호" placeholder="비밀번호를 입력하세요" type="password" />
              <button style={s.btn} onClick={() => setScreen("home")}><LogIn size={18} />로그인</button>
              <button style={s.subBtn} onClick={() => setScreen("signup")}>회원가입하기</button>
              <button style={{ ...s.subBtn, color: "#94a3b8", fontSize: 12 }} onClick={() => setScreen("adminLogin")}>관리자 로그인</button>
            </div>
          </motion.div>
        )}

        {screen === "adminLogin" && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={s.centerPage}>
            <div style={{ ...s.iconBox, background: "#0f172a" }}><LockKeyhole size={42} /></div>
            <h1 style={{ ...s.title, textAlign: "center" }}>관리자 로그인</h1>
            <p style={{ ...s.smallText, textAlign: "center" }}>접수 현황과 고객 주소를 관리합니다</p>
            <div style={s.card}>
              <Input label="관리자 아이디" placeholder="admin" />
              <Input label="관리자 비밀번호" placeholder="비밀번호" type="password" />
              <button style={{ ...s.btn, background: "#0f172a" }} onClick={() => setScreen("admin")}><LockKeyhole size={18} />관리자 접속</button>
              <button style={{ ...s.subBtn, color: "#64748b" }} onClick={() => setScreen("login")}>고객 로그인으로 돌아가기</button>
            </div>
          </motion.div>
        )}

        {screen === "signup" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Header title="회원가입" backTo="login" />
            <div style={s.page}><div style={s.card}>
              <Input label="이름" placeholder="홍길동" />
              <Input label="휴대폰 번호" placeholder="010-0000-0000" />
              <Input label="아이디" placeholder="사용할 아이디" />
              <Input label="비밀번호" placeholder="비밀번호" type="password" />
              <Input label="기본 주소" placeholder="도로명 주소" />
              <Input label="상세 주소" placeholder="동/호수, 건물명" />
              <button style={s.btn} onClick={() => setScreen("home")}><UserPlus size={18} />가입 완료</button>
            </div></div>
          </motion.div>
        )}

        {screen === "home" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.page}>
            <div style={{ height: 190, borderRadius: 26, overflow: "hidden", position: "relative", background: "linear-gradient(135deg,#1d4ed8,#60a5fa)", color: "white", padding: 22, boxSizing: "border-box", boxShadow: "0 12px 30px rgba(37,99,235,.25)" }}>
              <p style={{ margin: 0, fontWeight: 800, color: "#dbeafe" }}>새벽 비대면 수거 서비스</p>
              <h2 style={{ fontSize: 31, lineHeight: 1.15, margin: "12px 0 0", fontWeight: 900 }}>밤 10시 전<br />문 앞에 두면<br />새벽 수거 완료</h2>
              <p style={{ position: "absolute", bottom: 18, margin: 0, color: "#dbeafe", fontSize: 13 }}>실제 무게 측정 후 추가요금 자동결제</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
              <div><p style={{ ...s.smallText, margin: 0 }}>안녕하세요</p><h1 style={{ fontSize: 24, margin: "4px 0 0", fontWeight: 900 }}>생활쓰레기 수거 신청</h1></div>
              <button onClick={() => setScreen("adminLogin")} style={{ border: 0, background: "#dbeafe", color: "#1d4ed8", borderRadius: 999, padding: "9px 12px", fontWeight: 800 }}>관리자</button>
            </div>

            <div style={{ ...s.card, background: "#2563eb", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><div><p style={{ margin: 0, color: "#dbeafe" }}>현재 충전금</p><h2 style={{ margin: "6px 0 0", fontSize: 32 }}>{balance.toLocaleString()}원</h2></div><Wallet size={38} /></div>
              <button style={{ ...s.btn, background: "white", color: "#1d4ed8", marginTop: 16 }} onClick={() => setScreen("charge")}>충전하기</button>
            </div>

            <div style={s.grid2}>
              <MiniCard icon={<CalendarDays />} title="수거 신청" text="주소/무게 입력" onClick={() => setScreen("request")} />
              <MiniCard icon={<ClipboardList />} title="신청 내역" text="진행 상태 확인" onClick={() => setScreen("history")} />
              <MiniCard icon={<BellRing />} title="문자 알림" text="수거 완료 안내" />
              <MiniCard icon={<ShieldCheck />} title="안전 수거" text="새벽 비대면 진행" />
            </div>

            <div style={s.card}>
              <b>수거 및 요금 안내</b>
              <p style={s.smallText}>기본 수거비 2,500원<br />실제 무게 측정 후 kg당 2,000원 추가<br />최소 충전금액 10,000원<br />결제 시스템: 토스페이먼츠 연동 예정</p>
            </div>
          </motion.div>
        )}

        {screen === "request" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Header title="수거 신청" />
            <div style={s.page}><div style={s.card}>
              <Input label="수거 주소" placeholder="기본 주소 자동 입력" />
              <Input label="상세 요청사항" placeholder="예: 현관 앞에 놓겠습니다" />
              <label style={s.label}>예상 무게(kg)<input value={kg} onChange={(e) => setKg(e.target.value)} type="number" min="0" style={s.input} /></label>
              <div style={{ background: "#f8fafc", borderRadius: 22, padding: 16, marginBottom: 14 }}>
                <p style={{ ...s.smallText, margin: 0 }}>예상 결제금액</p>
                <h2 style={{ margin: "6px 0", fontSize: 32 }}>{estimatedFee.toLocaleString()}원</h2>
                <p style={{ ...s.smallText, margin: 0 }}>기본 2,500원 + {kg || 0}kg × 2,000원</p>
              </div>
              {!canPay && <p style={{ color: "#dc2626", fontWeight: 800 }}>충전금이 부족합니다.</p>}
              <button style={s.btn} onClick={() => canPay ? setScreen("complete") : setScreen("charge")}><CreditCard size={18} />{canPay ? "충전금으로 결제하기" : "충전하러 가기"}</button>
            </div></div>
          </motion.div>
        )}

        {screen === "charge" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Header title="충전하기" />
            <div style={s.page}><div style={s.card}>
              <p style={s.smallText}>최소 충전금액은 10,000원입니다.</p>
              <div style={s.grid2}>{[10000, 20000, 30000, 50000].map(a => (
                <button key={a} onClick={() => setCharge(a)} style={{ border: charge === a ? "2px solid #2563eb" : "1px solid #dbe3ef", background: charge === a ? "#eff6ff" : "white", borderRadius: 18, padding: 16, fontWeight: 900 }}>{a.toLocaleString()}원</button>
              ))}</div>
              <button style={{ ...s.btn, marginTop: 16 }} onClick={() => { setBalance(balance + charge); setScreen("home"); }}>{charge.toLocaleString()}원 충전하기</button>
            </div></div>
          </motion.div>
        )}

        {screen === "history" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Header title="신청 내역" />
            <div style={s.page}>{["수거 대기", "새벽 수거중", "실무게 측정 완료"].map((st, i) => (
              <div key={st} style={s.card}><div style={{ display: "flex", justifyContent: "space-between" }}><b>생활쓰레기 수거</b><span style={{ color: "#2563eb", fontWeight: 900 }}>{st}</span></div><p style={s.smallText}><MapPin size={14} /> 광주광역시 광산구<br />결제예정금액 {(8500 + i * 2000).toLocaleString()}원</p></div>
            ))}</div>
          </motion.div>
        )}

        {screen === "admin" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Header title="관리자 페이지" backTo="login" />
            <div style={s.page}>
              <div style={s.card}><div style={{ display: "flex", justifyContent: "space-between" }}><div><p style={s.smallText}>오늘 접수 건수</p><h2 style={{ fontSize: 34, margin: 0 }}>28건</h2></div><Settings color="#2563eb" size={38} /></div></div>
              <div style={s.grid2}><MiniCard icon={<Truck />} title="수거 기사" text="5명 배정중" /><MiniCard icon={<Wallet />} title="오늘 매출" text="248,000원" /></div>
              <div style={{ ...s.card, padding: 0, overflow: "hidden" }}>
                <div style={{ padding: 18, display: "flex", justifyContent: "space-between" }}><div><b>고객 주소 지도</b><p style={{ ...s.smallText, margin: "4px 0 0" }}>오늘 수거 예정 위치</p></div><Navigation color="#2563eb" /></div>
                <div style={{ height: 190, position: "relative", background: "#dbeafe" }}>
                  <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#bfdbfe 1px, transparent 1px), linear-gradient(90deg, #bfdbfe 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                  {[ [55,45,"우산동"], [230,80,"월곡동"], [145,135,"신가동"] ].map(([x,y,t]) => <div key={t} style={{ position: "absolute", left: x, top: y, background: "#2563eb", color: "white", borderRadius: 999, padding: "8px 12px", fontWeight: 900, fontSize: 12 }}>{t}</div>)}
                </div>
              </div>
              <div style={s.card}><b>수거 신청 고객 목록</b>{["김○○ / 광주 광산구 우산동 / 수거 예정", "박○○ / 광주 광산구 월곡동 / 기사 배정", "이○○ / 광주 광산구 신가동 / 실무게 확인"].map(x => <p key={x} style={{ ...s.smallText, background: "#f8fafc", borderRadius: 14, padding: 12 }}>{x}</p>)}</div>
            </div>
          </motion.div>
        )}

        {screen === "complete" && (
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} style={{ ...s.centerPage, minHeight: 650, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <div style={s.iconBox}><Trash2 size={46} /></div>
            <h1 style={s.title}>신청 완료!</h1>
            <p style={s.smallText}>수거 신청이 접수되었습니다.<br />새벽 수거 후 실제 무게 측정이 진행되며 추가 요금은 자동 결제됩니다.</p>
            <button style={{ ...s.btn, marginTop: 24 }} onClick={() => { setBalance(balance - estimatedFee); setScreen("home"); }}>홈으로 이동</button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
