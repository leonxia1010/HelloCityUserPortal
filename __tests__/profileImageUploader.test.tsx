import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileImageUploader from '@/components/ProfileImageUploader';
import '@testing-library/jest-dom';

jest.mock('next/image', ()=>({
    _esModule: true,
    default: (props: object)=><image {...props} />
}))

describe('ProfileImageUploader',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    test('Testing if default image is rendered', ()=>{
        render(<ProfileImageUploader/>)
        const defaultImg = screen.getByAltText('Default Avatar')
        expect(defaultImg).toBeInTheDocument()
    })

    test('Testing uploads an image file and show preview',()=>{
        render(<ProfileImageUploader/>)
        const file = new File('fakeFile', 'avatar.png',{type: 'image/png'})
        const input = screen.getByLabelText(/Add Profile Picture/i);

        
    })






})