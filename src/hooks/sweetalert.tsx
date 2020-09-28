import React, { createContext, useContext, useState, useCallback } from 'react';

interface ICallbackDTO {
  info: number | string;
  func(data: number | string): void;
}

interface ISweetAlertState {
  show: boolean;
  title?: string;
  type?: 'warning' | 'info' | 'success';
  confirmBtnText?: string;
  cancelBtnText?: string;
  input?: boolean;
  timeout?: number;
  callback?: ICallbackDTO;
}

interface ISweetAlertData {
  title?: string;
  type?: 'warning' | 'info' | 'success';
  confirmBtnText?: string;
  cancelBtnText?: string;
  input?: boolean;
  timeout?: number;
  callback?: ICallbackDTO;
}

interface ISweetAlertContextData {
  data: ISweetAlertState;
  open(data: ISweetAlertData): void;
  onConfirm(response?: string | number): void;
  onCancel(): void;
}

const SweetAlertContext = createContext<ISweetAlertContextData>(
  {} as ISweetAlertContextData,
);

const SweetAlertProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ISweetAlertState>({
    show: false,
  } as ISweetAlertState);

  const open = useCallback(
    ({
      title,
      confirmBtnText,
      cancelBtnText,
      type,
      callback,
      timeout,
      input,
    }) =>
      setData({
        ...data,
        title,
        type,
        confirmBtnText,
        cancelBtnText,
        callback,
        timeout,
        input,
        show: true,
      }),
    [data],
  );

  const onConfirm = useCallback(
    response => {
      setData({ ...data, show: false });
      if (data.callback && !response) {
        data.callback.func(data.callback.info);
        return;
      }

      if (data.callback && response) {
        data.callback.func(response);
      }
    },
    [data],
  );
  const onCancel = useCallback(() => setData({ ...data, show: false }), [data]);

  return (
    <SweetAlertContext.Provider value={{ data, open, onConfirm, onCancel }}>
      {children}
    </SweetAlertContext.Provider>
  );
};

function useSweetAlert(): ISweetAlertContextData {
  const context = useContext(SweetAlertContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { SweetAlertProvider, useSweetAlert };
