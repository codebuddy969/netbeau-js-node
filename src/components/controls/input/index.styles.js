import styled from '@emotion/styled';

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid gray;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.3);
  }
`;

export default Input;