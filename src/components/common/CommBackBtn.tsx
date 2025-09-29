const CommBackBtn = ({ onClickHandler }: { onClickHandler: () => void }) => {
  return (
    <div className={"back-btn"} onClick={onClickHandler}>
      <i></i>
    </div>
  );
};

export default CommBackBtn;
