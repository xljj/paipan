
//=================================地球SSB位置和速度================================
//==================================================================================
/****************************
算法取自《天文算法》
****************************/
var evTab = new Array( //地球的SSB速度计算表
 1,1,  0,0, 0,0,-1719914,  -25,   25,1578089,   10,684185, //01
 2,1,  0,0, 0,0,    6434,28007,25697,  -5904,11141, -2559,
 1,3,  0,0, 0,0,     715,    0,    6,   -657,  -15,  -282,
 1,7,  0,0, 0,0,     715,    0,    0,   -656,    0,  -285,
 3,1,  0,0, 0,0,     486, -236, -216,   -446,  -94,  -193,
 1,4,  0,0, 0,0,     159,    0,    2,   -147,   -6,   -61, //06
 1,10, 0,0, 0,0,  0,  0,  0, 26,  0,-59,
 1,7,  1,9, 0,0, 39,  0,  0,-36,  0,-16, 
 2,3,  0,0, 0,0, 33,-10, -9,-30, -5,-13,
 2,1, -1,3, 0,0, 31,  1,  1,-28,  0,-12,
 3,1, -8,2, 3,3,  8,-28, 25,  8, 11,  3, //11
 5,1, -8,2, 3,3,  8,-28,-25, -8,-11, -3,
 2,0, -1,1, 0,0, 21,  0,  0,-19,  0, -8,
 1,0,  0,0, 0,0,-19,  0,  0, 17,  0,  8,
 1,5,  0,0, 0,0, 17,  0,  0,-16,  0, -7,
 1,1, -2,3, 0,0, 16,  0,  0, 15,  1,  7, //16
 1,6,  0,0, 0,0, 16,  0,  1,-15, -3, -6,
 1,1,  1,3, 0,0, 11, -1, -1,-10, -1, -5,
 2,0, -2,1, 0,0,  0,-11,-10,  0, -4,  0,
 1,1, -1,3, 0,0,-11, -2, -2,  9, -1,  4,
 4,1,  0,0, 0,0, -7, -8, -8,  6, -3,  3, //21
 3,1, -2,3, 0,0,-10,  0,  0,  9,  0,  4,
 1,0, -2,1, 0,0, -9,  0,  0, -9,  0, -4,
 2,0, -3,1, 0,0, -9,  0,  0, -8,  0, -4,
 2,4,  0,0, 0,0,  0, -9, -8,  0, -3,  0,
 2,0, -4,1, 0,0,  0, -9,  8,  0,  3,  0, //26
 3,1, -2,2, 0,0,  8,  0,  0, -8,  0, -3,
 1,7,  2,8,-1,9,  8,  0,  0, -7,  0, -3,
 8,0,-12,1, 0,0, -4, -7, -6,  4, -3,  2,
 8,0,-14,1, 0,0, -4, -7,  6, -4,  3, -2,
 2,2,  0,0, 0,0, -6, -5, -4,  5, -2,  2, //31
 3,0, -4,1, 0,0, -1, -1, -2, -7,  1, -4,
 2,1, -2,3, 0,0,  4, -6, -5, -4, -2, -2,
 3,0, -3,1, 0,0,  0, -7, -6,  0, -3,  0,
 2,1, -2,2, 0,0,  5, -5, -4, -5, -2, -2,
 1,7, -2,8, 0,0,  5,  0,  0, -5,  0, -2, //36

 1,1,  0,0, 0,0, -2,   0,-13, 156, 32,-358, //本行开始为泊松项
 2,1,  0,0, 0,0,141,-107,-95,-130,-48,-55,
 3,1,  0,0, 0,0, -5,  -4, -4,   5,  0,  0
);

function evSSB(t){ //地球的SSB速度, t儒略世纪, 速度单位AU/世纪, 平均误差4*10^-8AU/日
 var J = new Array(
  3.1761467 + 1021.3285546*t, //金
  1.7534703 +  628.3075849*t, //地
  6.2034809 +  334.0612431*t, //火
  0.5995465 +   52.9690965*t, //木
  0.8740168 +   21.3299095*t, //土
  5.4812939 +    7.4781599*t, //天
  5.3118863 +    3.8133036*t, //海
  3.8103444 + 8399.6847337*t, //月 L'
  5.1984667 + 7771.3771486*t, //月 D
  2.3555559 + 8328.6914289*t, //月 M'
  1.6279052 + 8433.4661601*t  //月 F
 );
 var i,k, c, S,C, Tn=1;
 var v = new Array(0,0,0), F=evTab;
 for(i=0;i<39;i++){
   if(i>=36) Tn = t;
   k = i*12;
   c = F[k]*J[F[k+1]] + F[k+2]*J[F[k+3]] + F[k+4]*J[F[k+5]];
   S = sin(c), C = cos(c);
   v[0] += ( F[k+6]*S + F[k+7]*C ) * Tn;
   v[1] += ( F[k+8]*S + F[k+9]*C ) * Tn;
   v[2] += ( F[k+10]*S+ F[k+11]*C )* Tn;
 }
 v[0]*=0.00036525, v[1]*=0.00036525, v[2]*=0.00036525;
 return v;
}

var epTab = new Array(
 999829, 1.753486, 6283.07585,999892, 0.182659, 6283.07585,
   8353, 1.710345,12566.1517,  24427, 3.141593,    0,
   5611, 0,           0,        8353, 0.139529,12566.1517,
    105, 1.667226,18849.22755,   105, 0.096417,18849.22755,

 31, 0.668752,83996.8473181, 31, 5.381141,83996.8473181,
 26, 0.583102,  529.6909651, 26, 5.30104,   529.6909651,
 21, 1.092352, 1577.3435424, 21, 2.662535, 1577.3435424,
 17, 0.495402, 6279.5527316, 17, 5.207804, 6279.5527316,
 17, 6.153155, 6286.5989683, 17, 4.582329, 6286.5989683,
 14, 3.472728, 2352.8661538, 14, 1.900682, 2352.8661538,
 11, 3.689848, 5223.6939198, 11, 5.273134, 5223.6939198,
  9, 6.073899,12036.4607349,  9, 4.503012,12036.4607349,
  9, 3.17572, 10213.2855462,  9, 1.605633,10213.2855462,
  6, 2.15262,  1059.3819302,  6, 0.581422, 1059.3819302,
  7, 1.30699,  5753.3848849,  7, 2.807289,  398.1490034,
  7, 4.355002,  398.1490034,  6, 6.029239, 5753.3848849,
  7, 2.218215, 4705.7323075,  7, 0.647296, 4705.7323075,
  6, 5.384792, 6812.7668151,  6, 3.813815, 6812.7668151,
  5, 6.087683, 5884.9268466,  5, 4.527856, 5884.9268466,
  5, 1.279337, 6256.7775302,  5, 5.991672, 6256.7775302,

  -5196635/1048, 0.599451, 529.6909651,  -5195200/1048, 5.312032, 529.6909651, //木星
  -9516383/3504, 0.874414, 213.2990954,  -9529869/3504, 5.586006, 213.2990954, //土星
 -30058900/19434,5.312113,  38.1330356, -30060560/19434,3.740863,  38.1330356, //海王
 -19173710/22927,5.481334,  74.7815986, -19165180/22927,3.910457,  74.7815986  //天王

);
function epSSB(t){ //地心SSB坐标,t儒略世纪数,4位有效数字
 t/=10;
 var i, x=0, y=0, z=0, E, p=epTab;
 for(i=0;i<epTab.length;i+=6){
  x += p[i+0] * cos( p[i+1] + p[i+2]*t );
  y += p[i+3] * cos( p[i+4] + p[i+5]*t );
 }
 x += t*(1234 + 515*cos(6.002663+12566.1517*t) + 13*cos(5.959431+18849.22755*t) + 11*cos(2.015542+6283.07585*t) );
 y += t*( 930 + 515*cos(4.431805+12566.1517*t) + 13*cos(4.388605+18849.22755*t) );
 z += t*(  54 +2278*cos(3.413725+6283.07585*t) + 19*cos(3.370613+12566.15170*t) );
 x/=1000000, y/=1000000, z/=1000000;

 var E = -84381.448/rad;
 return new Array( x, z*sin(E)+y*cos(E), z*cos(E)-y*sin(E) );
}
//=================================引力偏转=========================================
//==================================================================================
function ylpz(z,a){ //引力偏转,z天体赤道坐标,a太阳赤道坐标
 var r = new Array(z[0],z[1],z[2]);
 var d = z[0]-a[0];
 var D = sin(z[1])*sin(a[1]) + cos(z[1])*cos(a[1])*cos(d); //角度差的余弦
 D = 0.00407 * ( 1/(1-D) + D/2 ) / rad;
 r[0] += D * ( cos(a[1]) * sin(d) / cos(z[1]) );
 r[1] += D * ( sin(z[1]) * cos(a[1])*cos(d) - sin(a[1])*cos(z[1]) );
 r[0] = rad2mrad(r[0]);
 return r;
}


//=================================底精度周年光行差=================================
//==================================================================================
/***********
function getGxcConst(t){ //取恒星光行差计算相关的常数
 var t2=t*t, t3=t2*t, t4=t3*t, t5=t4*t, r=new Object();
 r.K=20.49552/rad;        //光行差常数
 r.L= (280.4664567 +36000.76982779*t +0.0003032028*t2 +1/49931000*t3 -1/153000000*t4 -5e-12*t5)/180*Math.PI; //太阳的几何平黄经
 r.p= (102.93735 +1.71946*t +0.00046*t2)/180*Math.PI; //近点
 r.e=0.016708634 -0.000042037*t -0.0000001267*t2;
 return r;
}
function HDzngxc(t,a){ //光行差黄道修正(恒星周年光行差),精度一般
 var r=getGxcConst(t); //取光行差计算的常数或系数
 var dL=r.L-a[0], dP=r.p-a[0];
 var b = new Array();
 b[0] = a[0] - r.K*(cos(dL)-r.e*cos(dP)) / cos(a[1]);
 b[1] = a[1] - r.K*sin(a[1]) * (sin(dL)-r.e*sin(dP));
 b[2] = a[2];
 return b;
}
function CDzngxc(t,a){ //计算周年光行差对赤道坐标的影响值,t儒略世纪数(J2000起算),精度一般
 //先把周日运动看圆周运动
 var r=getGxcConst(t);            //取光行差计算的常数或系数
 var E=prece(t,'E','P03');  //黄赤交角,取0.409也可以,对结果影响不很大
 var sinL=sin(r.L), cosL=cos(r.L);
 var cosE=cos(E), tanE=tan(E);
 var sinR=sin(a[0]),cosR=cos(a[0]);
 var sinD=sin(a[1]),cosD=cos(a[1]);
 var tcss=tanE*cosD-sinR*sinD;
 var b = new Array();
 b[0] = a[0] - r.K*(cosR*cosE*cosL+sinR*sinL)/cosD;  //赤经周年光行差修正值
 b[1] = a[1] - r.K*(cosL*cosE*tcss+cosR*sinD*sinL);  //赤纬的
 //e项修正(考虑非正圆运动的误差)
 var sinp=sin(r.p), cosp=cos(r.p);
 b[0] += r.e*r.K*(cosR*cosE*cosp+sinR*sinp)/cosD;
 b[1] += r.e*r.K*(cosp*cosE*tcss+cosR*sinD*sinp);
 b[2] = a[2];
 return b;
}
***********/

//=================================周年视差或光行差=================================
//==================================================================================
function scGxc(z,v,f){ //严格的恒星视差或光行差改正
 //z为某时刻天体赤道坐标, 球面坐标, z含自行但不含章动和光行差
 //v为同是刻地球赤道坐标, 直角坐标
 //f=0 进行光行差改正, v须为SSB速度, 本函数返回z+v向量(z向径为光速)
 //f=1 做周年视差改正, v须为SSB位置, 本函数返回z-v向量(z向径为距离)
 //z和v应统一使用J2000赤道坐标系

 var r = new Array(z[0],z[1],z[2]);
 var c = cs_GS/cs_AU*86400*36525; //光速,AU每儒略世纪
 if(f) c = -z[2]; //求视差

 var sinJ = sin(z[0]), cosJ = cos(z[0]);
 var sinW = sin(z[1]), cosW = cos(z[1]);
 r[0] += rad2mrad( ( v[1]*cosJ - v[0]*sinJ ) / cosW / c );
 r[1] += ( v[2]*cosW - ( v[0]*cosJ + v[1]*sinJ ) * sinW ) / c;
 return r;
}



//=================================太阳J2000球面坐标================================
//==================================================================================
function sun2000(t,n){
 var a = e_coord(t,n,n,n);
 a[0]+=Math.PI, a[1]=-a[1]; //太阳Date黄道坐标
 a = HDllr_D2J(t,a,'P03');  //转到J2000坐标
 return a;
}

//=================================恒星星历计算=====================================
//==================================================================================

var xz88= //88星座表。结构：汉语+缩写,面积(平方度),赤经 (时分),赤纬(度分),象限角 族 星座英文名
 '仙女座And, 722.278, 0 48.46, 37 25.91,NQ1 英仙 Andromeda,' //01
+'唧筒座Ant, 238.901,10 16.43,-32 29.01,SQ2 拉卡伊 Antlia,'
+'天燕座APS, 206.327,16 08.65,-75 18.00,SQ3 拜耳 Apus,'
+'宝瓶座Aqr, 979.854,22 17.38,-10 47.35,SQ4 黄道 Aquarius,'
+'天鹰座Aql, 652.473,19 40.02,  3 24.65,NQ4 武仙 Aquila,'
+'天坛座Ara, 237.057,17 22.49,-56 35.30,SQ3 武仙 Ara,'
+'白羊座Ari, 441.395, 2 38.16, 20 47.54,NQ1 黄道 Aries,'
+'御夫座Aur, 657.438, 6 04.42, 42 01.68,NQ2 英仙 Auriga,'
+'牧夫座Boo, 906.831,14 42.64, 31 12.16,NQ3 大熊 Bootes,'
+'雕具座Cae, 124.865, 4 42.27,-37 52.90,SQ1 拉卡伊 Caelum,'   //10
+'鹿豹座Cam, 756.828, 8 51.37, 69 22.89,NQ2 大熊 Camelopardalis,'
+'巨蟹座Cnc, 505.872, 8 38.96, 19 48.35,NQ2 黄道 Cancer,'
+'猎犬座CVn, 465.194,13 06.96, 40 06.11,NQ3 大熊 Canes Venatici,'
+'大犬座CMa, 380.118, 6 49.74,-22 08.42,SQ2 猎户 Canis Major,'
+'小犬座CMi, 183.367, 7 39.17,  6 25.63,NQ2 猎户 Canis Minor,'
+'摩羯座CAP, 413.947,21 02.93,-18 01.39,SQ4 黄道 Capricornus,'
+'船底座Car, 494.184, 8 41.70,-63 13.16,SQ2 幻之水 Carina,'
+'仙后座Cas, 598.407, 1 19.16, 62 11.04,NQ1 英仙 Cassiopeia,'
+'半人马Cen,1060.422,13 04.27,-47 20.72,SQ3 武仙 Centaurus,'
+'仙王座Cep, 587.787,22 00.00, 71 00.51,NQ4 英仙 Cepheus,'  //20
+'鲸鱼座Cet,1231.411, 1 40.10, -7 10.76,SQ1 英仙 Cetus,'
+'堰蜒座Cha, 131.592,10 41.53,-79 12.30,SQ2 拜耳 Chamaeleon,'
+'圆规座Cir,  93.353,14 34.54,-63 01.82,SQ3 拉卡伊 Circinus,'
+'天鸽座Col, 270.184, 5 51.76,-35 05.67,SQ1 幻之水 Columba,'
+'后发座Com, 386.475,12 47.27, 23 18.34,NQ3 大熊 Coma Berenices,'
+'南冕座CrA, 127.696,18 38.79,-41 08.85,SQ4 武仙 Corona Australis,'
+'北冕座CrB, 178.710,15 50.59, 32 37.49,NQ3 大熊 Corona Borealis,'
+'乌鸦座Crv, 183.801,12 26.52,-18 26.20,SQ3 武仙 Corvus,'
+'巨爵座Crt, 282.398,11 23.75,-15 55.74,SQ2 武仙 Crater,'
+'南十字Cru,  68.447,12 26.99,-60 11.19,SQ3 武仙 Crux,'   //30
+'天鹅座Cyg, 803.983,20 35.28, 44 32.70,NQ4 武仙 Cygnus,'
+'海豚座Del, 188.549,20 41.61, 11 40.26,NQ4 幻之水 Delphinus,'
+'剑鱼座Dor, 179.173, 5 14.51,-59 23.22,SQ1 拜耳 Dorado,'
+'天龙座Dra,1082.952,15 08.64, 67 00.40,NQ3 大熊 Draco,'
+'小马座Equ,  71.641,21 11.26,  7 45.49,NQ4 幻之水 Equuleus,'
+'波江座Eri,1137.919, 3 18.02,-28 45.37,SQ1 幻之水 Eridanus,'
+'天炉座For, 397.502, 2 47.88,-31 38.07,SQ1 拉卡伊 Fornax,'
+'双子座Gem, 513.761, 7 04.24, 22 36.01,NQ2 黄道 Gemini,'
+'天鹤座Gru, 365.513,22 27.39,-46 21.11,SQ4 拜耳 Grus,'
+'武仙座Her,1225.148,17 23.16, 27 29.93,NQ3 武仙 Hercules,' //40
+'时钟座Hor, 248.885, 3 16.56,-53 20.18,SQ1 拉卡伊 Horologium,'
+'长蛇座Hya,1302.844,11 36.73,-14 31.91,SQ2 武仙 Hydra,'
+'水蛇座Hyi, 243.035, 2 20.65,-69 57.39,SQ1 拜耳 Hydrus,'
+'印第安Ind, 294.006,21 58.33,-59 42.40,SQ4 拜耳 Indus,'
+'蝎虎座Lac, 200.688,22 27.68, 46 02.51,NQ4 英仙 Lacerta,'
+'狮子座Leo, 946.964,10 40.03, 13 08.32,NQ2 黄道 Leo,'
+'小狮座LMi, 231.956,10 14.72, 32 08.08,NQ2 大熊 Leo Minor,'
+'天兔座Lep, 290.291, 5 33.95,-19 02.78,SQ1 猎户 Lepus,'
+'天秤座Lib, 538.052,15 11.96,-15 14.08,SQ3 黄道 Libra,'
+'豺狼座Lup, 333.683,15 13.21,-42 42.53,SQ3 武仙 Lupus,'  //50
+'天猫座Lyn, 545.386, 7 59.53, 47 28.00,NQ2 大熊 Lynx,'
+'天琴座Lyr, 286.476,18 51.17, 36 41.36,NQ4 武仙 Lyra,'
+'山案座Men, 153.484, 5 24.90,-77 30.24,SQ1 拉卡伊 Mensa,'
+'显微镜Mic, 209.513,20 57.88,-36 16.49,SQ4 拉卡伊 Microscopium,'
+'麒麟座Mon, 481.569, 7 03.63,  0 16.93,NQ2 猎户 Monoceros,'
+'苍蝇座Mus, 138.355,12 35.28,-70 09.66,SQ3 拜耳 Musca,'
+'矩尺座Nor, 165.290,15 54.18,-51 21.09,SQ3 拉卡伊 Norma,'
+'南极座Oct, 291.045,23 00.00,-82 09.12,SQ4 拉卡伊 Octans,'
+'蛇夫座Oph, 948.340,17 23.69, -7 54.74,SQ3 武仙 Ophiuchus,'
+'猎户座Ori, 594.120, 5 34.59,  5 56.94,NQ1 猎户 Orion,' //60
+'孔雀座Pav, 377.666,19 36.71,-65 46.89,SQ4 拜耳 Pavo,'
+'飞马座Peg,1120.794,22 41.84, 19 27.98,NQ4 英仙 Pegasus,'
+'英仙座Per, 614.997, 3 10.50, 45 00.79,NQ1 英仙 Perseus,'
+'凤凰座Phe, 469.319, 0 55.91,-48 34.84,SQ1 拜耳 Phoenix,'
+'绘架座Pic, 246.739, 5 42.46,-53 28.45,SQ1 拉卡伊 Pictor,'
+'双鱼座Psc, 889.417, 0 28.97, 13 41.23,NQ1 黄道 Pisces,'
+'南鱼座PsA, 245.375,22 17.07,-30 38.53,SQ4 幻之水 Piscis Austrinus,'
+'船尾座Pup, 673.434, 7 15.48,-31 10.64,SQ2 幻之水 Puppis,'
+'罗盘座Pyx, 220.833, 8 57.16,-27 21.10,SQ2 幻之水 Pyxis,'
+'网罟座Ret, 113.936, 3 55.27,-59 59.85,SQ1 拉卡伊 Reticulum,' //70
+'天箭座Sge,  79.932,19 39.05, 18 51.68,NQ4 武仙 Sagitta,'
+'人马座Sgr, 867.432,19 05.94,-28 28.61,SQ4 黄道 Sagittarius,'
+'天蝎座Sco, 496.783,16 53.24,-27 01.89,SQ3 黄道 Scorpius,'
+'玉夫座Scl, 474.764, 0 26.28,-32 05.30,SQ1 拉卡伊 Sculptor,'
+'盾牌座Sct, 109.114,18 40.39, -9 53.32,SQ4 武仙 Scutum,'
+'巨蛇座Ser, 636.928,16 57.04,  6 07.32,NQ3 武仙 Serpens,'
+'六分仪Sex, 313.515,10 16.29, -2 36.88,SQ2 武仙 Sextans,'
+'金牛座Tau, 797.249, 4 42.13, 14 52.63,NQ1 黄道 Taurus,'
+'望远镜Tel, 251.512,19 19.54,-51 02.21,SQ4 拉卡伊 Telescopium,'
+'三角座Tri, 131.847, 2 11.07, 31 28.56,NQ1 英仙 Triangulum,'  //80
+'南三角TrA, 109.978,16 04.95,-65 23.28,SQ3 武仙 Triangulum Australe,'
+'杜鹃座Tuc, 294.557,23 46.64,-65 49.80,SQ4 拜耳 Tucana,'
+'大熊座UMa,1279.660,11 18.76, 50 43.27,NQ2 大熊 Ursa Major,'
+'小熊座UMi, 255.864,15 00.00, 77 41.99,NQ3 大熊 Ursa Minor,'
+'船帆座Vel, 499.649, 9 34.64,-47 10.03,SQ2 幻之水 Vela,'
+'室女座Vir,1294.428,13 24.39, -4 09.51,SQ3 黄道 Virgo,'
+'飞鱼座Vol, 141.354, 7 47.73,-69 48.07,SQ2 拜耳 Volans,'
+'狐狸座Vul, 268.165,20 13.88, 24 26.56,NQ4 武仙 Vulpecula';
xz88 = xz88.split(',');


var HXK = new Array( //恒星库
  // RA(时分秒)   DEC(度分秒)   自行1  自行2  视差  星等  星名  星座#

 '库0#* 0 01 57.620,- 6 00 50.68, 0.0031, -0.041, 0.008, 4.37 ,星1630 ,Psc 30 M3#* 0 03 44.391,-17 20 09.58, 0.0020, -0.007, 0.014, 4.55 ,星905  ,Cet 2  B9#* 0 05 20.142,- 5 42 27.45,-0.0009,  0.089, 0.025, 4.61 ,星1002 ,Psc 33 K1#* 0 08 23.260, 29 05 25.54, 0.0104, -0.163, 0.034, 2.07 ,星1    ,And α B9#* 0 09 10.686, 59 08 59.19, 0.0681, -0.180, 0.060, 2.28 ,星2    ,Cas β F2#* 0 10 19.247, 46 04 20.17, 0.0005,  0.001, 0.003, 5.01 ,星4    ,And 22 F2#* 0 11 34.421,-27 47 59.06, 0.0003,  0.016, 0.006, 5.41 ,星5    ,Scl κ2 K2#* 0 11 44.010,-35 07 59.24, 0.0138,  0.115, 0.046, 5.24 ,星6    ,Scl θ F3#* 0 13 14.154, 15 11 00.93, 0.0003, -0.008, 0.010, 2.83 ,星7    ,Peg γ B2#* 0 14 36.165, 20 12 24.12, 0.0064, -0.001, 0.010, 4.79 ,星1004 ,Peg χ M2#'
   + '* 0 17 05.500, 38 40 53.87,-0.0046, -0.013, 0.013, 4.61 ,N30    ,And θ A2#* 0 18 19.658, 36 47 06.79,-0.0055, -0.042, 0.023, 4.51 ,星1005 ,And σ A2#* 0 18 38.258, 31 31 02.01, 0.0044, -0.004, 0.006, 5.88 ,星1006 ,Pi 0h38 A0#* 0 19 25.676,- 8 49 26.14,-0.0010, -0.037, 0.011, 3.56 ,星9    ,Cet ι K2#* 0 20 35.863,  8 11 24.96,-0.0003,  0.010, 0.008, 5.38 ,星1008 ,Psc 41 K3#* 0 21 07.270, 37 58 06.95, 0.0049, -0.039, 0.020, 5.16 ,星1009 ,And ρ F5#* 0 24 47.506, 61 49 51.80, 0.0018, -0.002, 0.004, 5.38 ,GC     ,Cas 12 B9#* 0 25 24.210,  1 56 22.87,-0.0010, -0.013, 0.006, 5.77 ,星1010 ,Psc 44 G5#* 0 25 45.092,-77 15 15.30, 0.6689,  0.323, 0.134, 2.82 ,星11   ,Hyi β G2#* 0 26 17.052,-42 18 21.55, 0.0210, -0.354, 0.042, 2.40 ,星12   ,Phe α K0#',
 '库1#'
 + '* 0 48 22.978,  5 16 50.19,  0.0507,-1.141,0.134, 5.74,星1019,G.Psc 96 K2#'
 + '* 0 26 17.052,-42 18 21.55,  0.0210,-0.354,0.042, 2.40,星12  ,Phe α   K0#'
 + '* 2 36 00.049,- 7 49 53.77, -0.0022,-0.060,0.006, 5.53,星1074,Cet 80   M0#'
 + '* 2 35 52.472,  5 35 35.67, -0.0019,-0.024,0.009, 4.87,星1072,Cet υ   G8#'

 + '*18 36 27.834,  9 07 20.98, -0.0001,-0.132,0.026, 5.38,星1484,Oph 9  F5#'
 + '*18 36 56.338, 38 47 01.29,  0.0172, 0.288,0.129, 0.03,星699, Lyr α A0#'
 + '*18 37 54.426,-21 23 51.81, -0.0001,-0.066,0.010, 5.93,星1485,Sgr 83 A5#'
 + '*18 42 16.428,- 9 03 09.14,  0.0005,-0.002,0.017, 4.70,星1486,Sct δ F2#'
 + '*18 43 31.254,- 8 16 30.76,  0.0013, 0.008,0.006, 4.88,星702, Sct ε G8#'

);

function schHXK(key){ //星库检索
 var i, s, n0,n1,n2,n3, r='';
 for(i=0;i<HXK.length;i++){ //遍历所有子库
   s = HXK[i];
   n0 = n1 = s.indexOf('#'); //记录开始位置
   while(1){
    n1 = s.indexOf(key,n1+1);     if(n1==-1) break; //按key查找
    n2 = s.indexOf('#',n1);     if(n3==-1) n2 = s.length; //该记录的结束位置
    n3 = s.lastIndexOf('#',n1); if(n2==-1) n3 = n0;       //该记录的开始位置
    r += s.substr(n3,n2-n3);
   }
 }
 for(i=0;i<xz88.length;i+=5){ //提取星座中心位置
  if(xz88[i].substr(3,3)==key){
    var a=xz88[i+2], b=xz88[i+3];
    a = a.substr(0,5) +' '+ (a.substr(6,2)*0.6).toFixed(1);
    b = b.substr(0,6) +' '+ (b.substr(7,2)*0.6).toFixed(1);
    r = '#*'+a+','+b+',0,0,0,0.0,中心'+xz88[i+1]+'方,'+xz88[i+4]+ r;
    break;
  }
 }
 return r;
}

function getHXK(s,all){ //提取并格式化恒星库(把度分秒、角分秒转为弧度),all=1表示全部取出
 var i,k,  r=new Array();
 s = s.replace(/\r\n/g, '#');       //把换行符号看作#号
 var sn = s.indexOf('#')+1;
 s = s.substr(sn, s.length - sn);   //去除第1行
 s = s.replace(/\#+/g, ',');        //把#号看作逗号
 s = s.replace(/, +/g,',');         //去除逗号后的空格
 s = s.split(',');
 for(i=0,k=0;i<s.length;i+=8){
  if(!s[i] || s[i].length<5) continue;
  if(s[i].substr(0,1)!='*'&&!all) continue;
  s[i] = s[i].substr(1,s[i].length-1);  //去除星号
  r[k++] = str2rad(s[i+0],1); //赤经
  r[k++] = str2rad(s[i+1],0); //赤纬
  r[k++] = s[i+2]/rad*15;  //赤经世纪自行
  r[k++] = s[i+3]/rad;     //赤纬纪纪自行
  r[k++] = s[i+4]/rad;     //视差
  r[k++] = s[i+5];         //星等
  r[k++] = s[i+6];         //星座等信息
  r[k++] = s[i+7];         //星座光谱
 }
 return r;
}


function hxCalc(t, F, Q, lx, L, fa){ //多颗同时计算,t儒略世纪TD,只算章动周期在于Q天(为0不限制)
 var i, z = new Array(), s = '';
 var d,E,v,p,a, s0;
 var gstP, gst;


 if(lx==0) s0 = '视赤经 视赤纬';
 if(lx==1) s0 = '站心坐标';
 if(lx==2) s0 = '平赤经 平赤纬';

 if(lx==0||lx==1){
  d = nutation(t,Q); //章动
  E = hcjj(t);  //黄赤交角
  v = evSSB(t); //地球SSB直角速度(光行差使用的)
  p = epSSB(t); //地球SSB直角位置(视差修正使用的)
  a = sun2000(t,20); //太阳J2000球面坐标(引力偏转用的)
  a = llrConv(a,84381.406/rad); //太阳赤道坐标
  gstP = pGST2(t*36525); //平恒星时
  gst  = gstP + d[0]*Math.cos(E); //真恒星时
 }
 for(i=0;i<F.length;i+=8){
  s += F[i+6] + ' ' + F[i+7] +' '+  F[i+5] + ' ';

  z[0] = F[i+0]+F[i+2]*t*100; //J2000赤经含自行
  z[1] = F[i+1]+F[i+3]*t*100; //J2000赤纬含自行
  z[2] = 1/F[i+4];
  z[0] = rad2mrad(z[0]);
  if(!z[2]) z[2] = 1e11;

  if(lx==0||lx==1){
   z = ylpz(z,a);    //引力偏转修正
   z = scGxc(z,p,1); //周年视差修正
   z = scGxc(z,v,0); //光行差修正
   z = CDllr_J2D(t,z,'P03'); //转到当日赤道(岁差修正)
   z = CDnutation(z,E,d[0],d[1]); //章动修正
   if(lx==1){ //站心坐标
    var sj = rad2rrad(gst + L - z[0]); //得到此刻天体时角
    z[0] += Math.PI/2 - gst - L;       //转到相对于地平赤道分点的赤道坐标
    z = llrConv( z, Math.PI/2-fa );    //恒星地平坐标
    z[0] = rad2mrad( Math.PI/2-z[0] ); //方位角,高度角
    if(z[1]>0) z[1] += MQC(z[1]);      //大气折射修正
   }
  }
  if(lx==2){
   z = CDllr_J2D(t,z,'P03'); //转到当日赤道(岁差修正)
  }
  if(lx==0||lx==2) s += rad2strE(z[0],1,3) + ' ' + rad2strE(z[1],0,2) + '\r\n';  //视位置或平位置
  else             s += rad2strE(z[0],0,2) + ' ' + rad2strE(z[1],0,2) + '\r\n';
 }
 return JD.JD2str(t*36525+J2000)+' TD ' + s0 + '\r\n' + s+'\r\n';
}

