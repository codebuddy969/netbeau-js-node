import Styled_paragraph from './index.styles';

function Paragraph({ children }) {
  return (
    <div className="paragraph">
        <Styled_paragraph>{children}</Styled_paragraph>
    </div>
  );
}

export default Paragraph;
