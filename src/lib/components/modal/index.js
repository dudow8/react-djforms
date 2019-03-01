import React from 'react';
import styled from 'styled-components' ;

const Modal = ({
    children,
    onClose,
    onClickOverlayer,
    windowHeader = true,
    windowTitle,
    windowActions = [],
    dimension = {
        width: '600px',
        height: '400px'
    }
}) => (
    <Overlayer {...onClickOverlayer && {
        onClick: () => onClickOverlayer()
    }}>
        <Frame dimension={dimension}>
            {windowHeader && 
                <TitleBar>
                    {windowTitle}
                    <WindowActionWrapper>
                        {windowActions.map((item, key) => (
                            <WindowAction
                                key={key}
                                type="button"
                                onClick={item.onClick}>
                                {item.label}
                            </WindowAction> 
                        ))}
                        <WindowAction
                            type="button"
                            onClick={onClose}>
                            X
                        </WindowAction> 
                    </WindowActionWrapper>
                </TitleBar>
            }
            <FrameContent windowHeader={windowHeader}>
                {children}
            </FrameContent>
        </Frame>
    </Overlayer>
);

const Overlayer = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0px;
    left: 0px;
`;
const Frame = styled.div`
    background: #fff;
    border-radius: 3px;
    position: fixed;
    z-index: 1;
    width: ${props => props.dimension.width};
    height: ${props => props.dimension.height};
    top: 50%;
    left: 50%;
    transform: translate3D(-50%, -50%, 0);
    overflow: hidden;
`;
const TitleBar = styled.div`
    box-sizing: border-box;
    color: #666;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 59px;
    padding: 0px 10px;
    background: #dddddd;
    border-bottom: 1px solid #aaaaaa;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    display: flex;
    font-size: 16px;
    position: absolute;
`;
const FrameContent = styled.div`
    position: absolute;
    top: ${props => props.windowHeader ? '60px' : '0'};
    width: 100%;
    height: ${props => props.windowHeader ? 'calc(100% - 60px)' : '100%'};
    background: #fafafa;
    border-bottom: 1px solid #dddddd;
    align-content: center;
    justify-content: flex-end;
    overflow: auto;
`;
const WindowActionWrapper = styled.div``;
const WindowAction = styled.button`
    background: transparent;
    color: #666;
    border: 0px;
    cursor: pointer;
`;

export default Modal;
