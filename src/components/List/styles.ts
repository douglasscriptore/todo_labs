import styled from 'styled-components';

interface ContainerProps {
  done?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0 15px;
  width: 100%;
  flex: 0 0 320px;
  opacity: ${props => (props.done ? '0.6' : 1)};

  & + div {
    border-left: 1px solid #dfdfdf; /*#bfbfbf*/
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }
    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
    }
  }

  ul {
    margin-top: 30px;
  }
`;
