import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Link from 'next/link';
const AuctionDropdown = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link rel="noopener noreferrer" href="https://www.antgroup.com">
                    Live Auction
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link rel="noopener noreferrer" href="https://www.aliyun.com">
                    Featured Auction
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Past Results
                </Link>
            ),
        },
    ];
    return (
        <div>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <button className='font-semibold text-md lg:text-lg  text-gray-600 hover:text-black duration-200 '>Auction</button>
            </Dropdown>

        </div>
    );
};

export default AuctionDropdown;