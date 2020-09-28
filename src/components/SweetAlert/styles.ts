import styled from 'styled-components';

export const Container = styled.div`
  .btn {
    min-width: 100px;
    height: 42px;
    border-radius: 18px;
    background: #3b5bfd;
    border: 0;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: #fff;

    font-weight: bold;
    padding: 13px 30px;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  .btn-link {
    background: #c6c6c6;
  }

  input {
    min-height: 46px;
    width: 100%;
    padding: 13px;
    border-radius: 10px;
    border: 0;
    color: #333;
    background: #f6f6f6;

    transition: opacity 0.2s;

    &::placeholder {
      color: #8b8b8b;
    }

    &:focus {
      border: 2px solid rgba(59, 91, 253, 0.4);
      box-shadow: 0 1px 2px 0 rgba(59, 91, 253, 0.4);
    }
  }
`;
