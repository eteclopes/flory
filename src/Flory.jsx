import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";
import {
  TrendingUp, Hash, Music, BookOpen, Users, Home,
  Sparkles, Star, ArrowLeft, Bell, Search, ChevronRight,
  Plus, Heart, Play, Camera, Layers, Flame, Clock,
  Award, Zap, Crown, Gift, CheckCircle, Lock,
  CreditCard, Repeat, ExternalLink, Eye, Lightbulb,
  Copy, MessageCircle,
  Bookmark, UserPlus, Video, Image as ImageIcon, BarChart2, PieChart
} from "lucide-react";

/* ─── TOKENS ─────────────────────────────────── */
const C = {
  peach:'#F2A487', rose:'#E8B1A3', peachLight:'#F7D9CC',
  cream:'#FFF4EC', beige:'#C9A696', dark:'#2A1208',
  medium:'#7B3D28', muted:'#A07868', white:'#FFFFFF',
  bg:'#FFF9F5', bgSoft:'#FFF3EE', border:'#EDD5C5',
  igGrad:'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
  ttGrad:'linear-gradient(135deg,#010101,#69C9D0)',
  ytGrad:'linear-gradient(135deg,#FF0000,#FF4444)',
  rlGrad:'linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)',
};
const Font = { display:"'Cormorant Garamond',Georgia,serif", body:"'DM Sans',system-ui,sans-serif" };

/* ─── GLOBAL CSS ─────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*{box-sizing:border-box;} body{margin:0;}

@keyframes fadeUp   {from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn   {from{opacity:0}to{opacity:1}}
@keyframes slideL   {from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}}
@keyframes floatA   {0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-8px) rotate(-1.5deg)}}
@keyframes floatB   {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pulse    {0%,100%{box-shadow:0 0 0 0 rgba(242,164,135,.45)}50%{box-shadow:0 0 0 10px rgba(242,164,135,0)}}
@keyframes glow     {0%,100%{box-shadow:0 0 0 0 rgba(242,164,135,.6)}50%{box-shadow:0 0 22px 7px rgba(242,164,135,.28)}}
@keyframes hotPulse {0%,100%{opacity:1}50%{opacity:.5}}
@keyframes countUp  {from{opacity:0;transform:scale(.82)}to{opacity:1;transform:scale(1)}}
@keyframes barGrow  {from{width:0}to{width:var(--w)}}
@keyframes shimmer  {0%{background-position:-400px 0}100%{background-position:400px 0}}
@keyframes popIn    {0%{opacity:0;transform:scale(.9) translateY(8px)}100%{opacity:1;transform:scale(1) translateY(0)}}

.afu {animation:fadeUp  .48s ease both}
.afi {animation:fadeIn  .38s ease both}
.asl {animation:slideL  .44s ease both}
.afA {animation:floatA 3.6s ease-in-out infinite}
.afB {animation:floatB 4.3s ease-in-out infinite}
.ack {animation:countUp .55s cubic-bezier(.2,.8,.4,1) both}
.agw {animation:glow 2.2s ease-in-out infinite}
.hp  {animation:hotPulse 1.5s ease-in-out infinite}
.pop {animation:popIn .35s cubic-bezier(.2,.8,.4,1) both}
.d1{animation-delay:.04s}.d2{animation-delay:.10s}.d3{animation-delay:.17s}
.d4{animation-delay:.24s}.d5{animation-delay:.31s}.d6{animation-delay:.38s}

/* cards */
.ch{transition:transform .22s ease,box-shadow .22s ease}
.ch:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(180,100,70,.14)!important}
.pc{transition:transform .25s,box-shadow .25s,border-color .25s}
.pc:hover{transform:translateY(-6px);box-shadow:0 20px 56px rgba(180,100,70,.16)!important}

/* platform pills */
.pf-btn{transition:all .2s ease;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;display:inline-flex;align-items:center;gap:7px;padding:8px 18px;border-radius:100px;}
.pf-btn:hover{transform:translateY(-1px);}

button{transition:opacity .15s,transform .12s,box-shadow .15s;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif}
button:hover{opacity:.91}
button:active{transform:scale(.97)}
.bp:hover{box-shadow:0 8px 28px rgba(242,164,135,.52)!important;transform:translateY(-1px)}
.bp:active{transform:translateY(0)}
a:hover{opacity:.72}
input:focus{border-color:#F2A487!important;box-shadow:0 0 0 3px #F2A4872A!important;outline:none}
input::placeholder{color:#C9A696}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:#EDD5C5;border-radius:3px}

/* image loading shimmer */
.img-wrap{background:#f5e9e0;overflow:hidden;position:relative}
.img-wrap::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,.4) 50%,transparent 100%);background-size:800px 100%;animation:shimmer 1.6s infinite}
.img-wrap img{display:block;width:100%;height:100%;object-fit:cover;position:relative;z-index:1}

/* layout */
.dash-wrap{display:flex;min-height:100vh;background:#FFF9F5;font-family:'DM Sans',system-ui,sans-serif}
.dash-main{flex:1;padding:40px 48px;overflow:auto}
.mob-top{display:none}

.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.g2{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.gc{display:grid;grid-template-columns:1fr 320px;gap:20px}
.gp{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.gf{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.gt{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.hg{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center}
.ghm{display:grid;grid-template-columns:repeat(7,1fr);gap:5px}
.ph{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}
.pha{display:flex;gap:10px}
.hl{display:inline}
.slu{padding:28px 24px 16px}
.sln{margin:0 14px 16px;padding:10px 14px;border-radius:14px;background:#F7D9CC;border:1px solid #EDD5C5}
.sls{padding:14px 18px;border-top:1px solid #EDD5C5}
.nav-wrap{display:flex;flex-direction:column;flex:1;padding:0 10px}
.asr{display:flex;gap:20px;margin-bottom:24px}

/* creator card image */
.creator-cover{height:72px;border-radius:16px 16px 0 0;overflow:hidden;position:relative}
.creator-avatar-wrap{position:absolute;bottom:-20px;left:18px;width:44px;height:44px;border-radius:50%;border:3px solid #fff;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.1)}

@media(max-width:1100px){
  .g4{grid-template-columns:repeat(2,1fr)}
  .gc{grid-template-columns:1fr}
  .gp{grid-template-columns:repeat(2,1fr)}
  .gf{grid-template-columns:repeat(2,1fr)}
  .gt{grid-template-columns:repeat(2,1fr)}
  .hg{gap:40px}
  .dash-main{padding:32px 28px}
}
@media(max-width:860px){
  .g3{grid-template-columns:repeat(2,1fr)}
  .gp{grid-template-columns:1fr}
}
@media(max-width:768px){
  .mob-top{display:flex;position:sticky;top:0;z-index:200;background:#FFFFFFEE;backdrop-filter:blur(12px);border-bottom:1px solid #EDD5C5;padding:0 16px;height:56px;align-items:center;justify-content:space-between}
  .dash-sidebar{width:100%!important;height:62px!important;position:fixed!important;bottom:0;left:0;right:0;top:auto!important;border-right:none!important;border-top:1px solid #EDD5C5;background:#fff;z-index:200;box-shadow:0 -4px 20px rgba(180,100,70,.1)}
  .slu,.sln,.sls{display:none!important}
  .nav-wrap{flex-direction:row;padding:0;justify-content:space-around;align-items:center;height:62px}
  .nav-wrap button{flex-direction:column!important;gap:3px!important;padding:8px 4px!important;border-radius:10px!important;font-size:10px!important;align-items:center!important;justify-content:center!important;flex:1!important}
  .hl{display:none}
  .dash-main{padding:16px 14px 82px}
  .hg{grid-template-columns:1fr}
  .g2{grid-template-columns:1fr}
  .g4{grid-template-columns:1fr 1fr;gap:12px}
  .gc{grid-template-columns:1fr}
  .gp{grid-template-columns:1fr}
  .gf{grid-template-columns:1fr}
  .gt{grid-template-columns:1fr}
  .ph{flex-direction:column;align-items:flex-start;gap:14px}
  .pha{width:100%}
  .hm{display:none}
  .asr{flex-direction:column}
}
@media(max-width:480px){
  .g4{grid-template-columns:1fr 1fr}
  .dash-main{padding:14px 10px 82px}
}
`;

/* ─── PLATFORM DATA ──────────────────────────── */
const PLATFORM_DATA = {
  Todos: {
    tags:[
      {tag:'#VidaDeCriador', posts:'84K', growth:'+28%', hot:true,  url:'https://www.instagram.com/explore/tags/vidadecriador/'},
      {tag:'#TikTokBrasil',  posts:'156K',growth:'+19%', hot:true,  url:'https://www.tiktok.com/tag/tiktokbrasil'},
      {tag:'#ContentCreator',posts:'62K', growth:'+12%', hot:false, url:'https://www.instagram.com/explore/tags/contentcreator/'},
      {tag:'#ReelsTips',     posts:'93K', growth:'+31%', hot:true,  url:'https://www.instagram.com/explore/tags/reelstips/'},
      {tag:'#GrowthHack',    posts:'47K', growth:'+8%',  hot:false, url:'https://www.instagram.com/explore/tags/growthhack/'},
      {tag:'#CriadorDigital',posts:'38K', growth:'+22%', hot:false, url:'https://www.instagram.com/explore/tags/criadordinital/'},
    ],
    sounds:[
      {name:'Flowers — Miley Cyrus (slowed)',uses:'2.1M',trend:'+42%',url:'https://www.tiktok.com/music/flowers'},
      {name:'As It Was — Harry Styles',      uses:'1.8M',trend:'+28%',url:'https://www.tiktok.com/music/as-it-was'},
      {name:'Unholy — Sam Smith',            uses:'1.4M',trend:'+19%',url:'https://www.tiktok.com/music/unholy'},
      {name:'Calm Down — Rema & Selena',     uses:'980K',trend:'+35%',url:'https://www.tiktok.com/music/calm-down'},
      {name:'Chill Surf Lofi Mix',           uses:'760K',trend:'+51%',url:'https://www.tiktok.com/music/lofi'},
    ],
    engData:[
      {day:'Seg',eng:4.2},{day:'Ter',eng:5.8},{day:'Qua',eng:7.1},
      {day:'Qui',eng:3.4},{day:'Sex',eng:8.9},{day:'Sáb',eng:9.2},{day:'Dom',eng:6.5},
    ],
    color: C.peach, barColor: C.rose,
  },
  Instagram: {
    tags:[
      {tag:'#Reels',         posts:'2.1M',growth:'+34%', hot:true,  url:'https://www.instagram.com/explore/tags/reels/'},
      {tag:'#InstagramBR',   posts:'890K',growth:'+15%', hot:true,  url:'https://www.instagram.com/explore/tags/instagrambr/'},
      {tag:'#FeedEstetico',  posts:'540K',growth:'+22%', hot:false, url:'https://www.instagram.com/explore/tags/feedestetico/'},
      {tag:'#ReelsBrasil',   posts:'310K',growth:'+41%', hot:true,  url:'https://www.instagram.com/explore/tags/reelsbrasil/'},
      {tag:'#InstaTips',     posts:'190K',growth:'+11%', hot:false, url:'https://www.instagram.com/explore/tags/instatips/'},
      {tag:'#CarrosselIG',   posts:'140K',growth:'+18%', hot:false, url:'https://www.instagram.com/explore/tags/carrosseL/'},
    ],
    sounds:[
      {name:'Lo-fi Aesthetic Study',      uses:'3.4M',trend:'+55%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Espresso — Sabrina Carpenter',uses:'2.9M',trend:'+47%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Paint The Town Red (edit)',   uses:'2.1M',trend:'+38%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Chill Vibes Mix',             uses:'1.6M',trend:'+29%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Vintage Filter Beat',         uses:'980K',trend:'+43%',url:'https://www.instagram.com/reels/audio/'},
    ],
    engData:[
      {day:'Seg',eng:5.1},{day:'Ter',eng:6.3},{day:'Qua',eng:8.0},
      {day:'Qui',eng:4.2},{day:'Sex',eng:9.4},{day:'Sáb',eng:10.1},{day:'Dom',eng:7.2},
    ],
    color:'#E1306C', barColor:'#F77737',
  },
  TikTok: {
    tags:[
      {tag:'#ParaVocê',     posts:'4.2M',growth:'+52%', hot:true,  url:'https://www.tiktok.com/tag/paravoce'},
      {tag:'#TikTokBR',     posts:'1.8M',growth:'+23%', hot:true,  url:'https://www.tiktok.com/tag/tiktokbr'},
      {tag:'#Fyp',          posts:'8.9M',growth:'+11%', hot:false, url:'https://www.tiktok.com/tag/fyp'},
      {tag:'#CapCut',       posts:'620K',growth:'+38%', hot:true,  url:'https://www.tiktok.com/tag/capcut'},
      {tag:'#Duet',         posts:'450K',growth:'+14%', hot:false, url:'https://www.tiktok.com/tag/duet'},
      {tag:'#TikTokDicas',  posts:'290K',growth:'+26%', hot:false, url:'https://www.tiktok.com/tag/tikTokdicas'},
    ],
    sounds:[
      {name:'Original Sound — devv.art',         uses:'4.8M',trend:'+72%',url:'https://www.tiktok.com/music/'},
      {name:'Flowers — Miley Cyrus (slowed)',     uses:'3.2M',trend:'+48%',url:'https://www.tiktok.com/music/'},
      {name:'MONTAGEM DO BRASIL',                uses:'2.7M',trend:'+61%',url:'https://www.tiktok.com/music/'},
      {name:'Funk Remix Viral',                   uses:'1.9M',trend:'+55%',url:'https://www.tiktok.com/music/'},
      {name:'Lofi Coding Session',               uses:'1.3M',trend:'+34%',url:'https://www.tiktok.com/music/'},
    ],
    engData:[
      {day:'Seg',eng:7.4},{day:'Ter',eng:8.9},{day:'Qua',eng:6.5},
      {day:'Qui',eng:9.2},{day:'Sex',eng:11.4},{day:'Sáb',eng:12.8},{day:'Dom',eng:9.7},
    ],
    color:'#010101', barColor:'#69C9D0',
  },
  YouTube: {
    tags:[
      {tag:'#Shorts',        posts:'12M', growth:'+44%', hot:true,  url:'https://www.youtube.com/hashtag/shorts'},
      {tag:'#YoutubeBrasil', posts:'3.1M',growth:'+17%', hot:false, url:'https://www.youtube.com/hashtag/youtubebrasil'},
      {tag:'#Vlog',          posts:'2.4M',growth:'+9%',  hot:false, url:'https://www.youtube.com/hashtag/vlog'},
      {tag:'#Tutorial',      posts:'1.8M',growth:'+21%', hot:true,  url:'https://www.youtube.com/hashtag/tutorial'},
      {tag:'#Reacts',        posts:'980K',growth:'+33%', hot:true,  url:'https://www.youtube.com/hashtag/reacts'},
      {tag:'#Produtividade', posts:'670K',growth:'+28%', hot:false, url:'https://www.youtube.com/hashtag/produtividade'},
    ],
    sounds:[
      {name:'No Copyright Music — NCS',  uses:'8.2M',trend:'+19%',url:'https://www.youtube.com/c/NoCopyrightSounds'},
      {name:'Epidemic Sound Pack',       uses:'5.4M',trend:'+14%',url:'https://www.youtube.com/'},
      {name:'Lofi Girl Chill Beats',     uses:'4.1M',trend:'+22%',url:'https://www.youtube.com/c/LofiGirl'},
      {name:'Phonk Drift Mix 2024',      uses:'3.2M',trend:'+41%',url:'https://www.youtube.com/'},
      {name:'Cinematic Background — HM', uses:'2.1M',trend:'+16%',url:'https://www.youtube.com/'},
    ],
    engData:[
      {day:'Seg',eng:3.2},{day:'Ter',eng:4.1},{day:'Qua',eng:5.4},
      {day:'Qui',eng:3.8},{day:'Sex',eng:6.7},{day:'Sáb',eng:7.9},{day:'Dom',eng:8.2},
    ],
    color:'#FF0000', barColor:'#FF6B6B',
  },
  Reels: {
    tags:[
      {tag:'#ReelsBrasil',   posts:'880K',growth:'+48%', hot:true,  url:'https://www.instagram.com/explore/tags/reelsbrasil/'},
      {tag:'#ReelsTrend',    posts:'640K',growth:'+39%', hot:true,  url:'https://www.instagram.com/explore/tags/reelstrend/'},
      {tag:'#ReelsFunny',    posts:'520K',growth:'+14%', hot:false, url:'https://www.instagram.com/explore/tags/reelsfunny/'},
      {tag:'#TransiçãoReels',posts:'310K',growth:'+55%', hot:true,  url:'https://www.instagram.com/explore/tags/transicaoreels/'},
      {tag:'#ReelsEstetico', posts:'245K',growth:'+22%', hot:false, url:'https://www.instagram.com/explore/tags/reelsestetico/'},
      {tag:'#ReelsDicas',    posts:'180K',growth:'+31%', hot:false, url:'https://www.instagram.com/explore/tags/reelsdicas/'},
    ],
    sounds:[
      {name:'Espresso — Sabrina Carpenter',   uses:'3.8M',trend:'+66%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Birds of a Feather — Billie E.', uses:'2.4M',trend:'+44%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Get Him Back! — Olivia R.',      uses:'1.9M',trend:'+38%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Smooth Criminal Edit (slowed)',  uses:'1.4M',trend:'+29%',url:'https://www.instagram.com/reels/audio/'},
      {name:'Aesthetic Chill Trap Beat',      uses:'1.1M',trend:'+51%',url:'https://www.instagram.com/reels/audio/'},
    ],
    engData:[
      {day:'Seg',eng:6.2},{day:'Ter',eng:7.4},{day:'Qua',eng:9.1},
      {day:'Qui',eng:5.8},{day:'Sex',eng:11.2},{day:'Sáb',eng:13.0},{day:'Dom',eng:8.4},
    ],
    color:'#833ab4', barColor:'#fd1d1d',
  },
};

const PLATFORM_ICONS = {
  Todos:     { bg:'linear-gradient(135deg,#F2A487,#E8B1A3)', icon:'🌐' },
  Instagram: { bg:C.igGrad,  icon:'📸' },
  TikTok:    { bg:C.ttGrad,  icon:'🎵' },
  YouTube:   { bg:C.ytGrad,  icon:'▶' },
  Reels:     { bg:C.rlGrad,  icon:'🎬' },
};

/* ─── OTHER DATA ─────────────────────────────── */
const contentScoreData = [
  {type:'Reels',    score:94, posts:8,  eng:9.2},
  {type:'TikTok',   score:87, posts:12, eng:8.7},
  {type:'Carrossel',score:82, posts:5,  eng:7.4},
  {type:'Vídeo',    score:79, posts:4,  eng:6.8},
  {type:'Story',    score:71, posts:18, eng:5.9},
];
const suggestions = [
  {title:'Bastidores da sua rotina', type:'Reels',    platform:'Instagram',score:94,Icon:Camera, desc:'Mostre um dia na sua vida de creator. Autenticidade gera 3x mais engajamento.',img:'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=75'},
  {title:'Tutorial de 60 segundos', type:'TikTok',   platform:'TikTok',   score:87,Icon:Video,  desc:'Ensine algo rápido do seu nicho. Formato curto está bombando essa semana.',img:'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=75'},
  {title:'Antes e depois',          type:'Carrossel', platform:'Instagram',score:82,Icon:Layers, desc:'Mostre transformações. Alto potencial de salvamentos e compartilhamentos.',img:'https://images.unsplash.com/photo-1516195851888-6f1a981a862e?w=400&q=75'},
  {title:'Resposta a comentário',   type:'Vídeo',    platform:'TikTok',   score:79,Icon:MessageCircle,desc:'Responda perguntas da audiência em vídeo. Aumenta conexão genuína.',img:'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=400&q=75'},
];
const creators = [
  {name:'Luísa Mendonça', niche:'Lifestyle & Moda',   followers:'42K', match:96, img:'https://i.pravatar.cc/150?img=47', cover:'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=70'},
  {name:'Camila Torres',  niche:'Beleza & Skincare',   followers:'28K', match:91, img:'https://i.pravatar.cc/150?img=44', cover:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=70'},
  {name:'Rafaela Costa',  niche:'Gastronomia',          followers:'61K', match:88, img:'https://i.pravatar.cc/150?img=48', cover:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70'},
  {name:'Beatriz Alves',  niche:'Fitness & Saúde',     followers:'35K', match:84, img:'https://i.pravatar.cc/150?img=45', cover:'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=70'},
  {name:'Fernanda Lima',  niche:'Viagens & Turismo',   followers:'54K', match:79, img:'https://i.pravatar.cc/150?img=49', cover:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70'},
  {name:'Juliana Reis',   niche:'Empreendedorismo',    followers:'22K', match:75, img:'https://i.pravatar.cc/150?img=43', cover:'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&q=70'},
];
const courses = [
  {title:'Algoritmo do Instagram 2024',lessons:8, duration:'2h30',level:'Iniciante',    progress:65, img:'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&q=70', instructor:'Ana Lima',    iAvatar:'https://i.pravatar.cc/40?img=32'},
  {title:'TikTok Para o Próximo Nível', lessons:12,duration:'4h15',level:'Intermediário',progress:30, img:'https://images.unsplash.com/photo-1591154669695-5f2a8d20c089?w=400&q=70', instructor:'Pedro Souza',  iAvatar:'https://i.pravatar.cc/40?img=12'},
  {title:'Monetização de Creators',     lessons:6, duration:'1h45',level:'Avançado',    progress:0,  img:'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&q=70', instructor:'Carla Motta',  iAvatar:'https://i.pravatar.cc/40?img=36'},
  {title:'Storytelling que Engaja',     lessons:9, duration:'3h00',level:'Iniciante',    progress:100,img:'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=70', instructor:'Marcos Faria', iAvatar:'https://i.pravatar.cc/40?img=8'},
];
const weeklyActivity=[
  {week:'S1',ideias:6,tendencias:4,conexoes:2,cursos:1},
  {week:'S2',ideias:9,tendencias:7,conexoes:3,cursos:2},
  {week:'S3',ideias:5,tendencias:5,conexoes:1,cursos:0},
  {week:'S4',ideias:12,tendencias:9,conexoes:5,cursos:3},
];
const HMAP=[0,0,0,0,0,0,1,2,3,4,2,1,3,4,2,0,1,3,2,4,1,0,3,2,1,4,3,2,1,2,0,4,3,2,1];
const DAYS=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const achievements=[
  {icon:'🔥',label:'7 dias seguidos',   done:true },
  {icon:'💡',label:'50 ideias usadas',   done:true },
  {icon:'🤝',label:'10 conexões feitas', done:true },
  {icon:'📚',label:'3 cursos concluídos',done:false},
  {icon:'🌟',label:'Top 10% creators',  done:false},
  {icon:'🚀',label:'30 dias de streak',  done:false},
];
const PLANS=[
  {name:'Gratuito',price:{m:0,a:0},   desc:'Para começar sua jornada como creator.',color:C.beige, Icon:Gift,
   features:['5 sugestões de conteúdo/mês','3 tendências diárias','Dashboard básico','2 cursos gratuitos','Perfil público'],
   locked:['Analytics avançado','Networking ilimitado','IA personalizada'],cta:'Plano atual',cur:true, hot:false},
  {name:'Pro',   price:{m:29,a:19},   desc:'Para creators que querem crescer de forma consistente.',color:C.peach,Icon:Zap,
   features:['Sugestões ilimitadas de IA','Tendências em tempo real','Analytics completo','Todos os cursos','Networking ilimitado','Horário ideal de postagem','Calendário editorial'],
   locked:[],cta:'Assinar Pro',cur:false,hot:true},
  {name:'Elite', price:{m:59,a:39},   desc:'Para creators profissionais e agências.',color:C.medium,Icon:Crown,
   features:['Tudo do Pro','IA treinada no seu nicho','Relatórios mensais','Suporte via WhatsApp','Sessão com especialista','Selo ✦ Elite','API de integração'],
   locked:[],cta:'Assinar Elite',cur:false,hot:false},
];
const NAV=[
  {id:'overview', label:'Início',    Icon:Home},
  {id:'trends',   label:'Tendências',Icon:TrendingUp},
  {id:'content',  label:'Conteúdo',  Icon:Sparkles},
  {id:'education',label:'Cursos',    Icon:BookOpen},
  {id:'network',  label:'Network',   Icon:Users},
  {id:'plans',    label:'Planos',    Icon:Crown},
];

/* ─── SHARED COMPONENTS ──────────────────────── */
function Card({children,style={},cls=''}){
  return <div className={`ch ${cls}`} style={{background:C.white,borderRadius:20,border:`1px solid ${C.border}`,boxShadow:'0 4px 24px rgba(180,100,70,.05)',...style}}>{children}</div>;
}
function Badge({children,variant='peach'}){
  const m={peach:{bg:C.peachLight,c:C.medium},rose:{bg:'#F0D5C8',c:'#8B4030'},hot:{bg:'#FFEADF',c:'#C04010'},green:{bg:'#E8F5E9',c:'#2E7D32'},purple:{bg:'#EDE9FE',c:'#5B21B6'}};
  const v=m[variant]||m.peach;
  return <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'3px 10px',borderRadius:100,fontSize:11,fontWeight:600,letterSpacing:.3,background:v.bg,color:v.c}}>{children}</span>;
}
function ABar({value,color=C.peach}){
  return <div style={{height:7,borderRadius:4,background:C.bgSoft,overflow:'hidden'}}><div style={{height:'100%',borderRadius:4,background:color,width:`${value}%`,animation:'barGrow .9s cubic-bezier(.2,.8,.4,1) both','--w':`${value}%`}}/></div>;
}
function Img({src,alt='',style={},cls=''}){
  const [err,setErr]=useState(false);
  return err
    ? <div style={{background:C.peachLight,display:'flex',alignItems:'center',justifyContent:'center',...style}}><ImageIcon size={20} color={C.beige}/></div>
    : <div className={`img-wrap ${cls}`} style={style}><img src={src} alt={alt} onError={()=>setErr(true)}/></div>;
}
function Avatar({src,name,size=40,style={}}){
  const [err,setErr]=useState(false);
  const initials=name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  return err
    ? <div style={{width:size,height:size,borderRadius:'50%',background:`linear-gradient(135deg,${C.peach},${C.beige})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.32,fontWeight:700,color:C.white,flexShrink:0,...style}}>{initials}</div>
    : <div style={{width:size,height:size,borderRadius:'50%',overflow:'hidden',flexShrink:0,...style}}><img src={src} alt={name} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={()=>setErr(true)}/></div>;
}
function MetricCard({label,value,change,Icon:Ic,positive=true,delay=''}){
  return(
    <Card cls={`afu ${delay}`} style={{padding:'20px 24px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div>
          <p style={{fontSize:11,color:C.muted,margin:'0 0 8px',fontWeight:600,textTransform:'uppercase',letterSpacing:.9}}>{label}</p>
          <p className="ack" style={{fontSize:30,fontWeight:600,color:C.dark,margin:0,fontFamily:Font.display,letterSpacing:-.5}}>{value}</p>
          <p style={{fontSize:12,color:positive?'#2E7D32':'#C62828',margin:'6px 0 0',fontWeight:600}}>{change} este mês</p>
        </div>
        <div style={{width:44,height:44,borderRadius:12,background:C.peachLight,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          <Ic size={20} color={C.medium}/>
        </div>
      </div>
    </Card>
  );
}

/* ─── SIDEBAR ────────────────────────────────── */
function Sidebar({activeTab,setActiveTab,onBack}){
  return(
    <div className="dash-sidebar asl" style={{width:252,flexShrink:0,background:C.white,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',position:'sticky',top:0,height:'100vh',overflowY:'auto',fontFamily:Font.body}}>
      <div className="slu">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${C.peach},${C.rose})`,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Sparkles size={16} color={C.white}/>
          </div>
          <span style={{fontFamily:Font.display,fontSize:24,fontWeight:600,color:C.dark,letterSpacing:-.3}}>flory</span>
        </div>
      </div>
      <div className="sln" style={{animation:'pulse 3s ease-in-out infinite'}}>
        <p style={{fontSize:11,color:C.medium,margin:0,fontWeight:600}}>✦ IA sugere</p>
        <p style={{fontSize:12,color:C.dark,margin:'3px 0 0'}}>Poste hoje às 18h!</p>
      </div>
      <nav className="nav-wrap">
        {NAV.map(({id,label,Icon:NavIc},i)=>{
          const active=activeTab===id, isPlan=id==='plans';
          return(
            <button key={id} onClick={()=>setActiveTab(id)} style={{
              display:'flex',alignItems:'center',gap:10,width:'100%',padding:'10px 14px',
              borderRadius:12,border:'none',background:active?C.peachLight:'transparent',
              color:active?C.medium:isPlan?C.peach:C.muted,
              fontSize:14,fontWeight:active?600:isPlan?600:400,marginBottom:2,textAlign:'left',
              animation:`fadeUp .4s ${.05*i}s both`,
            }}>
              <NavIc size={17}/>
              <span className="hl">{label}</span>
              {active&&<ChevronRight size={13} style={{marginLeft:'auto',opacity:.6}}/>}
              {isPlan&&!active&&<span className="hl" style={{marginLeft:'auto',fontSize:10,background:C.peach,color:C.white,padding:'2px 7px',borderRadius:100,fontWeight:700}}>✨</span>}
            </button>
          );
        })}
      </nav>
      <div className="sls">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <Avatar src="https://i.pravatar.cc/150?img=47" name="Ana Clara" size={36}/>
          <div>
            <p style={{margin:0,fontSize:13,fontWeight:600,color:C.dark}}>Ana Clara</p>
            <p style={{margin:0,fontSize:11,color:C.muted}}>Plano Pro ✨</p>
          </div>
        </div>
        <button onClick={onBack} style={{marginTop:10,width:'100%',padding:'8px',borderRadius:10,border:`1px solid ${C.border}`,background:'transparent',fontSize:12,color:C.muted,display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
          <ArrowLeft size={12}/> Voltar ao site
        </button>
      </div>
    </div>
  );
}

function MobTop({activeTab}){
  const cur=NAV.find(n=>n.id===activeTab);
  return(
    <div className="mob-top">
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:28,height:28,borderRadius:8,background:`linear-gradient(135deg,${C.peach},${C.rose})`,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Sparkles size={12} color={C.white}/>
        </div>
        <span style={{fontFamily:Font.display,fontSize:18,fontWeight:600,color:C.dark}}>flory</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        {cur&&<span style={{fontSize:13,fontWeight:600,color:C.dark}}>{cur.label}</span>}
        <div style={{width:34,height:34,borderRadius:9,border:`1px solid ${C.border}`,background:C.white,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Bell size={15} color={C.muted}/>
        </div>
      </div>
    </div>
  );
}

/* ─── OVERVIEW ───────────────────────────────── */
function OverviewTab(){
  return(
    <div>
      <div className="ph afu">
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <Avatar src="https://i.pravatar.cc/150?img=47" name="Ana Clara" size={48} style={{border:`3px solid ${C.peachLight}`}}/>
          <div>
            <h1 style={{fontFamily:Font.display,fontSize:32,fontWeight:600,color:C.dark,margin:0,letterSpacing:-.5}}>Bom dia, Ana ✨</h1>
            <p style={{color:C.muted,fontSize:13,margin:'2px 0 0'}}>Segunda-feira, 15 de julho de 2024</p>
          </div>
        </div>
        <div className="pha">
          <button style={{display:'flex',alignItems:'center',gap:6,padding:'10px 14px',borderRadius:12,border:`1px solid ${C.border}`,background:C.white,fontSize:13,color:C.dark}}><Bell size={15}/></button>
          <button className="bp" style={{display:'flex',alignItems:'center',gap:6,padding:'10px 20px',borderRadius:12,border:'none',background:C.peach,fontSize:13,color:C.white,fontWeight:600}}><Plus size={15}/> Novo Post</button>
        </div>
      </div>
      <div className="g4" style={{marginBottom:24}}>
        <MetricCard label="Ideias Usadas"      value="18"   change="+6 esta semana"  Icon={Lightbulb} delay="d1"/>
        <MetricCard label="Tendências Salvas"  value="32"   change="+9 esta semana"  Icon={TrendingUp} delay="d2"/>
        <MetricCard label="Streak Atual"       value="14d"  change="Recorde pessoal!" Icon={Flame}     delay="d3" positive={true}/>
        <MetricCard label="Cursos Ativos"      value="2/4"  change="+1 em progresso" Icon={BookOpen}  delay="d4"/>
      </div>
      <div className="gc afu d2" style={{marginBottom:24}}>
        <Card style={{padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <div>
              <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:0,fontWeight:500}}>Score da Plataforma</h2>
              <p style={{fontSize:12,color:C.muted,margin:'2px 0 0'}}>Sua consistência de uso da Flory</p>
            </div>
            <Badge>2024</Badge>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:28,marginBottom:20}}>
            <div style={{width:96,height:96,borderRadius:'50%',flexShrink:0,background:`conic-gradient(${C.peach} 0% 78%,${C.peachLight} 78% 100%)`,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:74,height:74,borderRadius:'50%',background:C.white,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <span style={{fontFamily:Font.display,fontSize:28,fontWeight:600,color:C.dark,lineHeight:1}}>78</span>
                <span style={{fontSize:10,color:C.muted}}>/ 100</span>
              </div>
            </div>
            <div style={{flex:1}}>
              <p style={{fontFamily:Font.display,fontSize:16,fontWeight:600,color:C.dark,margin:'0 0 4px'}}>Creator Consistente</p>
              <p style={{fontSize:12,color:C.muted,margin:'0 0 14px'}}>Nível 4 de 6 — faltam 12 pts</p>
              {[
                {label:'Ideias aproveitadas', pct:64},
                {label:'Tendências seguidas', pct:78},
                {label:'Cursos em progresso', pct:50},
              ].map((r,i)=>(
                <div key={i} style={{marginBottom:10}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontSize:12,color:C.dark}}>{r.label}</span>
                    <span style={{fontSize:11,color:C.muted}}>{r.pct}%</span>
                  </div>
                  <ABar value={r.pct}/>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={weeklyActivity} margin={{top:4,right:4,left:-20,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="week" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${C.border}`,fontFamily:Font.body,fontSize:12}}/>
              <Bar dataKey="ideias"     fill={C.peach}  radius={[4,4,0,0]} name="Ideias"     stackId="a"/>
              <Bar dataKey="tendencias" fill={C.rose}   radius={[0,0,0,0]} name="Tendências" stackId="a"/>
              <Bar dataKey="cursos"     fill={C.beige}  radius={[4,4,0,0]} name="Cursos"     stackId="a"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{padding:24}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:18}}>
            <Flame size={17} color={C.peach} className="hp"/>
            <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:0,fontWeight:500}}>Em Alta Hoje</h2>
          </div>
          {PLATFORM_DATA.Todos.tags.map((t,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',padding:'9px 0',borderBottom:i<5?`1px solid ${C.border}`:'none',gap:10}}>
              <span style={{fontSize:11,color:C.muted,fontWeight:700,minWidth:16}}>{i+1}</span>
              <div style={{flex:1}}>
                <p style={{margin:0,fontSize:13,fontWeight:600,color:C.dark}}>{t.tag}</p>
                <p style={{margin:'1px 0 0',fontSize:11,color:C.muted}}>{t.posts} posts</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span style={{fontSize:12,fontWeight:700,color:'#2E7D32'}}>{t.growth}</span>
                {t.hot&&<Flame size={12} color="#C04010" className="hp"/>}
              </div>
            </div>
          ))}
        </Card>
      </div>
      {/* Suggestions with images */}
      <div className="afu d3">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <Sparkles size={17} color={C.peach}/>
            <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:0,fontWeight:500}}>Sugestões de IA</h2>
          </div>
          <button style={{fontSize:13,color:C.medium,background:'none',border:'none',fontWeight:600}}>Ver todas →</button>
        </div>
        <div className="g4">
          {suggestions.map((s,i)=>(
            <Card key={i} cls={`afu d${i+1}`} style={{overflow:'hidden',cursor:'pointer',padding:0}}>
              <Img src={s.img} style={{height:110,width:'100%'}}/>
              <div style={{padding:'14px 16px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                  <Badge variant="rose">{s.type}</Badge>
                  <span style={{fontSize:11,fontWeight:700,color:'#2E7D32'}}>{s.score}%</span>
                </div>
                <h3 style={{fontSize:13,fontWeight:600,color:C.dark,margin:'5px 0 4px'}}>{s.title}</h3>
                <p style={{fontSize:11,color:C.muted,margin:0,lineHeight:1.5}}>{s.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TRENDS (Functional platform filter) ───── */
function TrendsTab(){
  const [plat,setPlat]=useState('Todos');
  const [copied,setCopied]=useState(null);
  const data=PLATFORM_DATA[plat];
  const platforms=Object.keys(PLATFORM_DATA);

  const copyTag=(tag)=>{
    navigator.clipboard?.writeText(tag).catch(()=>{});
    setCopied(tag);
    setTimeout(()=>setCopied(null),1800);
  };

  return(
    <div>
      <div className="ph afu">
        <div>
          <h1 style={{fontFamily:Font.display,fontSize:34,fontWeight:600,color:C.dark,margin:'0 0 4px',letterSpacing:-.5}}>Tendências</h1>
          <p style={{color:C.muted,fontSize:14,margin:0}}>O que está em alta agora — filtre por plataforma</p>
        </div>
      </div>

      {/* Platform filter pills */}
      <div style={{display:'flex',gap:10,marginBottom:28,flexWrap:'wrap'}}>
        {platforms.map(p=>{
          const pi=PLATFORM_ICONS[p];
          const active=plat===p;
          return(
            <button key={p} onClick={()=>setPlat(p)} className="pf-btn pop" style={{
              background: active ? pi.bg : C.white,
              border: active ? 'none' : `1.5px solid ${C.border}`,
              color: active ? C.white : C.muted,
              fontWeight: active ? 600 : 400,
              boxShadow: active ? '0 4px 16px rgba(0,0,0,.15)' : 'none',
              transform: active ? 'translateY(-2px)' : 'none',
            }}>
              <span style={{fontSize:15}}>{pi.icon}</span>
              <span>{p}</span>
            </button>
          );
        })}
      </div>

      <div className="g2 afu d1" style={{marginBottom:20}}>
        {/* Hashtags */}
        <Card style={{padding:24}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:C.peachLight,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Hash size={17} color={C.medium}/>
              </div>
              <h2 style={{fontFamily:Font.display,fontSize:20,color:C.dark,margin:0,fontWeight:500}}>Hashtags em Alta</h2>
            </div>
            <Badge variant={plat==='Todos'?'peach':plat==='Instagram'?'rose':plat==='TikTok'?'peach':plat==='YouTube'?'hot':plat==='Reels'?'purple':'peach'}>{plat}</Badge>
          </div>
          {data.tags.map((t,i)=>(
            <div key={`${plat}-t-${i}`} className="afu" style={{display:'flex',alignItems:'center',gap:12,padding:'11px 0',borderBottom:i<data.tags.length-1?`1px solid ${C.border}`:'none',animationDelay:`${.06*i}s`}}>
              <span style={{fontSize:12,color:C.muted,fontWeight:700,minWidth:18,textAlign:'right'}}>{i+1}</span>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:1}}>
                  <p style={{margin:0,fontSize:14,fontWeight:600,color:C.dark}}>{t.tag}</p>
                  {t.hot&&<Flame size={12} color="#C04010" className="hp"/>}
                </div>
                <p style={{margin:0,fontSize:11,color:C.muted}}>{t.posts} posts</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:12,fontWeight:700,color:'#2E7D32'}}>{t.growth}</span>
                <button
                  onClick={()=>copyTag(t.tag)}
                  title="Copiar hashtag"
                  style={{width:28,height:28,borderRadius:7,border:`1px solid ${C.border}`,background:copied===t.tag?C.peachLight:C.white,display:'flex',alignItems:'center',justifyContent:'center',padding:0,flexShrink:0}}
                >
                  {copied===t.tag ? <CheckCircle size={12} color={C.medium}/> : <Copy size={12} color={C.muted}/>}
                </button>
                <a href={t.url} target="_blank" rel="noreferrer"
                  style={{width:28,height:28,borderRadius:7,border:`1px solid ${C.border}`,background:C.white,display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none',flexShrink:0}}
                  title="Abrir no app"
                >
                  <ExternalLink size={12} color={C.muted}/>
                </a>
              </div>
            </div>
          ))}
        </Card>

        {/* Sounds */}
        <Card style={{padding:24}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:10,background:C.peachLight,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Music size={17} color={C.medium}/>
              </div>
              <h2 style={{fontFamily:Font.display,fontSize:20,color:C.dark,margin:0,fontWeight:500}}>Músicas Populares</h2>
            </div>
            <Badge variant="rose">{plat}</Badge>
          </div>
          {data.sounds.map((s,i)=>(
            <div key={`${plat}-s-${i}`} className="afu" style={{display:'flex',alignItems:'center',gap:12,padding:'11px 0',borderBottom:i<data.sounds.length-1?`1px solid ${C.border}`:'none',animationDelay:`${.06*i}s`}}>
              <div style={{width:36,height:36,borderRadius:10,background:C.cream,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:`1px solid ${C.border}`}}>
                <Play size={13} color={C.peach}/>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <p style={{margin:0,fontSize:13,fontWeight:600,color:C.dark,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.name}</p>
                <p style={{margin:'1px 0 0',fontSize:11,color:C.muted}}>{s.uses} usos</p>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:700,color:data.color==='#010101'?'#69C9D0':data.color}}>{s.trend}</span>
                <a href={s.url} target="_blank" rel="noreferrer"
                  style={{width:28,height:28,borderRadius:7,border:`1px solid ${C.border}`,background:C.white,display:'flex',alignItems:'center',justifyContent:'center',textDecoration:'none'}}
                  title="Ouvir / usar"
                >
                  <ExternalLink size={11} color={C.muted}/>
                </a>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Engagement bar chart per platform */}
      <Card className="afu d3" style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <div>
            <h2 style={{fontFamily:Font.display,fontSize:20,color:C.dark,margin:0,fontWeight:500}}>Engajamento por Dia — {plat}</h2>
            <p style={{fontSize:12,color:C.muted,margin:'2px 0 0'}}>Melhores dias para postar nessa plataforma</p>
          </div>
          <div style={{width:32,height:32,borderRadius:9,background:plat==='Todos'?C.peachLight:'transparent',backgroundImage:plat==='Todos'?'none':PLATFORM_ICONS[plat].bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>
            {PLATFORM_ICONS[plat].icon}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data.engData} key={plat}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="day" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${C.border}`,fontFamily:Font.body,fontSize:12}}/>
            <Bar dataKey="eng" fill={data.barColor} radius={[7,7,0,0]} name="Engajamento %"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

/* ─── CONTENT ────────────────────────────────── */
function ContentTab(){
  const [liked,setLiked]=useState({});
  const [saved,setSaved]=useState({});
  return(
    <div>
      <div className="ph afu">
        <div>
          <h1 style={{fontFamily:Font.display,fontSize:34,fontWeight:600,color:C.dark,margin:'0 0 4px',letterSpacing:-.5}}>Sugestões de Conteúdo</h1>
          <p style={{color:C.muted,fontSize:14,margin:0}}>Ideias personalizadas geradas por IA para o seu perfil</p>
        </div>
      </div>
      <div className="g2" style={{marginBottom:24}}>
        {suggestions.map((s,i)=>(
          <Card key={i} cls={`afu d${i+1}`} style={{overflow:'hidden',padding:0,cursor:'pointer'}}>
            <Img src={s.img} style={{height:160,width:'100%'}}/>
            <div style={{padding:'18px 22px 22px'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,flexWrap:'wrap'}}>
                <Badge variant="rose">{s.type}</Badge>
                <Badge>{s.platform}</Badge>
                <span style={{fontSize:12,fontWeight:700,color:'#2E7D32',marginLeft:'auto'}}>✦ {s.score}%</span>
              </div>
              <h3 style={{fontSize:17,fontWeight:600,color:C.dark,margin:'0 0 7px'}}>{s.title}</h3>
              <p style={{fontSize:13,color:C.muted,margin:'0 0 18px',lineHeight:1.6}}>{s.desc}</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <button className="bp" style={{padding:'9px 20px',borderRadius:10,border:'none',background:C.peach,fontSize:13,color:C.white,fontWeight:600}}>
                  Criar conteúdo →
                </button>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>setLiked(l=>({...l,[i]:!l[i]}))} style={{width:36,height:36,borderRadius:9,border:`1px solid ${liked[i]?C.rose:C.border}`,background:liked[i]?'#FFF0ED':C.white,display:'flex',alignItems:'center',justifyContent:'center',padding:0}}>
                    <Heart size={15} color={liked[i]?C.peach:C.muted} fill={liked[i]?C.peach:'none'}/>
                  </button>
                  <button onClick={()=>setSaved(s=>({...s,[i]:!s[i]}))} style={{width:36,height:36,borderRadius:9,border:`1px solid ${saved[i]?C.rose:C.border}`,background:saved[i]?'#FFF0ED':C.white,display:'flex',alignItems:'center',justifyContent:'center',padding:0}}>
                    <Bookmark size={15} color={saved[i]?C.peach:C.muted} fill={saved[i]?C.peach:'none'}/>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Score por formato de conteúdo */}
      <div className="g2 afu d3">
        <Card style={{padding:24}}>
          <div style={{marginBottom:18}}>
            <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:'0 0 4px',fontWeight:500}}>Score por Formato</h2>
            <p style={{fontSize:12,color:C.muted,margin:0}}>Qual formato performa melhor no seu perfil</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contentScoreData} layout="vertical" margin={{left:10,right:20,top:4,bottom:4}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
              <XAxis type="number" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} domain={[0,100]}/>
              <YAxis dataKey="type" type="category" tick={{fontSize:12,fill:C.dark}} axisLine={false} tickLine={false} width={72}/>
              <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${C.border}`,fontFamily:Font.body,fontSize:12}} formatter={(v)=>[`${v}%`,'Score']}/>
              <Bar dataKey="score" fill={C.peach} radius={[0,7,7,0]} name="Score de IA"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card style={{padding:24}}>
          <div style={{marginBottom:18}}>
            <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:'0 0 4px',fontWeight:500}}>Engajamento por Formato</h2>
            <p style={{fontSize:12,color:C.muted,margin:0}}>Taxa média de engajamento por tipo de post</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={contentScoreData} margin={{left:-20,right:8,top:4,bottom:4}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
              <XAxis dataKey="type" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${C.border}`,fontFamily:Font.body,fontSize:12}} formatter={(v)=>[`${v}%`,'Engajamento']}/>
              <Bar dataKey="eng" fill={C.rose} radius={[7,7,0,0]} name="Engajamento %"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

/* ─── EDUCATION ──────────────────────────────── */
function EducationTab(){
  return(
    <div>
      <div className="ph afu">
        <div>
          <h1 style={{fontFamily:Font.display,fontSize:34,fontWeight:600,color:C.dark,margin:'0 0 4px',letterSpacing:-.5}}>Aprendizado</h1>
          <p style={{color:C.muted,fontSize:14,margin:0}}>Cursos e masterclasses para você crescer de verdade</p>
        </div>
      </div>
      {/* Featured banner */}
      <div className="afu d1" style={{position:'relative',borderRadius:22,overflow:'hidden',marginBottom:24,minHeight:180}}>
        <Img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=75" style={{position:'absolute',inset:0,width:'100%',height:'100%'}} cls=""/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(42,18,8,.82) 0%,rgba(42,18,8,.3) 100%)'}}/>
        <div style={{position:'relative',padding:'32px 36px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
          <div style={{maxWidth:520}}>
            <Badge variant="hot">✦ Masterclass em destaque</Badge>
            <h2 style={{fontFamily:Font.display,fontSize:28,color:C.white,margin:'12px 0 8px',fontWeight:600}}>De 0 a 100K Seguidores</h2>
            <p style={{color:'rgba(255,255,255,.75)',fontSize:14,margin:'0 0 20px',lineHeight:1.6}}>Aprenda as estratégias que os maiores criadores brasileiros usam para crescer de forma orgânica e consistente.</p>
            <div style={{display:'flex',gap:20,marginBottom:22,flexWrap:'wrap'}}>
              {[['20 aulas',Clock],['6h total',BookOpen],['4.9 ⭐',Star]].map(([label,Ic],i)=>(
                <span key={i} style={{display:'flex',alignItems:'center',gap:6,fontSize:13,color:'rgba(255,255,255,.85)'}}><Ic size={14}/> {label}</span>
              ))}
            </div>
            <button className="bp" style={{padding:'12px 26px',borderRadius:12,border:'none',background:C.peach,color:C.white,fontSize:14,fontWeight:600}}>Começar agora →</button>
          </div>
        </div>
      </div>
      {/* Course cards with images */}
      <div className="g2">
        {courses.map((course,i)=>(
          <Card key={i} cls={`afu d${i+1}`} style={{overflow:'hidden',padding:0}}>
            <div style={{position:'relative'}}>
              <Img src={course.img} style={{height:148,width:'100%'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(42,18,8,.5),transparent)'}}/>
              <div style={{position:'absolute',bottom:10,left:14}}>
                <Badge variant={course.level==='Iniciante'?'peach':course.level==='Intermediário'?'rose':'hot'}>{course.level}</Badge>
              </div>
              {course.progress===100&&(
                <div style={{position:'absolute',top:10,right:10,background:'#2E7D32',color:'#fff',borderRadius:100,padding:'3px 10px',fontSize:11,fontWeight:700}}>✓ Concluído</div>
              )}
            </div>
            <div style={{padding:'16px 20px 20px'}}>
              <h3 style={{fontSize:15,fontWeight:600,color:C.dark,margin:'0 0 8px'}}>{course.title}</h3>
              <div style={{display:'flex',gap:14,marginBottom:12}}>
                <span style={{fontSize:12,color:C.muted}}>{course.lessons} aulas</span>
                <span style={{fontSize:12,color:C.muted}}>{course.duration}</span>
              </div>
              {/* Instructor */}
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,padding:'8px 10px',background:C.bgSoft,borderRadius:10}}>
                <Avatar src={course.iAvatar} name={course.instructor} size={26}/>
                <span style={{fontSize:12,color:C.muted}}>por <strong style={{color:C.dark}}>{course.instructor}</strong></span>
              </div>
              {course.progress>0&&course.progress<100&&(
                <div style={{marginBottom:12}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
                    <span style={{fontSize:11,color:C.muted}}>Progresso</span>
                    <span style={{fontSize:11,color:C.medium,fontWeight:600}}>{course.progress}%</span>
                  </div>
                  <ABar value={course.progress}/>
                </div>
              )}
              <button style={{width:'100%',padding:'10px',borderRadius:11,border:`1px solid ${C.border}`,background:'transparent',fontSize:13,color:C.medium,fontWeight:500}}>
                {course.progress===100?'Rever conteúdo':course.progress>0?'Continuar →':'Começar →'}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── NETWORK ────────────────────────────────── */
function NetworkTab(){
  const [connected,setConnected]=useState({});
  const [search,setSearch]=useState('');
  const filtered=creators.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase())||
    c.niche.toLowerCase().includes(search.toLowerCase())
  );
  return(
    <div>
      <div className="ph afu">
        <div>
          <h1 style={{fontFamily:Font.display,fontSize:34,fontWeight:600,color:C.dark,margin:'0 0 4px',letterSpacing:-.5}}>Networking</h1>
          <p style={{color:C.muted,fontSize:14,margin:0}}>Descubra creators para colaborar e crescer juntos</p>
        </div>
      </div>
      <div className="afu d1" style={{position:'relative',marginBottom:24}}>
        <Search size={15} color={C.muted} style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)'}}/>
        <input
          value={search}
          onChange={e=>setSearch(e.target.value)}
          placeholder="Buscar por nome, nicho ou interesse..."
          style={{width:'100%',padding:'12px 16px 12px 44px',borderRadius:14,border:`1px solid ${C.border}`,background:C.white,fontSize:14,color:C.dark,boxSizing:'border-box'}}
        />
      </div>

      {/* Gráfico de nichos */}
      <Card cls="afu d1" style={{padding:24,marginBottom:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18,flexWrap:'wrap',gap:10}}>
          <div>
            <h2 style={{fontFamily:Font.display,fontSize:21,color:C.dark,margin:'0 0 4px',fontWeight:500}}>Distribuição por Nicho</h2>
            <p style={{fontSize:12,color:C.muted,margin:0}}>Creators disponíveis para colaboração por área</p>
          </div>
          <Badge variant="peach">6 creators</Badge>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={[
            {nicho:'Lifestyle',qtd:1,match:96},
            {nicho:'Beleza',   qtd:1,match:91},
            {nicho:'Gastro',   qtd:1,match:88},
            {nicho:'Fitness',  qtd:1,match:84},
            {nicho:'Viagens',  qtd:1,match:79},
            {nicho:'Empreen.',  qtd:1,match:75},
          ]} margin={{left:-20,right:8,top:4,bottom:4}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="nicho" tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:11,fill:C.muted}} axisLine={false} tickLine={false} domain={[0,100]}/>
            <Tooltip contentStyle={{borderRadius:12,border:`1px solid ${C.border}`,fontFamily:Font.body,fontSize:12}} formatter={(v)=>[`${v}%`,'Match']}/>
            <Bar dataKey="match" fill={C.peach} radius={[7,7,0,0]} name="% Match"/>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {filtered.length===0&&(
        <div style={{textAlign:'center',padding:'40px 0',color:C.muted}}>
          <Users size={32} color={C.beige} style={{marginBottom:10}}/>
          <p>Nenhum creator encontrado</p>
        </div>
      )}
      <div className="g2">
        {filtered.map((cr,i)=>(
          <Card key={i} cls={`afu d${(i%4)+1}`} style={{overflow:'hidden',padding:0}}>
            {/* Cover — full image, fixed height, no clip */}
            <div style={{position:'relative',height:120,flexShrink:0}}>
              <Img src={cr.cover} style={{height:120,width:'100%'}} cls=""/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(42,18,8,.1),rgba(42,18,8,.38))'}}/>
            </div>
            {/* Avatar row — sits below cover, no negative margin overlap */}
            <div style={{padding:'0 18px 18px'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:-22,marginBottom:12}}>
                <Avatar src={cr.img} name={cr.name} size={44} style={{border:`3px solid ${C.white}`,boxShadow:'0 2px 10px rgba(0,0,0,.15)',flexShrink:0}}/>
                <span style={{fontSize:11,fontWeight:700,color:C.medium,background:C.peachLight,padding:'4px 10px',borderRadius:100}}>{cr.match}% match</span>
              </div>
              <h3 style={{fontSize:15,fontWeight:600,color:C.dark,margin:'0 0 2px'}}>{cr.name}</h3>
              <p style={{fontSize:12,color:C.muted,margin:'0 0 14px'}}>{cr.niche}</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                <span style={{display:'flex',alignItems:'center',gap:4,fontSize:12,color:C.muted}}><Users size={12}/> {cr.followers}</span>
                <div style={{display:'flex',gap:8}}>
                  <button style={{padding:'6px 14px',borderRadius:8,border:`1px solid ${C.border}`,background:'transparent',fontSize:12,color:C.muted}}>Perfil</button>
                  <button
                    onClick={()=>setConnected(p=>({...p,[i]:!p[i]}))}
                    className={!connected[i]?'bp':''}
                    style={{padding:'6px 14px',borderRadius:8,border:connected[i]?`1px solid ${C.border}`:'none',background:connected[i]?C.bgSoft:C.peach,fontSize:12,color:connected[i]?C.muted:C.white,fontWeight:600,display:'flex',alignItems:'center',gap:5}}
                  >
                    {connected[i]?<><CheckCircle size={12}/> Conectado</>:<><UserPlus size={12}/> Conectar</>}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ─── PLANS ──────────────────────────────────── */
function FaqItem({q,a}){
  const [open,setOpen]=useState(false);
  return(
    <div style={{borderBottom:`1px solid ${C.border}`,padding:'16px 0'}}>
      <button onClick={()=>setOpen(!open)} style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',background:'none',border:'none',padding:0}}>
        <span style={{fontSize:15,fontWeight:600,color:C.dark,textAlign:'left'}}>{q}</span>
        <span style={{fontSize:18,color:C.muted,transition:'transform .25s',transform:open?'rotate(45deg)':'none',marginLeft:12,flexShrink:0}}>+</span>
      </button>
      {open&&<p className="afu" style={{fontSize:14,color:C.muted,margin:'10px 0 0',lineHeight:1.7}}>{a}</p>}
    </div>
  );
}
function PlansTab(){
  const [billing,setBilling]=useState('monthly');
  const saving=Math.round((1-19/29)*100);
  return(
    <div>
      <div className="afu" style={{textAlign:'center',marginBottom:36}}>
        <h1 style={{fontFamily:Font.display,fontSize:38,fontWeight:600,color:C.dark,margin:'0 0 10px',letterSpacing:-.5}}>Escolha seu plano</h1>
        <p style={{color:C.muted,fontSize:15,margin:'0 0 28px'}}>Invista no seu crescimento. Cancele quando quiser.</p>
        <div style={{display:'inline-flex',alignItems:'center',background:C.bgSoft,borderRadius:100,padding:'5px 6px',border:`1px solid ${C.border}`}}>
          {['monthly','annual'].map(opt=>(
            <button key={opt} onClick={()=>setBilling(opt)} style={{padding:'8px 22px',borderRadius:100,border:'none',background:billing===opt?C.white:'transparent',boxShadow:billing===opt?'0 2px 12px rgba(180,100,70,.12)':'none',color:billing===opt?C.dark:C.muted,fontSize:13,fontWeight:billing===opt?600:400,transition:'all .22s ease'}}>
              {opt==='monthly'?'Mensal':'Anual'}
            </button>
          ))}
        </div>
        {billing==='annual'&&<div className="afu" style={{marginTop:10}}><span style={{fontSize:13,color:'#2E7D32',fontWeight:600}}>✓ Economize até {saving}% no plano anual</span></div>}
      </div>
      <div className="gp afu d2">
        {PLANS.map((plan,i)=>(
          <div key={i} className={`pc afu d${i+1}`} style={{background:plan.hot?`linear-gradient(160deg,${C.peach}14,${C.rose}20)`:C.white,border:plan.hot?`2px solid ${C.peach}`:`1px solid ${C.border}`,borderRadius:24,padding:28,position:'relative',boxShadow:plan.hot?`0 8px 40px rgba(242,164,135,.18)`:'0 4px 20px rgba(180,100,70,.05)'}}>
            {plan.hot&&(
              <div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:C.peach,color:C.white,fontSize:11,fontWeight:700,padding:'5px 16px',borderRadius:100,animation:'pulse 2.5s ease-in-out infinite',whiteSpace:'nowrap'}}>✦ MAIS POPULAR</div>
            )}
            <div style={{width:48,height:48,borderRadius:14,marginBottom:16,background:`${plan.color}22`,display:'flex',alignItems:'center',justifyContent:'center'}}>
              <plan.Icon size={22} color={plan.color}/>
            </div>
            <p style={{fontSize:12,fontWeight:700,color:C.muted,textTransform:'uppercase',letterSpacing:.8,margin:'0 0 4px'}}>{plan.name}</p>
            <div style={{display:'flex',alignItems:'baseline',gap:4,margin:'0 0 6px'}}>
              {plan.price.m===0
                ?<span style={{fontFamily:Font.display,fontSize:40,fontWeight:600,color:C.dark,letterSpacing:-1}}>Grátis</span>
                :<><span style={{fontSize:14,color:C.muted}}>R$</span><span className="ack" style={{fontFamily:Font.display,fontSize:44,fontWeight:600,color:C.dark,letterSpacing:-1}}>{billing==='annual'?plan.price.a:plan.price.m}</span><span style={{fontSize:13,color:C.muted}}>/mês</span></>
              }
            </div>
            {billing==='annual'&&plan.price.m>0&&<p style={{fontSize:11,color:'#2E7D32',fontWeight:600,margin:'0 0 10px'}}>cobrado R${plan.price.a*12}/ano</p>}
            <p style={{fontSize:13,color:C.muted,margin:'0 0 22px',lineHeight:1.55}}>{plan.desc}</p>
            <button className={plan.hot?'bp':''} style={{width:'100%',padding:'13px',borderRadius:13,marginBottom:24,border:plan.hot?'none':`1.5px solid ${C.border}`,background:plan.hot?C.peach:plan.cur?C.bgSoft:C.white,color:plan.hot?C.white:plan.cur?C.muted:C.dark,fontSize:14,fontWeight:600,cursor:plan.cur?'default':'pointer',boxShadow:plan.hot?`0 6px 24px ${C.peach}44`:'none'}}>
              {plan.cur?'✓ Plano atual':plan.cta+' →'}
            </button>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:20}}>
              {plan.features.map((f,j)=>(
                <div key={j} style={{display:'flex',alignItems:'flex-start',gap:9,marginBottom:10}}>
                  <CheckCircle size={14} color="#2E7D32" style={{flexShrink:0,marginTop:1}}/>
                  <span style={{fontSize:13,color:C.dark,lineHeight:1.45}}>{f}</span>
                </div>
              ))}
              {plan.locked.map((f,j)=>(
                <div key={j} style={{display:'flex',alignItems:'flex-start',gap:9,marginBottom:10,opacity:.38}}>
                  <Lock size={13} color={C.muted} style={{flexShrink:0,marginTop:1}}/>
                  <span style={{fontSize:13,color:C.muted,lineHeight:1.45}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="afu d4" style={{maxWidth:680,margin:'48px auto 0'}}>
        <h2 style={{fontFamily:Font.display,fontSize:28,fontWeight:600,color:C.dark,textAlign:'center',marginBottom:28,letterSpacing:-.3}}>Dúvidas frequentes</h2>
        {[
          {q:'Posso cancelar a qualquer momento?',a:'Sim! Sem fidelidade. Cancele quando quiser, sem burocracia.'},
          {q:'O plano anual tem desconto real?',  a:`Sim, até ${saving}% de desconto. No Pro você paga R${19*12}/ano.`},
          {q:'Preciso de cartão no plano Grátis?',a:'Não! O plano Gratuito não exige nenhum dado de pagamento.'},
          {q:'Posso mudar de plano depois?',       a:'Sim. Upgrade ou downgrade quando quiser, com cobrança proporcional.'},
        ].map((item,i)=><FaqItem key={i} q={item.q} a={item.a}/>)}
      </div>
      <div className="afu d5" style={{marginTop:36,display:'flex',justifyContent:'center',gap:36,flexWrap:'wrap',paddingBottom:8}}>
        {[[CreditCard,'Pagamento seguro'],[Lock,'Dados protegidos'],[Repeat,'Cancele a qualquer hora']].map(([Ic,label],i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:7,fontSize:13,color:C.muted}}><Ic size={15} color={C.beige}/> {label}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── LANDING ────────────────────────────────── */
function LandingPage({onGetStarted}){
  const features=[
    {Icon:TrendingUp,title:'Tendências em Tempo Real',  desc:'Acompanhe hashtags, sons e formatos viralizando antes de todo mundo.'},
    {Icon:Sparkles,  title:'Sugestões de Conteúdo IA',  desc:'Receba ideias personalizadas baseadas no seu nicho e audiência.'},
    {Icon:Award,     title:'Suporte e ajuda',            desc:'Suporte para lidar com o estresse do digital e lidar com cancelamentos.'},
    {Icon:BookOpen,  title:'Mundo digital',              desc:'Dicas especializadas, sempre se atualizando para auxiliar com as novidades do mundo virtual.'},
    {Icon:Users,     title:'Networking de Creators',     desc:'Encontre criadores do seu nicho para colaborações estratégicas.'},
    {Icon:Hash,      title:'Hashtags Otimizadas',        desc:'Descubra as melhores hashtags e maximize seu alcance orgânico.'},
  ];
  return(
    <div style={{fontFamily:Font.body,color:C.dark,background:C.bg}}>
      <nav style={{position:'sticky',top:0,zIndex:100,background:`${C.white}EE`,backdropFilter:'blur(12px)',borderBottom:`1px solid ${C.border}`,padding:'0 48px',display:'flex',alignItems:'center',justifyContent:'space-between',height:66}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${C.peach},${C.rose})`,display:'flex',alignItems:'center',justifyContent:'center'}}><Sparkles size={14} color={C.white}/></div>
          <span style={{fontFamily:Font.display,fontSize:24,fontWeight:600,color:C.dark,letterSpacing:-.3}}>flory</span>
        </div>
        <div style={{display:'flex',gap:32}}>
          {['Recursos','Preços','Blog','Sobre'].map(l=><a key={l} href="#" style={{fontSize:14,color:C.muted,textDecoration:'none'}}>{l}</a>)}
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <button style={{fontSize:14,color:C.medium,background:'none',border:'none',fontWeight:500}}>Entrar</button>
          <button onClick={onGetStarted} className="bp" style={{padding:'10px 22px',borderRadius:12,border:'none',background:C.peach,color:C.white,fontSize:14,fontWeight:600}}>Começar grátis</button>
        </div>
      </nav>

      <section style={{padding:'90px 48px 70px',maxWidth:1240,margin:'0 auto'}}>
        <div className="hg">
          <div className="afu">
            <h1 style={{fontFamily:Font.display,fontSize:60,fontWeight:600,lineHeight:1.08,color:C.dark,margin:'0 0 24px',letterSpacing:-1}}>
              Crie, conecte-se<br/><em style={{color:C.peach}}>e floresça.</em>
            </h1>
            <p style={{fontSize:16,color:C.muted,lineHeight:1.75,margin:'0 0 38px',maxWidth:440}}>Flory, uma empresa especial que se conecta com o cliente, ajudando criadores digitais a crescerem no mundo digital, com análises, suportes e tendências.</p>
            <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
              <button onClick={onGetStarted} className="bp" style={{padding:'14px 30px',borderRadius:14,border:'none',background:C.peach,color:C.white,fontSize:15,fontWeight:700,boxShadow:`0 8px 28px ${C.peach}55`}}>Experimentar grátis →</button>
              <button style={{padding:'14px 28px',borderRadius:14,border:`1px solid ${C.border}`,background:C.white,fontSize:15,color:C.dark}}>Ver demo</button>
            </div>
          </div>
          <div className="hm afA" style={{position:'relative'}}>
            <div style={{background:C.white,borderRadius:24,border:`1px solid ${C.border}`,boxShadow:`0 28px 80px rgba(180,100,70,.14)`,overflow:'hidden',transform:'rotate(-1.5deg)'}}>
              <div style={{background:C.bgSoft,padding:'13px 18px',borderBottom:`1px solid ${C.border}`,display:'flex',gap:7}}>
                {[C.peach,C.rose,C.peachLight].map((col,i)=><div key={i} style={{width:10,height:10,borderRadius:'50%',background:col}}/>)}
              </div>
              <div style={{padding:'18px 18px 12px',display:'flex',gap:10}}>
                {[['18','Ideias usadas'],['78%','Score Flory'],['14d','Streak']].map(([val,lbl])=>(
                  <div key={lbl} style={{flex:1,background:C.bg,borderRadius:12,padding:'11px 13px',border:`1px solid ${C.border}`}}>
                    <p style={{fontSize:17,fontWeight:700,color:C.dark,margin:0,fontFamily:Font.display}}>{val}</p>
                    <p style={{fontSize:10,color:C.muted,margin:'1px 0 0'}}>{lbl}</p>
                  </div>
                ))}
              </div>
              <div style={{padding:'0 18px 18px'}}>
                <div style={{background:C.peach,borderRadius:12,padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <p style={{fontSize:10,color:'rgba(255,255,255,.8)',margin:0}}>✦ Sugestão de IA</p>
                    <p style={{fontSize:13,color:C.white,fontWeight:600,margin:'2px 0 0'}}>Poste hoje às 18h!</p>
                  </div>
                  <Sparkles size={18} color={C.white}/>
                </div>
              </div>
            </div>
            <div className="afB" style={{position:'absolute',top:-14,right:-18,background:C.white,borderRadius:14,padding:'10px 16px',border:`1px solid ${C.border}`,boxShadow:'0 8px 24px rgba(180,100,70,.1)',display:'flex',alignItems:'center',gap:8}}>
              <TrendingUp size={15} color={C.peach}/>
              <span style={{fontSize:13,fontWeight:600,color:C.dark}}>+8.2% consistência</span>
            </div>
            <div className="afA" style={{position:'absolute',bottom:50,left:-22,background:C.white,borderRadius:14,padding:'10px 16px',border:`1px solid ${C.border}`,boxShadow:'0 8px 24px rgba(180,100,70,.1)',display:'flex',alignItems:'center',gap:8,animationDelay:'.8s'}}>
              <Star size={15} color={C.peach} fill={C.peach}/>
              <span style={{fontSize:13,fontWeight:600,color:C.dark}}>14 dias de streak! 🔥</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'80px 48px',maxWidth:1240,margin:'0 auto'}}>
        <div className="afu" style={{textAlign:'center',marginBottom:52}}>
          <Badge variant="rose">Recursos</Badge>
          <h2 style={{fontFamily:Font.display,fontSize:44,fontWeight:600,color:C.dark,margin:'16px 0 14px',letterSpacing:-.5}}>Tudo que você precisa para criar</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:480,margin:'0 auto',lineHeight:1.7}}>Uma plataforma com ferramentas essências para criar e crescer mais.</p>
        </div>
        <div className="gf">
          {features.map((f,i)=>(
            <div key={i} className={`ch afu d${i+1}`} style={{background:C.white,borderRadius:20,padding:28,border:`1px solid ${C.border}`}}>
              <div style={{width:48,height:48,borderRadius:14,background:C.peachLight,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18}}><f.Icon size={22} color={C.medium}/></div>
              <h3 style={{fontSize:17,fontWeight:600,color:C.dark,margin:'0 0 10px'}}>{f.title}</h3>
              <p style={{fontSize:14,color:C.muted,margin:0,lineHeight:1.65}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:'80px 48px',background:C.cream}}>
        <div style={{maxWidth:1240,margin:'0 auto'}}>
          <div className="afu" style={{textAlign:'center'}}>
            <h2 style={{fontFamily:Font.display,fontSize:44,fontWeight:600,color:C.dark,margin:'0 0 10px',letterSpacing:-.5}}>Conectando</h2>
            <p style={{fontSize:16,color:C.muted,maxWidth:480,margin:'0 auto',lineHeight:1.7}}>Espaço dedicando para conectar influenciadores com marcas.</p>
          </div>
        </div>
      </section>

      <section style={{padding:'60px 48px 80px'}}>
        <div className="afu" style={{maxWidth:720,margin:'0 auto',textAlign:'center',background:`linear-gradient(135deg,${C.peach}22,${C.rose}33)`,borderRadius:28,padding:'60px 48px',border:`1px solid ${C.border}`}}>
          <h2 style={{fontFamily:Font.display,fontSize:44,fontWeight:600,color:C.dark,margin:'0 0 16px',letterSpacing:-.5}}>Pronta para crescer?</h2>
          <p style={{fontSize:16,color:C.muted,margin:'0 0 36px',lineHeight:1.7}}>Junte-se a nós para crescer de forma inteligente.</p>
          <button onClick={onGetStarted} className="bp" style={{padding:'16px 40px',borderRadius:16,border:'none',background:C.peach,color:C.white,fontSize:16,fontWeight:700,boxShadow:`0 12px 36px ${C.peach}55`}}>Começar gratuitamente →</button>
          <p style={{fontSize:12,color:C.muted,margin:'16px 0 0'}}>Sem cartão de crédito • Plano gratuito disponível</p>
        </div>
      </section>

      <footer style={{padding:'32px 48px',borderTop:`1px solid ${C.border}`,background:C.white}}>
        <div style={{maxWidth:1240,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${C.peach},${C.rose})`,display:'flex',alignItems:'center',justifyContent:'center'}}><Sparkles size={11} color={C.white}/></div>
            <span style={{fontFamily:Font.display,fontSize:18,fontWeight:600,color:C.dark}}>flory</span>
          </div>
          <p style={{fontSize:13,color:C.muted,margin:0}}>@flory.in_ • (00) 00000-0000</p>
          <div style={{display:'flex',gap:24}}>
            {['Termos','Contato'].map(l=><a key={l} href="#" style={{fontSize:13,color:C.muted,textDecoration:'none'}}>{l}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── DASHBOARD SHELL ────────────────────────── */
function Dashboard({onBack,activeTab,setActiveTab}){
  return(
    <div>
      <MobTop activeTab={activeTab}/>
      <div className="dash-wrap">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onBack={onBack}/>
        <main className="dash-main">
          {activeTab==='overview'  && <OverviewTab/>}
          {activeTab==='trends'    && <TrendsTab/>}
          {activeTab==='content'   && <ContentTab/>}
          {activeTab==='education' && <EducationTab/>}
          {activeTab==='network'   && <NetworkTab/>}
          {activeTab==='plans'     && <PlansTab/>}
        </main>
      </div>
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────── */
export default function FloryApp(){
  const [view,setView]       = useState('landing');
  const [dashTab,setDashTab] = useState('overview');
  return(
    <div>
      <style>{CSS}</style>
      {view==='landing'
        ? <LandingPage onGetStarted={()=>setView('dashboard')}/>
        : <Dashboard onBack={()=>setView('landing')} activeTab={dashTab} setActiveTab={setDashTab}/>
      }
    </div>
  );
}