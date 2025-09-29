import useUserStore from "@store/userStore";

const Phase = ({ phaseNum }: { phaseNum: number }) => {
  const { joinValid } = useUserStore();

  return (
    <div className={`phase ${joinValid.phase === phaseNum && "active"}`}></div>
  );
};
export default Phase;
