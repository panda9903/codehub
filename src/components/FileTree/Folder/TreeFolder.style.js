import styled from "styled-components";

export const StyledFolder = styled.section`
  font-weight: bold;
  padding-left: ${(p) => p.theme.indent}px;
  .tree__file {
    padding-left: ${(p) => p.theme.indent}px;
  }
`;
