import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
    title: 'mock title',
    author: 'mock author',
    url: 'mockurl.com',
    likes: 100,
};

const mockUser = {
    name: 'julio',
};
test('renders blogs author and title but not url nor likes', () => {
    render(<Blog blog={blog} />);

    const title = screen.getByText('mock title', { exact: false });
    const author = screen.getByText('mock author', { exact: false });
    expect(title).toBeDefined();
    expect(author).toBeDefined();
});

test('renders blogs url and likes after pressing show button', async () => {
    const user = userEvent.setup();
    render(<Blog blog={blog} user={mockUser} />);

    const button = screen.getByText('show');
    expect(button).toBeDefined();

    await user.click(button);

    const url = screen.getByText('mockurl.com');
    const likes = screen.getByText('100');

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
});

test('when likes button is hit twice the handleLikes is called twice as well', async () => {
    const user = userEvent.setup();
    const handleLikes = jest.fn();

    render(<Blog blog={blog} user={mockUser} handleLikes={handleLikes} />);

    const button = screen.getByText('show');
    expect(button).toBeDefined();

    await user.click(button);

    const likesButton = screen.getByText('like');

    await user.click(likesButton);
    await user.click(likesButton);

    expect(handleLikes.mock.calls).toHaveLength(2);
});
