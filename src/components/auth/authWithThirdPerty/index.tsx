"use client"
import React from 'react';
import { Modal, Button, Input, Divider } from 'antd';
import { GoogleOutlined, FacebookFilled, AppleFilled, MailOutlined } from '@ant-design/icons';
import google from '../../../../public/assets/icons/google.png'
import Image from 'next/image';
const AuthWithThirdPerty = () => {
    return (
        <div>

            {/* Google Button */}
            <Button
                icon={<Image src={google} width={500} height={500} className='w-4 h-4' alt={''} />}
                size="large"
                style={{ width: '100%', marginBottom: '10px' }}
            >
                <span>Continue with Google</span>

            </Button>

            {/* Facebook Button */}
            <Button
                icon={<FacebookFilled />}
                size="large"
                style={{ backgroundColor: '#1877F2', color: 'white', width: '100%', marginBottom: '10px' }}
            >
                Continue with Facebook
            </Button>

            {/* Apple Button */}
            <Button
                icon={<AppleFilled />}
                size="large"
                style={{ backgroundColor: 'black', color: 'white', width: '100%', marginBottom: '20px' }}
            >
                Continue with Apple
            </Button>

            {/* Divider */}
            <Divider>or</Divider>
        </div>
    );
};

export default AuthWithThirdPerty;