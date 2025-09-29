import useUserStore from "@store/userStore";
import { useEffect } from "react";
import { IValid } from "@type/user.types";
import JoinRowInput from "@component/join/common/JoinRowInput";
import { useUserEmailDupCheck } from "@query/MemberQuery";

const UserEmailTempArea = () => {
  const { joinPayload, setJoinPayload, joinValid, setJoinValid } =
    useUserStore();
  const { refetch: idCheck } = useUserEmailDupCheck(joinPayload.userEmail);

  useEffect(() => {
    if (joinPayload.userEmail) {
      if (validationUserEmail(joinPayload.userEmail)) {
        setJoinValid({
          ...joinValid,
          email: { isValid: true },
        });
      } else {
        const payload: IValid = { isValid: false };
        setJoinValid({
          ...joinValid,
          email: { ...payload, errorMsg: "이메일 주소 형식과 맞지 않습니다." },
        });
      }
    }
  }, [joinPayload.userEmail]);

  const validationUserEmail = (userEmail: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(userEmail);
  };

  return (
    <JoinRowInput
      label={"이메일"}
      type={"email"}
      placeholder={"이메일 주소"}
      required={true}
      errorMsg={
        joinValid.email.errorMsg !== "" && joinValid.email?.errorMsg
          ? joinValid.email.errorMsg
          : ""
      }
      setPayload={(payloadValue) =>
        setJoinPayload({ ...joinPayload, userEmail: payloadValue })
      }
    />
  );
};

export default UserEmailTempArea;
