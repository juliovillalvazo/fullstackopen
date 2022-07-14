import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import AddBlog from './AddBlogs';

test('blog is created with correct details', async () => {
    const user = userEvent.setup();
    const createBlog = jest.fn();

    render(<AddBlog createBlog={createBlog} />);
    const titleInput = screen.getByPlaceholderText('enter title...');
    const authorInput = screen.getByPlaceholderText('enter author...');
    const urlInput = screen.getByPlaceholderText('enter url...');

    const submitButton = screen.getByText('create new blog');

    await user.type(titleInput, 'mock title');
    await user.type(authorInput, 'mock author');
    await user.type(urlInput, 'mock url');

    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'mock title',
        author: 'mock author',
        url: 'mock url',
    });
});
