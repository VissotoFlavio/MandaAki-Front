import { ChangeEvent, ChangeEventHandler, FC, InputHTMLAttributes } from 'react';
import { CpfMask } from '../../Utils/masks/cpf.mask';
import { PhoneLangType, PhoneMask } from '../../Utils/masks/phone.mask';
import { useRandomString } from '../../hooks/useRandomString';

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
}

export const InputText: FC<InputTextProps> = (props): JSX.Element => {
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
      <label htmlFor={randomId} className="block mb-2 text-sm font-medium text-gray-900">
        {props.label}
      </label>
      <input
        id={randomId}
        type="text"
        {...props}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </div>
  );
};
