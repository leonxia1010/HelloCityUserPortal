import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputBox from '@/components/InputBox';


const renderInputBox = ({ label, value, onChange, placeholder, fieldType, errorMessage, required }: {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  fieldType: string;
  errorMessage?: string;
  required?: boolean;
}) => {
  render(
    <InputBox
      label={label}
      value={value}
      onChange={onChange ?? (() => {})}
      placeholder={placeholder}
      fieldType={fieldType}
      errorMessage={errorMessage}
      required={required}
    />
  );
};

describe('InputBox component', () => {
  describe('Static UI styles and children components', () => {
    it('Renders with label and placeholder', () => {
      renderInputBox({label: 'Name',value: '',placeholder: 'Enter your name',fieldType: 'name',});
      expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('Displays error message when errorMessage is provided', () => {
      renderInputBox({ label: 'Email',value: 'invalid',placeholder: '',fieldType: 'email',errorMessage: 'Invalid email',});
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  describe('UX Validation', () => {
    it('Calls onChange when input value changes', () => {
      const handleChange = jest.fn();
      renderInputBox({ label: 'Name', value: '', onChange: handleChange, placeholder: '', fieldType: 'name',});
      fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('Shows required error when phone input is empty', () => {
      const Wrapper = () => {
        const [val, setVal] = React.useState('123');
        return (
          <InputBox label="Phone" value={val} onChange={(e) => setVal(e.target.value)}  required fieldType="phone"/>
        );
      };
      render(<Wrapper />);
      const input = screen.getByLabelText(/phone/i);
      fireEvent.change(input, { target: { value: '' } });
      expect(screen.getByText('Phone is required.')).toBeInTheDocument();
    });

    it('Shows required error when email input is empty', () => {
      const Wrapper = () => {
        const [val, setVal] = React.useState('abc');
        return (
          <InputBox label="Email" value={val} onChange={(e) => setVal(e.target.value)} required fieldType="email"/>
        );
      };
      render(<Wrapper />);
      const input = screen.getByLabelText(/email/i);
      fireEvent.change(input, { target: { value: '' } });
      expect(screen.getByText('Email is required.')).toBeInTheDocument();
    });

    it('Shows rule error for invalid format (custom rule)', () => {
      renderInputBox({label: 'Email', value: 'invalid', onChange: () => {}, placeholder: '', fieldType: 'email', errorMessage: 'Invalid email',});
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });
});
