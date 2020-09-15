import React from 'react';

const CartIcon = ({ itemCount }) => {
    return (
        <div className="relative">
            <span className="absolute top-0 left-0 w-full h-full flex place-content-center text-sm pt-2">
                {itemCount}
            </span>
            <svg
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 30, height: 30 }}>
                <path
                    d="M21.7 10C21.7 10.1 21.7 10.2 21.7 10.3L20 21.3C19.8 22.3 19 23 18 23H3.7C2.7 23 1.9 22.3 1.7 21.3L0 10.3C0 10.2 0 10.1 0 10C0 8.9 0.9 8.00001 2 8.00001H4.8V7.00001C4.8 3.60001 7.6 0.900005 11 1.00001C14.3 1.10001 16.8 4.00001 16.8 7.20001V12C16.8 12.1 16.7 12.2 16.6 12.2H15C14.9 12.2 14.8 12.1 14.8 12V7.00001C14.8 5.90001 14.4 4.90001 13.6 4.20001C12.9 3.40001 11.9 3.00001 10.8 3.00001C9.7 3.00001 8.7 3.40001 8 4.20001C7.3 4.90001 6.8 5.90001 6.8 7.00001V8.00001H12.6C12.7 8.00001 12.8 8.10001 12.8 8.20001V9.8C12.8 9.90001 12.7 10 12.6 10H6.8V12C6.8 12.1 6.7 12.2 6.6 12.2H5C4.9 12.2 4.8 12.1 4.8 12V10H2L3.7 21H18L19.7 10H19C18.9 10 18.8 9.90001 18.8 9.8V8.20001C18.8 8.10001 18.9 8.00001 19 8.00001H19.6C20.8 8.00001 21.7 8.9 21.7 10Z"
                    fill="black"></path>
            </svg>
        </div>
    );
};

CartIcon.defaultProps = {
    itemCount: 0
};

export default CartIcon;
