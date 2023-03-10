import styled from '@emotion/styled';

const Styled_search_results_list = styled.ul`
    font-size: calc(10px + 2vmin);
    width: calc(100% - 60px);
    min-height: 100px;
    border: 1px solid #ccc;
    margin-top: 15px;
    list-style: none;
    max-height: 200px;
    overflow-y: auto;
`;

const Styled_search_results_list_item = styled.li`
    color: white;
    font-size: calc(10px + 2vmin);
`;

export {
    Styled_search_results_list, 
    Styled_search_results_list_item
};