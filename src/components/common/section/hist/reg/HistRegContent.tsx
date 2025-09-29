// import styled from "styled-components";
// import {HIST_HELP_MSG} from "@config/constant";
// import {NameArea, NameInput, NameLabel} from "@component/common/section/category/reg/CategoryRegArea";
// import {useHistStore, useHistStoreActions} from "@store/histStore";
// import {useEffect, useState} from "react";
// import {ILabelValue} from "@type/common.types";
// import {useLocationQuery} from "@query/LocationQuery";
// import {ILocation} from "@type/location.types";
// import Select, {components, GroupBase, OptionProps} from 'react-select'
// import {JSX} from "react/jsx-runtime";
// import DatePicker from "react-datepicker";
//
// interface IProps {
//     phase: number,
// }
//
// const HistPhase0 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     return (
//         <>
//             <NameArea>
//                 <NameLabel htmlFor={`HIST_REG_NAME`}>프로젝트 이력명
//                     <NameInput
//                         autoComplete={"off"}
//                         minLength={5}
//                         maxLength={25}
//                         type={"search"}
//                         id={`HIST_REG_NAME`}
//                         value={registerForm.histNm}
//                         onChange={(e) =>
//                             histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})
//                         }
//                     />
//                 </NameLabel>
//             </NameArea>
//             <TypingCntArea $isOver={registerForm.histNm.length > 20}>
//                 {props.phase === 0 && HIST_HELP_MSG[props.phase].label}&nbsp;&nbsp;&nbsp;
//                 <span>{registerForm.histNm.length}</span>/25
//             </TypingCntArea>
//         </>
//     )
// }
//
// const HistPhase1 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     const {data: siteList, isSuccess} = useLocationQuery();
//
//     const [optionList, setOptionList] = useState<ILabelValue[] | null>(null);
//
//     useEffect(() => {
//         console.log("siteList ", siteList);
//         if (isSuccess && siteList && siteList.length > 0) {
//             setOptionList(() => siteList.map((site: ILocation) => {
//                 return {label: site.nm, value: site.id};
//             }))
//         } else {
//             setOptionList(null)
//         }
//     }, [siteList])
//
//     const vhclSearchOptionChangeHandler = (e: ILabelValue) => {
//
//         const clickedId: string = e.value as string;
//         console.log("clickedId ", clickedId);
//         console.log("e , ", e)
//         histStoreActions.setRegisterForm({...registerForm, siteId: clickedId, siteNm: e.label})
//     }
//
//     const Option = (props: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>) => {
//         // const isDefaultOption = customGroupList.find((it: ICustomGroupPayload) => it.groupId === props.data.value);
//
//         return (
//             <StyledCustomOptionArea>
//                 <components.Option {...props}>
//                     <div>{props.children}</div>
//                     <div>
//
//                     </div>
//                 </components.Option>
//             </StyledCustomOptionArea>
//         );
//     };
//
//     return (
//         <NameArea>
//             {/*<NameLabel htmlFor={`HIST_REG_NAME`}>지역명*/}
//             {/*    <NameInput*/}
//             {/*        type={"search"}*/}
//             {/*        id={`HIST_REG_NAME`}*/}
//             {/*        value={registerForm.histNm}*/}
//             {/*        onChange={(e) =>*/}
//             {/*            histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})*/}
//             {/*        }*/}
//             {/*    />*/}
//             {/*</NameLabel>*/}
//
//             지역명
//             <Select
//                 components={{Option: Option}}
//                 options={optionList}
//                 value={{
//                     value: registerForm.siteId,
//                     label: siteList?.find(item => item.id === registerForm.siteId)?.nm
//                 }}
//                 onChange={(e: ILabelValue) => vhclSearchOptionChangeHandler(e)}
//                 defaultValue={{label: "전체", value: ""}}
//             />
//         </NameArea>
//     )
// }
//
// const HistPhase2 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     return (
//         <NameArea>
//             <NameLabel htmlFor={`HIST_REG_NAME`}>분류명
//                 <NameInput
//                     type={"search"}
//                     id={`HIST_REG_NAME`}
//                     value={registerForm.histNm}
//                     onChange={(e) =>
//                         histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})
//                     }
//                 />
//             </NameLabel>
//         </NameArea>
//     )
// }
//
// const HistPhase3 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     return (
//         <NameArea>
//             <NameLabel htmlFor={`HIST_REG_NAME`}>작업 인원 수
//                 <NameInput
//                     type={"search"}
//                     id={`HIST_REG_NAME`}
//                     value={registerForm.histNm}
//                     onChange={(e) =>
//                         histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})
//                     }
//                 />
//             </NameLabel>
//         </NameArea>
//     )
// }
//
// const HistPhase4 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     return (
//         <NameArea>
//             <NameLabel htmlFor={`HIST_REG_NAME`}>date-picker
//                 <DatePicker
//
//                 />
//             </NameLabel>
//         </NameArea>
//     )
// }
//
// const HistPhase5 = (props: { phase: number }) => {
//
//     const registerForm = useHistStore((state) => state.registerForm)
//     const histStoreActions = useHistStoreActions();
//
//     return (
//         <NameArea>
//             <NameLabel htmlFor={`HIST_REG_NAME`}>최종 확인
//                 <NameInput
//                     type={"search"}
//                     id={`HIST_REG_NAME`}
//                     value={registerForm.histNm}
//                     onChange={(e) =>
//                         histStoreActions.setRegisterForm({...registerForm, histNm: e.target.value})
//                     }
//                 />
//             </NameLabel>
//         </NameArea>
//     )
// }
//
// const HistRegContent = ({phase}: IProps) => {
//
//     return (
//         <NameWrapper>
//             {/*{phase >= 0 && <HistPhase0 phase={phase}/>}*/}
//             {/*{phase >= 1 && <HistPhase1 phase={phase}/>}*/}
//             {/*{phase >= 2 && <HistPhase2 phase={phase}/>}*/}
//             {/*{phase >= 3 && <HistPhase3 phase={phase}/>}*/}
//             {/*{phase >= 4 && <HistPhase4 phase={phase}/>}*/}
//             <HistPhase0 phase={phase}/>
//             <HistPhase1 phase={phase}/>
//             <HistPhase2 phase={phase}/>
//             <HistPhase3 phase={phase}/>
//             <HistPhase4 phase={phase}/>
//         </NameWrapper>
//     )
// }
//
// export default HistRegContent
//
//
// const TypingCntArea = styled.div<{ $isOver: boolean }>`
//     display: flex;
//     align-items: center;
//     justify-content: right;
//
//     width: 480px;
//     color: #6c757d;
//     margin-right: 5px;
//
//     span {
//         color: ${(props) => props.$isOver ? "#FBA4A0" : "#6c757d"};
//     }
// `
//
// const StyledCustomOptionArea = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// `
//
// const HelpMsgArea = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 820px;
//     height: 40px;
//     padding: 10px 0;
// `
//
// const NameWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     flex-direction: column;
//     width: 820px;
//     height: 140px;
//     padding: 20px 0;
// `
