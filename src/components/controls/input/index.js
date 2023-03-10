import Input from './index.styles';

function InputField({ type = "search", name = "search" }) {
  return (
    <div className="input-field">
        <Input type={type} name={name} />
    </div>
  );
}

export default InputField;
