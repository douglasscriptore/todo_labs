import React from 'react';
import ComponentAlert from 'react-bootstrap-sweetalert';
import { useSweetAlert } from '../../hooks/sweetalert';

import { Container } from './styles';

const SweetAlert: React.FC = () => {
  const { data, onCancel, onConfirm } = useSweetAlert();
  return (
    <Container>
      <ComponentAlert
        type={data.type}
        show={data.show}
        input={data.input}
        inputType="text"
        validationMsg="Field is required!"
        required={!!data.input}
        placeholder={data.input ? 'Write something' : ''}
        title={data.title}
        timeout={data.timeout}
        showConfirm={!!data.confirmBtnText}
        showCancel={!!data.cancelBtnText}
        confirmBtnText={data.confirmBtnText}
        cancelBtnText={data.cancelBtnText}
        onConfirm={onConfirm}
        onCancel={onCancel}
        btnSize="sm"
      >
        {/* Write something interesting: */}
      </ComponentAlert>
    </Container>
  );
};

export default SweetAlert;
