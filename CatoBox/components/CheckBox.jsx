import { CheckBox } from "react-native-check-box";

export function CheckBoxx(){
    return(
        <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>{
            this.setState({
                isChecked:!this.state.isChecked
            })
            }}
            isChecked={this.state.isChecked}
            leftText={"CheckBox"}
        />
    );
}