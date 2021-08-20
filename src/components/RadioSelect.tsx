import { InputSelection } from "../utils/types";
import Radio from "./Radio";

const RadioSelect = ({ selections }: { selections: InputSelection[] }) => {
    return (
        <>{selections.map((selection, i: number) => (
            <div className="radio-select" key={i}>
                <label className="b-contain">
                    <span>{selection.title}</span>
                    <Radio
                        name={selection.name}
                        type="radio"
                        value={selection.value}
                    />
                    <div className="b-input radio"></div>
                </label>
            </div>
        ))}
        </>
    )
}

export default RadioSelect;