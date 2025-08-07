import React from 'react';

import type { ImageProps } from 'next/image'
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProfileImageUploader from '../src/components/ProfileImageUploader';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const { src, alt, ...rest } = props;
    return <img src={typeof src ==='string' ? src : ''} alt={alt} {...rest} />;
  }
}));

jest.mock('@mui/material/styles', () => ({
    ...jest.requireActual('@mui/material/styles'),
        useTheme: () => ({
            backgroundGradients: {
                buttonPrimaryActive: 'mock-gradient',
            },
        }),
}));

describe('ProfileImageUploader',()=>{
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    beforeAll(()=>{
        global.URL.createObjectURL = jest.fn(()=>'mock-url')
    })

    test('Default image testing ', ()=>{
        render(<ProfileImageUploader/>)
        const defaultImg = screen.getByAltText('Default Avatar')
        expect(defaultImg).toHaveClass(
            'border-2',
            'border-indigo-600',
            'rounded-xl'
        )
    })

    test('Testing uploads an image file, show preview and remove photos', async ()=>{
        render(<ProfileImageUploader/>)
        const input = screen.getByLabelText(/Add Profile Picture/i)
        fireEvent.change(input, {
            target:{files: [new File(['fakeFile'], 'avatar.png',{type: 'image/png'})]}
        })

        const statusText = await screen.findByText(/The image is uploading/i)
        const circularProgress = screen.getByRole('progressbar')
        expect(statusText).toBeInTheDocument()
        expect(circularProgress).toBeInTheDocument()

        const successText = await screen.findByText(/The image is uploaded/i, undefined, { timeout: 4000 });
        expect(successText).toBeInTheDocument()

        const previewImage = await screen.findByAltText(/Profile Image Preview/i)
        expect(previewImage).toBeInTheDocument()

        const removeButton = screen.getByRole('button',{name: /Remove Photos/i})
        fireEvent.click(removeButton)
        
        expect(screen.getByAltText('Default Avatar')).toBeInTheDocument()
        expect(screen.queryByText(/The image is uploaded/i)).not.toBeInTheDocument()
    })

    test('Testing error message throw for invalid file - excceding 5MB', async()=>{
        render(<ProfileImageUploader/>)
        const input = screen.getByLabelText(/Add Profile Picture/i)

        fireEvent.change(input,{
            target: {files: [new File(['F'.repeat(6*1024*1024)], 'largeFile.png', {type:'image/png'})]}
        })

        expect(await screen.findByText('Invalid File size or type. Please upload an image file under 5MB')).toBeInTheDocument()
    })

    test('Testing error message throw for invalid file - invalid type', async()=>{
        render(<ProfileImageUploader />)
        const textFile = new File(['textFile'], 'textFile.txt',{type:'text/plain'})
        const input = screen.getByLabelText(/Add Profile Picture/i)

        fireEvent.change(input,{
            target:{files: [textFile]}
        })

        const errorMessage = await screen.findByText('Invalid File size or type. Please upload an image file under 5MB')
        expect(errorMessage).toBeInTheDocument()
    })

    test('ClassName on the outermost div', ()=>{
        const { container } = render(<ProfileImageUploader/>)
        const outerDiv = container.firstChild as HTMLElement

        expect(outerDiv).toHaveClass(
            'flex',
            'flex-col',  
            'items-center',
            'justify-center',
            'border-2',
            'rounded-xl',
            'max-w-96',
            'min-w-[40dvw]'
        )
    })

    test('ClassName on container wrapping add & remove button',()=>{
        render(<ProfileImageUploader/>)
        const uploadButton = screen.getByText(/Add Profile Picture/i)
        const buttonDiv = uploadButton.parentElement as HTMLElement

        expect(buttonDiv).toHaveClass(
            'flex',
            'justify-center',
            'flex-wrap',
            'w-4/5'
        )
    })

    test('className on image of preview', async ()=>{
        render(<ProfileImageUploader/>)
        const file = new File(['fakeFile'], 'avatar.png',{type: 'image/png'})
        const input = screen.getByLabelText(/Add Profile Picture/i)
        fireEvent.change(input, {
            target:{files: [file]}
        })

        const previewImage = await screen.findByAltText(/Profile Image Preview/i, undefined, {timeout: 4000})
        expect(previewImage).toHaveClass(
            'w-32',
            'h-32',
            'object-cover',
            'border-2',
            'border-indigo-600',
            'rounded-xl'
        )
    })
})
