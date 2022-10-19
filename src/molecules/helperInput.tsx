import { Input } from 'atoms';
import { MoleculesTypes } from 'types';
import styled, { css } from 'styled-components';

const Form = styled.div`
  ${({ width }: { width: string }) => {
    return css`
      width: ${width};
    `;
  }}
  position: relative;
  height: 70px;
  overflow: hidden;
`;

const InputContainer = styled.div`
  ${({ width }: { width: string }) => {
    return css`
      width: ${width};
    `;
  }}
`;

const Label = styled.label`
  ${({ color }: { color: string }) => {
    return css`
      position: absolute;
      bottom: 1px;
      left: 0px;
      pointer-events: none;
      border-bottom: 1px solid #b5b3b3;
      margin: 0px !important;
      width: 100%;
      height: 100%;
      &::after {
        border-bottom: 3px solid ${color};
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 100%;
        width: 100%;
        transform: translateX(-100%);
        transition: transform 0.1s ease;
      }
    `;
  }}
`;

const ContentName = styled.span`
  ${({ color }: { color: string }) => {
    return css`
      color: ${color};
    `;
  }}
  position: absolute;
  bottom: 5px;
  left: 0;
  transition: all 0.3s ease;
`;

const HelperText = styled.span`
  ${({ color }: { color: string }) => {
    return css`
      color: ${color};
    `;
  }}
  height: 18px;
  width: 100%;
  font-size: small;
`;

const InputStyle = styled(Input)`
  ${({ color }: { color: string }) => {
    return css`
      color: ${color};
      border: none;
      padding-top: 20px;
      display: inline;
      font-size: 16px;
      outline: none;
      width: 100%;
      height: 100%;
      &:focus + ${Label} ${ContentName}, &:valid + ${Label} ${ContentName} {
        color: ${color};
        transform: translateY(-150%);
        font-size: 14px;
      }
      &:focus + ${Label}:after, &:valid + ${Label}:after, &:hover + ${Label}:after {
        transform: translateX(0%);
      }
    `;
  }}
`;

function HelperInput(props: MoleculesTypes.HelperInputType): JSX.Element {
  const { label, helperText = '', name, onPressEnter, onChange } = props;
  let color;
  if (helperText === 'Done') {
    color = '#66bb6a';
  } else if (helperText === '') {
    color = '#6667ab';
  } else {
    color = '#d32f2f';
  }

  const width = '100%';
  return (
    <InputContainer width={width}>
      <Form width={width}>
        <InputStyle
          type={name.includes('passWord') ? 'password' : 'text'}
          color={color}
          name={name}
          onChange={onChange}
          onKeyPress={onPressEnter}
          autoFocus={false}
          autoComplete="off"
          required
        />
        <Label color={color}>
          <ContentName color={color}>{label}</ContentName>
        </Label>
      </Form>
      {helperText !== 'Done' ? <HelperText color={color}>{helperText}</HelperText> : null}
    </InputContainer>
  );
}

export default HelperInput;
