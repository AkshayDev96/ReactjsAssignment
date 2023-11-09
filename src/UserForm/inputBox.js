import React from 'react'
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from 'primereact/radiobutton';


//This compo is for types of input fields
const InputBox = (props) => {
    var maxBirthdayDate = new Date();
    maxBirthdayDate.setFullYear( maxBirthdayDate.getFullYear() - 18 );
    maxBirthdayDate.setMonth(11,31);

    const type = props.type
    if(type==='text'){
        return (
          <InputText style={{width:'100%'}} {...props} />
        )
    }else if(type==='radio'){
        return (
          <RadioButton style={{width:'100%'}} {...props} />
        )
    }else if(type==='phone'){
        return <InputMask mode='decimal' mask="9999999999" style={{width:'100%'}} {...props}  />
    }else if(type==='date'){
        return <Calendar maxDate={new Date(maxBirthdayDate)} style={{width:'100%'}} dateFormat='dd/mm/yy' {...props}  />
    }else if(type==='email'){
        return <InputText style={{width:'100%'}} {...props} />
    }else{
        return <></>
    }
}

export default InputBox