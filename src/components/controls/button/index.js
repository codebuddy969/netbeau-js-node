import StyledButton from './index.styles';

function Button({ children, onClick }) {
  return (
    <div>
        <StyledButton onClick={onClick}>{children}</StyledButton>
    </div>
  );
}

export default Button;