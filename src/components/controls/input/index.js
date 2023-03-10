import Input from './index.styles';

function InputField({ type = "search", name = "search", value="", onChange }) {
  return (
    <div className="input-field">
        <Input type={type} name={name} onChange={(e) => onChange(e)} value={value}/>
    </div>
  );
}

export default InputField;
