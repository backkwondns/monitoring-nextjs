import styled, { css } from 'styled-components';
import { IconButton, SideBarAddContainer } from 'molecules';
import Menu from 'icons/dehaze.svg';
import Add from 'icons/add.svg';
import { CharacterIcon, Divider } from 'atoms';
import React, { useContext, useState } from 'react';
import { OrganismsTypes } from 'types';
import { v4 as uuidv4 } from 'uuid';
import { fetchPost } from 'libs/fetch';
import { toast } from 'react-toastify';
import { GlobalContext } from 'hooks';

const Container = styled.div`
  ${({ menuTrigger }: { menuTrigger: boolean }) => {
    return css`
      width: ${menuTrigger ? '300px' : '3rem'};
    `;
  }}
  height: 100vh;
  max-width: 80%;
  background-color: #6667ab;
  transition: all 0.2s ease-in-out;
`;
export default function SideBar(props: OrganismsTypes.SideBarType): JSX.Element {
  const { devices } = props;
  const { setSelectedDevice } = GlobalContext.useGlobalContext();
  const [menuTrigger, setMenuTrigger] = useState<boolean>(false);
  const [addTrigger, setAddTrigger] = useState<boolean>(false);
  const [input, setInput] = useState<OrganismsTypes.SideBarInputType>({ address: '', client: '', key: '' });

  const onClickMenu = () => {
    setMenuTrigger((prevState) => !prevState);
  };
  const onClickAdd = () => {
    if (addTrigger === false) setMenuTrigger(true);
    setAddTrigger((prevState) => !prevState);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    setInput({ ...input, [name]: value });
  };

  const onSubmit = async () => {
    const result = await fetchPost('/account_device', { ...input });
    if (result.statusCode === 200) toast.success('Done');
    else toast.error(result.message);
  };
  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onSubmit();
  };

  const onClickDevice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedDevice(event.currentTarget.name);
  };

  return (
    <Container menuTrigger={menuTrigger}>
      <IconButton icon={<Menu />} name="Add" onClick={onClickMenu} />
      <Divider />
      <IconButton icon={<Add />} name="Add" onClick={onClickAdd} />
      <SideBarAddContainer
        addTrigger={addTrigger}
        onChange={onChange}
        onSubmit={onSubmit}
        onPressEnter={onPressEnter}
      />
      <Divider weight="thick" />
      {devices
        ? devices.map((device) => {
            return (
              <IconButton
                key={uuidv4()}
                icon={<CharacterIcon text={device.client} color={device.color} />}
                name={device.device}
                onClick={onClickDevice}
              />
            );
          })
        : null}
      <Divider />
    </Container>
  );
}
