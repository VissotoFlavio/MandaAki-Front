import { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes, forwardRef } from 'react';
import { useRandomString } from '../../hooks/useRandomString';
import { CpfMask } from '../../services/cpf-mask.service';
import { PhoneLangType, PhoneMask } from '../../services/phone-mask.service';

export type InputTextType =
  | 'email'
  | 'hidden'
  | 'month'
  | 'number'
  | 'password'
  | 'tel'
  | 'text'
  | 'time'
  | 'url';

export type InputTextMaskType = 'CPF' | 'Phone';

export interface InputTextProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'class' | 'type' | 'onChange'> {
  label?: string;
  type?: InputTextType;
  mask?: InputTextMaskType;
  phonelang?: PhoneLangType;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  error?: {
    message?: string;
    show: boolean;
  };
}

const InputText: FC<InputTextProps> = forwardRef(
  (props, ref: React.LegacyRef<HTMLInputElement>): JSX.Element => {
    const randomId = useRandomString(10);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;

      switch (props.mask) {
        case 'CPF':
          inputValue = maskCPF(inputValue);
          break;
        case 'Phone':
          inputValue = maskPhone(inputValue);
          break;
        default:
          break;
      }

      // Atualizar o estado local e chamar a função de onChange
      if (props.onChange) {
        props.onChange(e);
      }

      e.target.value = inputValue;
    };

    const maskCPF = (value: string): string => {
      // Remover qualquer caractere não numérico do valor
      // Aplicar a máscara de CPF
      return CpfMask(value.replace(/\D/g, ''));
    };

    const maskPhone = (value: string): string => {
      switch (props.phonelang) {
        case 'Br': {
          return PhoneMask(value, props.phonelang);
        }
        default:
          break;
      }

      return value;
    };

    return (
      <div className="w-full">
        <label htmlFor={randomId} className="mb-2 block text-sm font-medium text-gray-900">
          {props.label}
        </label>
        <input
          id={randomId}
          ref={ref}
          type="text"
          {...props}
          onChange={handleChange}
          data-error={props.error?.show}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 data-[error=true]:border-red-500 sm:text-sm"
        />
        {props.error && (
          <div className="w-full">
            <label className="text-xs text-red-500">{props.error?.message}</label>
          </div>
        )}
      </div>
    );
  },
);

InputText.displayName = 'InputText';

export default InputText;
