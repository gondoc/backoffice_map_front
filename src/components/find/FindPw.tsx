const FindPw = (props: { typing: string, setTyping: (typing: string) => void }) => {

    return (
        <div className={"input-area"}>
            <label>가입한 이메일 주소</label>
            <div>
                <input
                    value={props.typing}
                    placeholder="이메일 주소를 입력해주세요"
                    onChange={(e) => props.setTyping(e.target.value)}
                    required
                />
            </div>
        </div>
    )
}

export default FindPw