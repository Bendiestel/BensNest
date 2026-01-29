import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  max-width: 1000px;
  margin: 20px auto;
  min-height: 90vh;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px dotted var(--border-color);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HeaderArea = styled.header`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
`;

export const SidebarArea = styled.aside`
  @media (max-width: 768px) {
    display: none; /* Hide sidebar on mobile for now, or move to bottom */
  }
`;

export const MainContent = styled.main`
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid var(--border-color);
  padding: 20px;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
  min-height: 500px;
`;

export const FooterArea = styled.footer`
  grid-column: 1 / -1;
  text-align: center;
  font-size: 12px;
  color: var(--text-main);
  padding-top: 20px;
  border-top: 1px dashed var(--border-color);
`;
