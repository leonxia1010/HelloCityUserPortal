import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileImageUploader from '@/components/ProfileImageUploader';
import '@testing-library/jest-dom';


jest.mock('next/image', ()=>({
    _esModule: true,
    default: (props: object)=><img {...props} />
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

    test('Testing uploads an image file, show preview and remove photos', async ()=>{
        render(<ProfileImageUploader/>)
        const file = new File(['fakeFile'], 'avatar.png',{type: 'image/png'})
        const input = screen.getByLabelText(/Add Profile Picture/i)

        fireEvent.change(input, {
            target:{files: [file]}
        })

        const previewImage = await screen.findByAltText(/Profile Image Preview/i)
        const statusText = await screen.findByText(/The image is uploading/i)
        const circularProgress = screen.getByRole('progressbar')
        expect(previewImage).toBeInTheDocument()
        expect(statusText).toBeInTheDocument()
        expect(circularProgress).toBeInTheDocument()

        await waitFor(()=>{
            const successText = screen.getByText(/The image is uploaded/i)
            expect(successText).toBeInTheDocument()
        },{timeout:4000})

        const removeButton = screen.getByRole('button',{name: /Remove Photos/i})
        fireEvent.click(removeButton)
        
        expect(screen.getByAltText('Default Avatar')).toBeInTheDocument()
        expect(screen.queryByText(/The image is uploaded/i)).not.toBeInTheDocument()
    })

    test('Testing error message throw for invalid file - excceding 5MB', async()=>{
        render(<ProfileImageUploader/>)
        const largeFile = new File(['F'.repeat(6*1024*1024)], 'largeFile.png', {type:'image/png'})
        const input = screen.getByLabelText(/Add Profile Picture/i)

        fireEvent.change(input,{
            target: {files: [largeFile]}
        })

        const errorMessage = await screen.findByText('Invalid File size or type. Please upload an image file under 5MB')
        expect(errorMessage).toBeInTheDocument()
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

    test('className on the outermost div', ()=>{
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
            'min-w-[30dvw]'
        )
    })

    test('className on container wrapping add & remove button',()=>{
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

    test('className on image of default avatar',()=>{
        render(<ProfileImageUploader/>)
        const defaultImg = screen.getByAltText('Default Avatar')
        expect(defaultImg).toHaveClass(
            'border-2',
            'border-indigo-600',
            'rounded-xl'
        )
    })

    test('className on image of preview', async ()=>{
        render(<ProfileImageUploader/>)
        const file = new File(['fakeFile'], 'avatar.png',{type: 'image/png'})
        const input = screen.getByLabelText(/Add Profile Picture/i)
        fireEvent.change(input, {
            target:{files: [file]}
        })

        const previewImage = await screen.findByAltText(/Profile Image Preview/i)
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
