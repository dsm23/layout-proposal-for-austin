import styled from 'styled-components';
import { PANEL_SCREEN_HEIGHT } from '../constants';

const Main = styled.main`
  height: calc(100vh - ${PANEL_SCREEN_HEIGHT * 2}px);
`;

export default Main;
