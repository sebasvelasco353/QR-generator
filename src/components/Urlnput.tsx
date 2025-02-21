interface UrlInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const UrlInput = ({onChange,value = ''}: UrlInputProps) => {
  return <input type='text' value={value} onChange={onChange} placeholder="Link para el QR" />
}

export default UrlInput;