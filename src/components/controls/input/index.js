import Input from './index.styles';

function InputField({ type = "search", name = "search", value = "", placeholder = "", onChange }) {
  return (
    <div className="input-field">
        <Input type={type} 
               name={name} 
               onChange={(e) => onChange(e)} 
               value={value} 
               placeholder={placeholder}/>
    </div>
  );
}

export default InputField;
