import React from "react";
import "./style.css";
async function getData() {
  const res = await fetch('https://reqres.in/api/users?page=2')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <div className="bg-[#f7f8fd] flex flex-row justify-center w-full">
      <div className="bg-[#f7f8fd] w-[1440px] h-[919px] relative">
        <div className="absolute w-[825px] h-[72px] top-[94px] left-[450px]">
          <div className="relative w-[827px] h-[74px] -top-px -left-px bg-[#373f68] rounded-[10px]">
            <div className="absolute w-[160px] h-[20px] top-[27px] left-[219px]">
              <p className="absolute -top-px left-0 [font-family:'Jost-Regular',Helvetica] font-normal text-[#f2f4fe] text-[14px] tracking-[0] leading-[normal]">
                <span className="[font-family:'Jost-Regular',Helvetica] font-normal text-[#f2f4fe] text-[14px] tracking-[0]">
                  Sort by :{" "}
                </span>
                <span className="[font-family:'Jost-Bold',Helvetica] font-bold">Most Upvotes</span>
              </p>
              <img className="absolute w-[9px] h-[6px] top-[9px] left-[151px]" alt="Path" src="path-2.svg" />
            </div>
            <div className="absolute w-[156px] h-[26px] top-[24px] left-[25px]">
              <div className="absolute -top-px left-[39px] [font-family:'Jost-Bold',Helvetica] font-bold text-white text-[18px] tracking-[-0.25px] leading-[normal]">
                0 Suggestions
              </div>
              <img className="absolute w-[23px] h-[24px] top-px left-0" alt="Bulb" src="bulb-2.svg" />
            </div>
            <div className="absolute w-[158px] h-[44px] top-[15px] left-[652px] overflow-hidden">
              <div className="relative w-[160px] h-[46px] -top-px -left-px bg-[#ad1fea] rounded-[10px]">
                <div className="absolute top-[12px] left-[25px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#f2f4fe] text-[14px] tracking-[0] leading-[normal]">
                <a href="/feedback-new">  + Add Feedback</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[827px] h-[602px] top-[189px] left-[449px] bg-white rounded-[10px]">
          <div className="relative w-[410px] h-[379px] top-[112px] left-[210px]">
            <div className="absolute w-[410px] h-[189px] top-[190px] left-0">
              <p className="absolute -top-px left-[65px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#3a4374] text-[24px] text-center tracking-[-0.33px] leading-[normal]">
                There is no feedback yet.
              </p>
              <p className="absolute w-[410px] top-[50px] left-0 [font-family:'Jost-Regular',Helvetica] font-normal text-[#647196] text-[16px] text-center tracking-[0] leading-[normal]">
                Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our
                app.
              </p>
              <div className="absolute w-[158px] h-[44px] top-[145px] left-[124px] overflow-hidden">
                <div className="relative w-[160px] h-[46px] -top-px -left-px bg-[#ad1fea] rounded-[10px]">
                  <div className="absolute top-[12px] left-[25px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#f2f4fe] text-[14px] tracking-[0] leading-[normal]">
                  <a href="/feedback-new">  + Add Feedback</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-[130px] h-[137px] top-0 left-[140px] opacity-50">
              <div className="relative h-[137px]">
                <img className="absolute w-[107px] h-[107px] top-[19px] left-[9px]" alt="Path" src="path.svg" />
                <div className="absolute w-[5px] h-[7px] top-[52px] left-[87px] bg-[#231f20] rounded-[2.44px/3.62px]" />
                <img className="absolute w-[124px] h-[57px] top-0 left-0" alt="Path" src="image.svg" />
                <img className="absolute w-[103px] h-[33px] top-[98px] left-[12px]" alt="Path" src="path-3.svg" />
                <img className="absolute w-[9px] h-[24px] top-[82px] left-[104px]" alt="Path" src="path-4.svg" />
                <img className="absolute w-[10px] h-[25px] top-[82px] left-[104px]" alt="Shape" src="shape.svg" />
                <div className="absolute w-[9px] h-[21px] top-[64px] left-[101px] bg-white rotate-[-7.88deg]" />
                <img className="absolute w-[13px] h-[23px] top-[63px] left-[99px]" alt="Shape" src="shape-2.svg" />
                <div className="absolute w-[9px] h-[36px] top-[99px] left-[107px] bg-white rounded-[3.25px] rotate-[-7.88deg]" />
                <img className="absolute w-[14px] h-[37px] top-[98px] left-[105px]" alt="Shape" src="shape-3.svg" />
                <div className="absolute w-[49px] h-[49px] top-[34px] left-[79px] bg-white rounded-[24.39px]" />
                <img className="absolute w-[50px] h-[50px] top-[34px] left-[79px]" alt="Shape" src="shape-4.svg" />
                <div className="absolute w-[40px] h-[40px] top-[39px] left-[84px] bg-white rounded-[19.81px]" />
                <img className="absolute w-[41px] h-[41px] top-[38px] left-[83px]" alt="Shape" src="shape-5.svg" />
                <img className="absolute w-[33px] h-[29px] top-[107px] left-[96px]" alt="Path" src="path-5.svg" />
                <img className="absolute w-[34px] h-[30px] top-[107px] left-[95px]" alt="Shape" src="shape-6.svg" />
                <img className="absolute w-[11px] h-[19px] top-[59px] left-[67px]" alt="Path" src="path-6.svg" />
                <img className="absolute w-[12px] h-[20px] top-[59px] left-[67px]" alt="Path" src="path-7.svg" />
                <div className="absolute w-[9px] h-[15px] top-[50px] left-[100px] bg-[#c0c4dc] rounded-[4.49px/7.64px]" />
                <div className="absolute w-[7px] h-[12px] top-[52px] left-[46px] bg-[#3a4374] rounded-[3.42px/6.18px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-[255px] h-[529px] top-[94px] left-[165px]">
          <div className="absolute w-[255px] h-[166px] top-[161px] left-0">
            <div className="relative w-[257px] h-[168px] -top-px -left-px bg-white rounded-[10px]">
              <div className="relative w-[181px] h-[118px] top-[25px] left-[25px]">
                <div className="absolute w-[111px] h-[30px] top-[44px] left-0 overflow-hidden">
                  <div className="w-[113px] relative h-[32px] -top-px -left-px bg-[#f2f4ff] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal]">
                      Enhancement
                    </div>
                  </div>
                </div>
                <div className="absolute w-[48px] h-[30px] top-0 left-0 overflow-hidden">
                  <div className="relative w-[50px] h-[32px] -top-px -left-px bg-[#4661e6] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-white text-[13px] tracking-[0] leading-[normal]">
                      All
                    </div>
                  </div>
                </div>
                <div className="w-[48px] top-0 left-[56px] absolute h-[30px] overflow-hidden">
                  <div className="w-[50px] relative h-[32px] -top-px -left-px bg-[#f2f4ff] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal]">
                      UI
                    </div>
                  </div>
                </div>
                <div className="w-[48px] top-0 left-[112px] absolute h-[30px] overflow-hidden">
                  <div className="w-[50px] relative h-[32px] -top-px -left-px bg-[#f2f4ff] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal]">
                      UX
                    </div>
                  </div>
                </div>
                <div className="w-[77px] top-[88px] left-0 absolute h-[30px] overflow-hidden">
                  <div className="relative w-[79px] h-[32px] -top-px -left-px bg-[#f2f4ff] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal]">
                      Feature
                    </div>
                  </div>
                </div>
                <div className="w-[56px] top-[44px] left-[125px] absolute h-[30px] overflow-hidden">
                  <div className="relative w-[58px] h-[32px] -top-px -left-px bg-[#f2f4ff] rounded-[10px]">
                    <div className="absolute top-[5px] left-[17px] [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal]">
                      Bug
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[255px] h-[178px] top-[351px] left-0">
            <div className="relative w-[257px] h-[180px] -top-px -left-px bg-white rounded-[10px]">
              <div className="absolute w-[207px] h-[26px] top-[20px] left-[25px]">
                <div className="absolute -top-px left-0 [font-family:'Jost-Bold',Helvetica] font-bold text-[#3a4374] text-[18px] tracking-[-0.25px] leading-[normal]">
                  Roadmap
                </div>
                <div className="absolute top-[3px] left-[177px] opacity-25 [font-family:'Jost-SemiBold',Helvetica] font-semibold text-[#4661e6] text-[13px] tracking-[0] leading-[normal] underline">
                <a href="/roadMap"> View</a>
                </div>
              </div>
              <div className="absolute w-[207px] h-[23px] top-[70px] left-[25px] overflow-hidden">
                <div className="absolute -top-px left-[24px] [font-family:'Jost-Regular',Helvetica] font-normal text-[#647196] text-[16px] tracking-[0] leading-[normal]">
                  Planned
                </div>
                <div className="absolute -top-px left-[196px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#647196] text-[16px] text-right tracking-[0] leading-[normal]">
                  0
                </div>
                <div className="absolute w-[10px] h-[10px] top-[6px] -left-px bg-[#f49f85] rounded-[5px]" />
              </div>
              <div className="absolute w-[207px] h-[23px] top-[101px] left-[25px] overflow-hidden">
                <div className="absolute -top-px left-[24px] [font-family:'Jost-Regular',Helvetica] font-normal text-[#647196] text-[16px] tracking-[0] leading-[normal]">
                  In-Progress
                </div>
                <div className="absolute -top-px left-[196px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#647196] text-[16px] text-right tracking-[0] leading-[normal]">
                  0
                </div>
                <div className="absolute w-[10px] h-[10px] top-[6px] -left-px bg-[#ad1fea] rounded-[5px]" />
              </div>
              <div className="absolute w-[207px] h-[23px] top-[132px] left-[25px] overflow-hidden">
                <div className="absolute -top-px left-[24px] [font-family:'Jost-Regular',Helvetica] font-normal text-[#647196] text-[16px] tracking-[0] leading-[normal]">
                  Live
                </div>
                <div className="absolute -top-px left-[196px] [font-family:'Jost-Bold',Helvetica] font-bold text-[#647196] text-[16px] text-right tracking-[0] leading-[normal]">
                  0
                </div>
                <div className="absolute w-[10px] h-[10px] top-[6px] -left-px bg-[#62bcfa] rounded-[5px]" />
              </div>
            </div>
          </div>
          <div className="absolute w-[255px] h-[137px] top-0 left-0 bg-[url(/oval.png)] bg-[100%_100%]">
            <div className="relative w-[153px] h-[51px] top-[62px] left-[24px]">
              <div className="absolute -top-px left-0 [font-family:'Jost-Bold',Helvetica] font-bold text-white text-[20px] tracking-[-0.25px] leading-[normal]">
                Eqaim
              </div>
              <div className="absolute top-[28px] left-0 opacity-75 [font-family:'Jost-Medium',Helvetica] font-medium text-white text-[15px] tracking-[0] leading-[normal]">
                Feedback Board
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


